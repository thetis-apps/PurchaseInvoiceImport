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

import axios from "axios";
import { TextractClient, StartExpenseAnalysisCommand, StartExpenseAnalysisCommandInput, GetExpenseAnalysisCommand } from "@aws-sdk/client-textract";
import {PurchaseInvoice, PurchaseInvoiceLine} from "./thetis-ims";
import {ExpenseDocument} from "@aws-sdk/client-textract/dist-types/models";

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

/**
 * Parser en tal-streng til et tal, hvor:
 * - Komma (,) antages som decimal-separator, punktum (.) som tusind-separator,
 * - Medmindre der findes et punktum efter et komma, så ombyttes betydningen.
 * Returnerer null hvis parsing fejler.
 */
export function parseNumberString(input: string): number | null {
    if (!input) return null;
    let s = input.trim();

    // Fjern evt. whitespace inde i tallet (f.eks. '1 200,50')
    s = s.replace(/\s+/g, '');

    // Find placering af komma og punktum
    const commaIdx = s.indexOf(',');
    const dotIdx = s.indexOf('.');

    let numStr: string;

    if (commaIdx !== -1 && dotIdx !== -1) {
        // #1: Begge findes
        if (dotIdx > commaIdx) {
            // Hvis punktum kommer efter komma: byt roller (f.eks "1,234.56")
            // Her er punktum decimal-separator
            numStr = s.replace(/,/g, '').replace('.', ',');
            // Nu har vi ét komma tilbage som decimal, klar til parseFloat
            numStr = numStr.replace(',', '.'); // parseFloat kræver punktum for decimal
        } else {
            // Punktum før komma: punktum = tusind, komma = decimal (f.eks "1.234,56")
            numStr = s.replace(/\./g, '').replace(',', '.');
        }
    } else if (commaIdx !== -1) {
        // #2: Kun komma findes (f.eks "1234,56")
        numStr = s.replace(/\./g, '').replace(',', '.');
    } else if (dotIdx !== -1) {
        // #3: Kun punktum findes (f.eks "1234.56")
        numStr = s.replace(/,/g, '');
    } else {
        // #4: Ingen separator
        numStr = s;
    }

    // Forsøg at parse
    const val = parseFloat(numStr);
    return isNaN(val) ? null : val;
}

/**
 * Forsøger at parse en streng til en Date.
 * - Accepterer '.', '-' og '/' som separatorer.
 * - Går ud fra formatet D/M/Y, medmindre det første tal er over 12, så antager den M/D/Y.
 * - Returnerer Date-objekt hvis parsing lykkes, ellers null.
 */
export function parseDateString(input: string): Date | null {
  // Fjern whitespace og find separator
  const trimmed = input.trim();
  const separatorMatch = trimmed.match(/[.\-\/]/);
  if (!separatorMatch) {
    return null; // Ingen gyldig separator
  }
  const separator = separatorMatch[0];
  const parts = trimmed.split(separator).map(p => p.trim());

  if (parts.length !== 3) {
    return null; // Ikke et forventet format
  }

  let day: number, month: number, year: number;

  // Forsøg at parse tallene
  const nums = parts.map(Number);

  // Hvis parsing fejler
  if (nums.some(isNaN)) {
    return null;
  }

  // Heuristik: dag først, medmindre næste tal er over 12
  if (nums[1] > 12) {
    // Format: M/D/Y
    month = nums[0];
    day = nums[1];
    year = nums[2];
  } else {
    // Format: D/M/Y
    day = nums[0];
    month = nums[1];
    year = nums[2];
  }

  // Håndter evt. to-cifret årstal, fx 23 → 2023
  if (year < 100) {
    year += year < 50 ? 2000 : 1900;
  }

  // Valider værdierne
  if (
    month < 1 || month > 12 ||
    day < 1 || day > 31 ||
    year < 1000 || year > 3000
  ) {
    return null;
  }

  // Husk: i Date() er måneden 0-indekseret!
  const parsed = new Date(year, month - 1, day);

  // Tjek at dag/måned/år matcher (fanger ugyldige datoer som 31.02)
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

/**
 * Handler til at starte asynkron Textract-analyse når en fil er blevet vedhæftet
 */
exports.startAnalysisHandler = async (event: any) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    const textractClient = new TextractClient({ region: 'eu-west-1', endpoint: 'https://textract.eu-west-1.amazonaws.com', logger: console });
    const detail = event.detail;

    try {
        // Start den asynkrone Textract-analyse

		const input: StartExpenseAnalysisCommandInput = {
			DocumentLocation: {
				S3Object: {
					Bucket: detail.bucketName,
					Name: detail.key
				}
			},
            ClientRequestToken: detail.eventId,
			NotificationChannel: {
				SNSTopicArn: process.env.CompletionTopic,
				RoleArn: process.env.TextractRole
			},
			// Gem data fra eventet i JobTag, så vi kan bruge det senere
			JobTag: detail.data.id.toString()
		};

		console.log(JSON.stringify(input));

		const command = new StartExpenseAnalysisCommand(input);

		const startResponse = await textractClient.send(command);

        console.log(`Started Textract analysis job: ${startResponse.JobId}`);

		return;

    } catch (error) {
        console.error('Error starting analysis:', error);
        throw error;
    }
};

