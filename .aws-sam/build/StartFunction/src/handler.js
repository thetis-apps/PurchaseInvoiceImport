/**
 * Copyright 2021 Thetis Apps Aps
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
const axios = require('axios');

var AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});

async function getIMS() {

    const authUrl = "https://auth.thetis-ims.com/oauth2/";
    const apiUrl = "https://api.thetis-ims.com/2/";

	let clientId = process.env.ClientId;
	let clientSecret = process.env.ClientSecret;  
	let apiKey = process.env.ApiKey;  

    let credentials = clientId + ":" + clientSecret;
	let base64data = Buffer.from(credentials, 'UTF-8').toString('base64');	
	
	let imsAuth = axios.create({
			baseURL: authUrl,
			headers: { Authorization: "Basic " + base64data, 'Content-Type': "application/x-www-form-urlencoded" },
			responseType: 'json'
		});

    let response = await imsAuth.post("token", 'grant_type=client_credentials');
    let token = response.data.token_type + " " + response.data.access_token;
    
    let ims = axios.create({
    		baseURL: apiUrl,
    		headers: { "Authorization": token, "x-api-key": apiKey, "Content-Type": "application/json" }
    	});
	
	ims.interceptors.response.use(function (response) {
			console.log("SUCCESS " + JSON.stringify(response.data));
 	    	return response;
		}, function (error) {
			if (error.response) {
				console.log("FAILURE " + error.response.status + " - " + JSON.stringify(error.response.data));
			}
	    	return Promise.reject(error);
		});
		
    return ims;
}

exports.startHandler = async (event, x) => {
	
	console.log(JSON.stringify(event));

	let completionTopic = process.env.CompletionTopic;
	
	let completionRole = process.env.CompletionRole;
	
	let bucketName = process.env.BucketName;
	
	const s3 = new AWS.S3();

	const detail = event.detail;
	
	const key = detail.entityId + ".pdf";
	
	let response = await axios.get(detail.url, { responseType: 'arraybuffer'}); 
	let buffer = response.data;
	
    await s3.putObject({
	        Bucket: bucketName,
	        Body: buffer,
	        Key: key
	    }).promise();

    const textract = new AWS.Textract();

    let documentLocation = { S3Object: { Bucket: bucketName, Name: key }};
    let notificationChannel = { SNSTopicArn: completionTopic, RoleArn: completionRole };
    let input = { 
    		DocumentLocation: documentLocation, NotificationChannel: notificationChannel, ClientRequestToken: detail.eventId, 
    		JobTag: detail.entityId.toString() + '_' + detail.eventId 
	    };
	response = await textract.startDocumentTextDetection(input).promise();    

    console.log(JSON.stringify(response));
    
    return null;
            
};

exports.completionHandler = async (input, x) => {

	console.log(JSON.stringify(input));

    const textract = new AWS.Textract();
    
    let ims = await getIMS();
    
    for (let message of input.Records) {
    
    	let completion = JSON.parse(message.Sns.Message);
    	let tags = completion.JobTag.split("_");
    	let inboundShipmentId = tags[0];
    	let eventId = tags[1];
    
        let blockMap = new Map();

    	let paginationToken = null;
    	let finished = false;
        while (!finished) {
        	
			let request = { JobId: completion.JobId, MaxResults: 100000, NextToken: paginationToken };
            let result = await textract.getDocumentTextDetection(request).promise();

            let blocks = result.Blocks;
            for (let block of blocks) {
            	blockMap.set(block.Id, block);
            }	                
            
            paginationToken = result.NextToken;
            if (paginationToken == null) {
                finished = true;
            }
            
        }
        
        let response = await ims.get("inboundShipments/" + inboundShipmentId);
		let inboundShipment = response.data;
		
		response = await ims.get("suppliers/" + inboundShipment.supplierId);
		let supplier = response.data;
		
		let dataDocument;
		if (supplier.dataDocument == null) {
			dataDocument = new Object();
		} else {
			dataDocument = JSON.parse(supplier.dataDocument);
		}
		
		let definition = dataDocument.PurchaseInvoiceImport;
		if (definition != null) {
	 		let invoice = await parseFromLines(definition, blockMap);
			console.log(JSON.stringify(invoice));
			await updateInboundShipment(ims, eventId, inboundShipment, invoice);
		} else {
			definition = { lines: [], maxLineHeight: null, sample: Array.from(blockMap.values()) };
			dataDocument.PurchaseInvoiceImport = definition;
			await ims.patch('suppliers/' + supplier.id + '/dataDocument', dataDocument);
		}
    }        

    return "Hello from Lambda!";
};

async function parseFromLines(definition, blockMap) {
	
	let invoice = new Object();
	invoice.lines = [];
	
	let lines = definition.lines;
	
	for (let block of blockMap.values()) {
		
		if (block.BlockType == "PAGE") {
			
			// Handle table
			
			let lineNumber = 1;
			
			let state = 0;
			
			let topOfLine = 0;
			
			if (block.Relationships != null) {
				
				for (let relationship of block.Relationships) {
					
					if (relationship.Type == "CHILD") {
						
						let invoiceLine = new Object();
						
						for (let lineId of relationship.Ids) {
							
							// Handle line
	
							let line = blockMap.get(lineId);
							
							// State equals the index in the fields array
							
							const boundingBox = line.Geometry.BoundingBox;
							const left = boundingBox.Left;
							const top = boundingBox.Top;
							const height = boundingBox.Height;
							
							if (top + height > topOfLine + definition.maxLineHeight) {
								
								if (state > 0) {
									console.log("*** SKIPPING DUE TO LINE HEIGHT *** " + JSON.stringify(invoiceLine));
								}
								
								state = 0;
								invoiceLine = new Object();		
							}
	
							let lineDefinition = lines[state];
							
							console.log(left + ' ' + lineDefinition.minLeft + ' ' + lineDefinition.maxLeft + ' ' + line.Text);
							
							if (left < lineDefinition.maxLeft && left > lineDefinition.minLeft) {
								
								if (state == 0) {
									topOfLine = top;
								}
								
								let texts = getTexts(blockMap, line);
								let match = setTargetField(lineDefinition.words, invoiceLine, texts);
								if (match) {
									state++;
								}
							}
	
							// If we have all necessary information start new line
							
		    				if ((invoiceLine.businessItemNumber != null || invoiceLine.globalTradeItemNumber != null || invoiceLine.stockKeepingUnit != null)  && 
		    						invoiceLine.qty != null && invoiceLine.price != null && invoiceLine.amount != null) {
			            		invoiceLine.pageNumber = block.Page;
			            		invoiceLine.lineNumber = lineNumber;
			            		invoiceLine.qty = parseFloat(invoiceLine.qty.replace(/"|\,|\./g, ''));
			            		invoiceLine.price = parseFloat(invoiceLine.price.replace(/"|\,|\./g, '')) / 100;
								invoiceLine.amount = parseFloat(invoiceLine.amount.replace(/"|\,|\./g, '')) / 100;
								lineNumber++;
			            		invoice.lines.push(invoiceLine);
			            		invoiceLine = new Object();
			            		state = 0;
		    				}
				    				
						}
	
					} 
				}				
			}
			
		}
	}
	
	return invoice;
}

function setTargetField(definitions, invoiceLine, texts) {
	
	console.log('setTargetField ' + JSON.stringify(definitions) + JSON.stringify(texts));
	
	let match = true;
	let i = 0;
	while (i < definitions.length && i < texts.length && match) {
		let definition = definitions[i];
		let text = texts[i];
		if (definition.pattern != null) {
			match = text.match(definition.pattern);
		} 
		i++;
	}

	if (match) {
		for (let i = 0; i < definitions.length && i < texts.length; i++) {
			let definition = definitions[i];
			let text = texts[i];
			if (definition.target != null) {
				let targetValue = invoiceLine[definition.target];
				if (targetValue != null) {
					invoiceLine[definition.target] = targetValue + text;
				} else {
					invoiceLine[definition.target] =  text;		
				}
			}
		}
	}

	return match;
}

function getTexts(blockMap, cell) {
	let texts = [];
	if (cell.Relationships != null) {
		for (let relationship of cell.Relationships) {
			if (relationship.Type == "CHILD") {
				for (let wordId of relationship.Ids) {
					let word = blockMap.get(wordId);
					texts.push(word.Text);
				}
			}
		}
	}
	return texts;
}

async function updateInboundShipment(ims, eventId, inboundShipment, invoice) {

	let inboundShipmentLines = inboundShipment.inboundShipmentLines;

	let sum = 0;
    for (let line of invoice.lines) { 

		// First lookup the item

		let globalTradeItem = null;
		if (line.stockKeepingUnit != null) {
			let response = await ims.get('globalTradeItems', { params: { stockKeepingUnitMatch: line.stockKeepingUnit }});
			let globalTradeItems = response.data;
			if (globalTradeItems.length > 0) {
				globalTradeItem = globalTradeItems[0];	
			} 
		}

		if (globalTradeItem == null && line.businessItemNumber != null) {
			let response = await ims.get('globalTradeItems', { params: { businessItemNumberMatch: line.businessItemNumber }});
			let globalTradeItems = response.data;
			if (globalTradeItems.length > 0) {
				globalTradeItem = globalTradeItems[0];	
			} 
		}
		
		if (globalTradeItem == null && line.globalTradeItemNumber != null) {
			let response = await ims.get('globalTradeItems', { params: { globalTradeItemNumberMatch: line.globalTradeItemNumber }});
			let globalTradeItems = response.data;
			if (globalTradeItems.length > 0) {
				globalTradeItem = globalTradeItems[0];	
			} 
		}

		// Future improvement: Look for logistic variant
		
		if (globalTradeItem != null) {

			// See if it is already on inbound shipment
	    	
	    	let found = false;
			let i = 0;
	    	while (!found && i < inboundShipmentLines.length) {
	    		let inboundShipmentLine = inboundShipmentLines[i];
	    		if (globalTradeItem.stockKeepingUnit == inboundShipmentLine.stockKeepingUnit) {
	    			found = true;
	    		} else {
	    			i++;
	    		}
	    	}
	    	
			let qty = line.qty;
    		let price = line.price;
    		let amount = line.amount;

			let discountPercentage = null;
			let amountBeforeDiscount = price * qty;
			let discount = amountBeforeDiscount - amount;
			if (discount > 0) {
				discountPercentage = discount * 100 / amountBeforeDiscount;
    		} 
				
	    	if (found) {
	    		
	    		let inboundShipmentLine = inboundShipmentLines.splice(i, 1)[0];
	    		
				await ims.patch('inboundShipmentLines/' + inboundShipmentLine.id, {
						numItemsExpected: qty,
						purchasePrice: price,
						discountPercentage: discountPercentage
					});

	    	} else {
	    		
	    		let inboundShipmentLine = {
	    				globalTradeItemId: globalTradeItem.id,
	    				inboundShipmentId: inboundShipment.id,
	    				numItemsExpected: qty,
	    				purchasePrice: price,
	    				discountPercentage: discountPercentage
	    			};
	    			
	    		await ims.post('inboundShipmentLines', inboundShipmentLine);
	    		
	    	}
			
    	} else {
    		
			let eventMessage = {
				messageType: "WARNING",
				messageText: 'Cannot find trade item matching line ' + line.lineNumber + ' on page ' + line.pageNumber,
	            time: Date.now(),
            	source: "Purchase Invoice Import" };
            	
            await ims.post('events/' + eventId + '/messages', eventMessage);
            
    	}
    	
    	sum += line.amount;
    }
    
    // Now zero lines that are left
    
    for (let inboundShipmentLine of inboundShipmentLines) {
    	await ims.patch('inboundShipmentLines/' + inboundShipmentLine.id, {
    			numItemsExpected: 0,
    			suppliersDescription: null
    		});
    }
    
    console.log(sum);
    
	let eventMessage = {
		messageType: "INFO",
		messageText: 'Finished processing invoice',
        time: Date.now(),
    	source: "Purchase Invoice Import" };
    	
    await ims.post('events/' + eventId + '/messages', eventMessage);
    
}


