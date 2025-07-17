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

import axios, {AxiosResponse} from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {Textract, AnalyzeExpenseCommand} from "@aws-sdk/client-textract";
import {PurchaseInvoice, PurchaseInvoiceLine} from "./thetis-ims";

async function getIMS() {

    const authUrl = "https://auth.thetis-ims.com/oauth2/";
    const apiUrl = "https://api.thetis-ims.com/2/";

	let clientId: string = process.env.ClientId as string;
	let clientSecret: string = process.env.ClientSecret as string;
	let apiKey: string = process.env.ApiKey as string;

    let credentials = clientId + ":" + clientSecret;
	let base64data = Buffer.from(credentials).toString('base64');
	
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

function parseQuantity(quantity: string): number {
	return parseInt(quantity);
}

function parseAmount(amount: string): number {
	return parseFloat(amount);
}

exports.analyzeHandler = async (event: any, _x: any) => {

	const ims = await getIMS();
	
	console.log(JSON.stringify(event));

	let bucketName: string = process.env.BucketName as string;
	
	const s3 = new S3Client();

	const detail = event.detail;
	
	const key = detail.entityId + ".pdf";
	
	const response: AxiosResponse = await axios.get(detail.url, { responseType: 'arraybuffer'});
	const buffer = response.data;
	
    const command = new PutObjectCommand({
	        Bucket: bucketName,
	        Body: buffer,
	        Key: key
	    });

	const result = await s3.send(command);

    const textract = new Textract();

	const analyzeExpenseInput = { Document: { S3Object: { Bucket: bucketName, Name: key }}};
	const analyzeExpenseCommand = new AnalyzeExpenseCommand(analyzeExpenseInput);
	const analyzeExpenseOutput = await textract.send(analyzeExpenseCommand);

	const expenseDocuments = analyzeExpenseOutput.ExpenseDocuments!;
	for (const expenseDocument of expenseDocuments) {

		console.log(JSON.stringify(expenseDocument.SummaryFields));

		let invoiceNumber = '';
		let invoiceDate = new Date().toISOString().slice(0, 10);

		const summaryFields = expenseDocument.SummaryFields!;
		for (const summaryField of summaryFields) {
			const type = summaryField.Type!;
			const valueDetection = summaryField.ValueDetection;
			if (type.Text == 'INVOICE_RECEIPT_ID') {
				invoiceNumber = valueDetection!.Text!;
			} else if (type.Text == 'INVOICE_DATE') {
				invoiceDate = valueDetection!.Text!;
			}
		}

		const purchaseInvoiceLines: PurchaseInvoiceLine[] = [];

		const lineItemGroups = expenseDocument.LineItemGroups!;
		for (const lineItemGroup of lineItemGroups) {

			const lineItems = lineItemGroup.LineItems!;

			let lineIndex = 0;
			for (const lineItem of lineItems) {

				let quantity = 1;
				let amount = 0;
				let itemNumber = '';
				let itemDescription = '';

				const fields = lineItem.LineItemExpenseFields!;
				for (const field of fields) {
					const type = field.Type!;
					const valueDetection = field.ValueDetection!;
					if (type.Text == 'QUANTITY') {
						quantity = parseQuantity(valueDetection.Text!);
					} else if (type.Text == 'AMOUNT') {
						amount = parseAmount(valueDetection.Text!);
					} else if (type.Text == 'PRODUCT_CODE') {
						itemNumber = valueDetection.Text!;
					} else if (type.Text == 'ITEM') {
						itemDescription = valueDetection.Text!;
					}
				}

				lineIndex++;

				purchaseInvoiceLines.push({
					amount,
					quantity,
					itemNumber,
					itemDescription,
					data: "",
					indexedPosition: lineItemGroup.LineItemGroupIndex + "." + lineIndex
				})
			}
		}

		const purchaseInvoice: PurchaseInvoice = {
			data: "",
			finalized: false,
			currencyCode: 'DKK',
			purchaseInvoiceDate: invoiceDate,
			purchaseInvoiceNumber: invoiceNumber,
			supplierId: detail.data.id,
			purchaseInvoiceLines
		}

		let response = await ims.post("purchaseInvoices", purchaseInvoice);

	}

};