/**
 * Handler til at behandle resultater fra asynkron Textract-analyse
 */
exports.processResultsHandler = async (event: any) => {
    console.log('SNS event received:', JSON.stringify(event, null, 2));
    
    const textractClient = new TextractClient({});
    
    // Parse SNS besked
    for (const record of event.Records) {
        const snsMessage = JSON.parse(record.Sns.Message);
        const jobId = snsMessage.JobId;
        const status = snsMessage.Status;
        
        if (status === 'SUCCEEDED') {
            try {
                // Hent analyseresultaterne
                const getResponse = await textractClient.send(
                    new GetExpenseAnalysisCommand({
                        JobId: jobId
                    })
                );

                // Udpak eventdata fra JobTag
                const supplierId: number = parseInt(snsMessage.JobTag);
                
                // Behandl resultaterne - lignende logik som i din oprindelige analyzeHandler
                await processExpenseDocuments(supplierId, getResponse.ExpenseDocuments!);
                
                console.log('Successfully processed expense analysis results');
            } catch (error) {
                console.error('Error processing analysis results:', error);
                throw error;
            }
        } else if (status === 'FAILED') {
            console.error(`Textract job failed: ${snsMessage.StatusMessage}`);
            throw new Error(`Textract job failed: ${snsMessage.StatusMessage}`);
        }
    }
};

/**
 * Behandler resultaterne fra Textract og opretter fakturaer i Thetis IMS
 */
async function processExpenseDocuments(supplierId: number, expenseDocuments: ExpenseDocument[]) {

    const ims = await getIMS();
    
    if (!expenseDocuments || expenseDocuments.length === 0) {
        console.log('No expense documents found');
        return;
    }

    let invoiceNumber: string | undefined = undefined;
    let invoiceDate: Date | null = new Date();
    let currencyCode: string | null = null;

    const purchaseInvoiceLines: PurchaseInvoiceLine[] = [];

    let documentIndex = 1;

    for (const expenseDocument of expenseDocuments) {

        const summaryFields = expenseDocument.SummaryFields!;
        for (const summaryField of summaryFields) {
            const type = summaryField.Type;
            if (type !== undefined) {
                const valueDetection = summaryField.ValueDetection;
                if (valueDetection !== undefined) {
                    const text = valueDetection.Text;
                    if (text !== undefined) {
                        if (type.Text == 'INVOICE_RECEIPT_ID') {
                            invoiceNumber = text;
                        } else if (type.Text == 'INVOICE_RECEIPT_DATE') {
                            invoiceDate = parseDateString(text);
                        } else if (type.Text == 'TOTAL') {
                            const currency = summaryField.Currency;
                            if (currency !== undefined) {
                                if (currency.Code !== undefined) {
                                    currencyCode = currency.Code!;
                                }
                            }
                        }
                    }
                }
            }
        }

        const lineItemGroups = expenseDocument.LineItemGroups!;
        for (const lineItemGroup of lineItemGroups) {

            const lineItems = lineItemGroup.LineItems!;

            let lineIndex = 0;
            for (const lineItem of lineItems) {

                let quantity: number | null = null;
                let amount: number | null = null;
                let itemNumber: string | null = null;
                let itemDescription: string | null = null;

                const fields = lineItem.LineItemExpenseFields;
                if (fields !== undefined) {
                    for (const field of fields) {
                        const type = field.Type;
                        if (type !== undefined) {
                            const valueDetection = field.ValueDetection;
                            if (valueDetection !== undefined) {
                                const text = valueDetection.Text;
                                if (text !== undefined) {
                                    if (type.Text == 'QUANTITY') {
                                        quantity = parseNumberString(valueDetection.Text!);
                                    } else if (type.Text == 'PRICE') {
                                        amount = parseNumberString(valueDetection.Text!);
                                    } else if (type.Text == 'PRODUCT_CODE') {
                                        itemNumber = valueDetection.Text ?? null;
                                    } else if (type.Text == 'ITEM') {
                                        itemDescription = valueDetection.Text ?? null;
                                    }
                                }
                            }
                        }
                    }
                }

                lineIndex++;

                purchaseInvoiceLines.push({
                    amount,
                    quantity,
                    supplierItemNumber: itemNumber,
                    supplierItemDescription: itemDescription,
                    indexedPosition: documentIndex + "." + lineItemGroup.LineItemGroupIndex + "." + lineIndex
                })
            }
        }

        documentIndex++;
    }

    if (invoiceNumber === undefined) {
        return "No invoice number found";
    }

    const purchaseInvoice: PurchaseInvoice = {
        finalized: false,
        currencyCode: 'DKK',
        purchaseInvoiceDate: invoiceDate ? invoiceDate.toISOString().slice(0, 10) : null,
        purchaseInvoiceNumber: invoiceNumber,
        supplierId,
        purchaseInvoiceLines
    }

    let response = await ims.post("purchaseInvoices", purchaseInvoice);
    let purchaseInvoiceId = response.data.id;


    ims.post("invocations/" + purchaseInvoiceId + "/finalize", {});

}

