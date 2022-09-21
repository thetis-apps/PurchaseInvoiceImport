# Introduction

This application enables the import of invoices received from suppliers. To import an invoice it must be attached to an existing inbound shipment.   

# Installation

You may install the latest version of the application from the AWS console (Serverless Application Repository) or from within Thetis IMS. It is registered under the name thetis-ims-purchase-invoice-import.

## Parameters

When installing the application from the AWS console you must provide values for the following parameters:

- ContextId
- ThetisClientId
- ThetisClientSecret
- ApiKey
- DevOpsEmail

A short explanation for each of these parameters are provided upon installation.

When installing the application from within Thetis IMS you do not need to specify these parameters.

# Configuration

In the data document of the supplier you must provide a definition of the invoices sent by the supplier. 
The definition must be seen in relation to the object returned by the AWS Textract service when detecting text in a document. You can find a description of that object [here](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-lines-words.html).

```
{
  "PurchaseInvoiceImport": {
    "lines": [
      {
        "words": [
          {
            "target": "qty",
            "pattern": "\\d*"
          }
        ],
        "maxLeft": 0.68,
        "minLeft": 0.64
      },
      {
        "words": [
          {
            "target": "price"
          }
        ],
        "maxLeft": 0.75,
        "minLeft": 0.7
      },
      {
        "words": [
          {
            "target": "amount"
          }
        ],
        "maxLeft": 0.86,
        "minLeft": 0.8
      },
      {
        "words": [
          {
            "pattern": "Vare"
          },
          {
            "pattern": "Nr"
          },
          {
            "target": "globalTradeItemNumber"
          }
        ],
        "maxLeft": 0.18,
        "minLeft": 0.17
      }
    ],
    sample: [...]
  }
}
```
#### lines

Each entry in the lines array defines a line in the invoice. Note that the Textract definition of a line is different from what you would intuitivly expect. 
A line is a set of coherent text. The text does not have to extent all across the page to constitute a line. 

When parsing the invoice the program will first look for a line that matches the first entry in the lines array. When such a line is found it will start looking for a line that matches the second entry in the lines array. The program continues like that until a line has been found for each entry in the lines array. 

A line matches an entry in the files array, if the left boundary of the line is placed within **minLeft** and **maxLeft** and every word on the line matches the corresponding entry in the **words** array. A word matches an entry in the **words** array, if it matches the **pattern** field.

#### minLeft

The left boundary of the line must be greater than this value. 

#### maxLeft

The left boundary of the line must be smaller than this value. 

#### words

An array describing the words expected within a given line.

#### pattern

For a line to match each word of the line must match the value of this field in the corresponding entry in the **words** array.

#### target

Name of the field that should get its value from the text of this word. Possible values are:

- businessItemNumber
- stockKeepingUnit
- globalTradeItemNumber
- qty
- price
- amount

#### maxLineHeight

If not all lines in the definition have been found within an area this height, the parser reverts to look for the first line in the definition. 

#### sample

If you attach an invoice from a supplier for which no definition exists, this field is used to hold the result of the text detection. You may then use that sample to create the definition.

# Events

## Document attached

When a document is attached to an inbound shipment, the application starts the Textract text detection. The text detection runs asynchronously. 
When the text detection completes it triggers the parsing of the document. The parser produces an array of invoice lines from the tree of pages/lines/words returned by the text detection.
After parsing the document the function updates the inbound shipment.

When looking up trade items the function uses the fields from the invoice line in the following sequence:

- businessItemNumber
- stockKeepingUnit
- globalTradeItemNumber

So, if for instance, the invoice line contains all three fields, then the system will first look for a trade item with the right business item number. If more exist it will use the first. If none exist it will try to lookup a trade item using the stock keeping unit. If none exists it will finally lookup the item using the global trade item number.

If no trade item is found the function inserts a message in the event log and skips the line.

The function tries to find an existing line on inbound shipment that matches the trade item found. If no such line exists, it creates a new line. 
If such a line does exist, it patches the expected number of items, purchase price and discount percentage of the found line.

After processing all invoice lines, the function alters those lines of the inbound shipments that no corresponding invoice line was found for. The number of items expected is set to null.

If a document is attached to an inbound shipment that is related to a supplier for which no definition exists, the function stores the result of the text detection in the **sample** field of the **PurchaseInvoiceImport** object. 
