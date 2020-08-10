package com.thetis.yarnliving.invoicehandler.function;

import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.SNSEvent;
import com.amazonaws.services.lambda.runtime.events.SNSEvent.SNSRecord;
import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;
import com.amazonaws.services.textract.model.Block;
import com.amazonaws.services.textract.model.GetDocumentAnalysisRequest;
import com.amazonaws.services.textract.model.GetDocumentAnalysisResult;
import com.amazonaws.services.textract.model.GetDocumentTextDetectionRequest;
import com.amazonaws.services.textract.model.GetDocumentTextDetectionResult;
import com.amazonaws.services.textract.model.Relationship;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.thetis.pack.client.Mapper;
import com.thetis.pack.client.MapperImpl;
import com.thetis.pack.client.ThetisPack;
import com.thetis.pack.client.model.EventMessage;
import com.thetis.pack.client.model.GlobalTradeItem;
import com.thetis.pack.client.model.InboundShipment;
import com.thetis.pack.client.model.InboundShipmentLine;
import com.thetis.yarnliving.invoicehandler.model.Completion;
import com.thetis.yarnliving.invoicehandler.model.Invoice;
import com.thetis.yarnliving.invoicehandler.model.Line;

public class Parser implements RequestHandler<SNSEvent, String> {
	
	private static final DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
	
	private Mapper mapper = new MapperImpl();
	
	private ThetisPack pack = new ThetisPack(mapper);
		
	static {
		decimalFormat.setDecimalFormatSymbols(DecimalFormatSymbols.getInstance(new Locale("da", "DK"))); 
	}

	@Override
    public String handleRequest(SNSEvent input, Context context) {
    	
        context.getLogger().log("Input: " + input);
        
    	// Call DetectDocumentText
        EndpointConfiguration endpoint = new EndpointConfiguration(
                "https://textract.eu-west-1.amazonaws.com", "eu-west-1");
        AmazonTextract textract = AmazonTextractClientBuilder.standard()
                .withEndpointConfiguration(endpoint).build();

        ObjectMapper mapper = new ObjectMapper();
        
        try {
        	
	        for (SNSRecord message : input.getRecords()) {
	        
	        	Completion completion = mapper.readValue(message.getSNS().getMessage(), Completion.class);
	        	String[] tags = completion.getJobTag().split("_");
	        	Long inboundShipmentId = Long.parseLong(tags[0]);
	        	String eventId = tags[1];
	        
		        Map<String, Block> blockMap = new HashMap<String, Block>();
	
	        	String paginationToken = null;
	        	boolean finished = false;
	            while (!finished) {
	            	
					GetDocumentTextDetectionRequest request= new GetDocumentTextDetectionRequest()
	                        .withJobId(completion.getJobId())
	                        .withMaxResults(100000)
	                        .withNextToken(paginationToken);
	                
	                GetDocumentTextDetectionResult result = textract.getDocumentTextDetection(request);

	                List<Block> blocks= result.getBlocks();
	                for (Block block : blocks) {
	                	blockMap.put(block.getId(), block);
	                }	                
	                
	                paginationToken = result.getNextToken();
	                if (paginationToken == null) {
	                    finished = true;
	                }
	                
	            }

 				InboundShipment inboundShipment = pack.get("inboundShipments", inboundShipmentId, InboundShipment.class);

 				Invoice invoice;
	            
 		    	String supplierNumber = inboundShipment.getSupplierNumber();
				InputStream is = this.getClass().getResourceAsStream("/resources/dataDocument_" + supplierNumber + ".json");
 		    	Definition definition = mapper.readValue(is, Definition.class);

 		    	System.out.println(definition.toString());
 		    	
 				invoice = parseFromLines(supplierNumber, definition, blockMap);
 
	            System.out.println(invoice.toString());
	            
            	List<InboundShipmentLine> inboundShipmentLines = inboundShipment.getInboundShipmentLines();

            	double sum = 0;
	            for (Line line : invoice.getLines()) { 
	            	
	            	InboundShipmentLine inboundShipmentLine = null;
	            	boolean found = false;
					Iterator<InboundShipmentLine> iterator = inboundShipmentLines.iterator();
	            	while (!found && iterator.hasNext()) {
	            		inboundShipmentLine = iterator.next();
	            		String suppliersItemNumber = inboundShipmentLine.getSuppliersItemNumber();
	            		if (suppliersItemNumber != null && suppliersItemNumber.equals(line.getItemNumber()) ) {
	            			found = true;
	            		} else if (inboundShipmentLine.getStockKeepingUnit().equals(line.getItemNumber())) {
	            			found = true;
	            		}
	            	}
	            	
	            	if (found) {
	            		
	            		GlobalTradeItem globalTradeItem = pack.get("globalTradeItems", inboundShipmentLine.getGlobalTradeItemId(), GlobalTradeItem.class);
	            		
	            		Long numUnitsContained = globalTradeItem.getNumUnitsContained() != null ? globalTradeItem.getNumUnitsContained() : 1;
	            		Long unitOfPurchase = globalTradeItem.getUnitOfPurchase() != null ? globalTradeItem.getUnitOfPurchase() : 1;
	            		BigDecimal factor = BigDecimal.valueOf(unitOfPurchase).divide(BigDecimal.valueOf(numUnitsContained), 6, RoundingMode.HALF_UP);	
	            		
            			Long qty = BigDecimal.valueOf(line.getQty()).multiply(factor).longValue();
	            		BigDecimal price = BigDecimal.valueOf(line.getPrice()).divide(factor, 2, RoundingMode.HALF_UP);
	            		BigDecimal amount = BigDecimal.valueOf(line.getAmount());

	            		Long numItemsExpected = inboundShipmentLine.getNumItemsExpected();
	            		if (numItemsExpected == null || qty != inboundShipmentLine.getNumItemsExpected()) {
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "numItemsExpected", qty, InboundShipmentLine.class);
	            		}
	            		
	            		BigDecimal purchasePrice = inboundShipmentLine.getPurchasePrice();
						if (purchasePrice == null || !purchasePrice.equals(price)) {
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "purchasePrice", price, InboundShipmentLine.class);
	            		}
						
						BigDecimal amountBeforeDiscount = price.multiply(BigDecimal.valueOf(qty));
						BigDecimal discount = amountBeforeDiscount.subtract(amount);
						if (!discount.equals(BigDecimal.ZERO)) {
							BigDecimal discountPercentage = discount.multiply(BigDecimal.valueOf(100)).divide(amountBeforeDiscount, 2, RoundingMode.HALF_UP);
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "discountPercentage", discountPercentage, InboundShipmentLine.class);
	            		}
						
        				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "suppliersDescription", line.getPageNumber() * 1000 + line.getLineNumber(), InboundShipmentLine.class);
						
						inboundShipmentLines.remove(inboundShipmentLine);
						
	            	} else {
	            		
	            		String messageText = MessageFormat.format("Cannot find trade item with SKU or suppliers item number equal to {0}.", line.getItemNumber());
	            		
    					EventMessage eventMessage = new EventMessage();
    					eventMessage.setMessageType("WARNING");
			            eventMessage.setMessageText(messageText);
			            eventMessage.setTime(new Date());
			            eventMessage.setSource("Yarnliving Invoice Handler");
			            pack.post("events", eventId, "messages", eventMessage);
			            
	            	}
	            	
	            	sum += line.getAmount();
	            }
	            
	            // Now zero lines that are left
	            
	            for (InboundShipmentLine inboundShipmentLine : inboundShipmentLines) {
    				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "numItemsExpected", 0L, InboundShipmentLine.class);
    				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "suppliersDescription", "", InboundShipmentLine.class);
	            }
	            
	            System.out.println(sum);
	            
				EventMessage eventMessage = new EventMessage();
				eventMessage.setMessageType("INFO");
	            eventMessage.setMessageText("Finished processing invoice");
	            eventMessage.setTime(new Date());
	            eventMessage.setSource("Yarnliving Invoice Handler");
	            pack.post("events", eventId, "messages", eventMessage);
	            
	        }
	        
	        
        } catch (Exception e) {
        	throw new RuntimeException(e);
        }
        
        return "Hello from Lambda!";
    }

	private Invoice parseFromLines(String supplierNumber, Definition definition, Map<String, Block> blockMap) throws ParseException {
		Invoice invoice = new Invoice();
		
		List<Field> fields = definition.getFields();
		
		for (Block block : blockMap.values()) {
			
			if (block.getBlockType().equals("PAGE")) {
				
				// Handle table
				
				int lineNumber = 1;
				
				int state = 0;
				
				double topOfLine = 0;
				
				for (Relationship relationship1 : block.getRelationships()) {
					
					if (relationship1.getType().equals("CHILD")) {
						
						Line invoiceLine = new Line();
						
						for (String cellId : relationship1.getIds()) {
							
							// Handle line

							Block line = blockMap.get(cellId);
							
							String text = line.getText();
							
							// State equals the index in the fields array
							
							double left = line.getGeometry().getBoundingBox().getLeft();
							double width = line.getGeometry().getBoundingBox().getWidth();
							double top = line.getGeometry().getBoundingBox().getTop();
							double height = line.getGeometry().getBoundingBox().getHeight();
							
							if (top + height > topOfLine + definition.getLineHeight()) {
								
								if (state > 0) {
									System.out.println("*** SKIPPING *** " + invoiceLine.toString());
								}
								
								state = 0;
								invoiceLine = new Line();		
							}

							System.out.println("State: " + state + " Line: " + text + " Left: " + left + " Width: " + width);

							Field field = fields.get(state);
							if (field.within(left, width)) {
								
								if (state == 0) {
									topOfLine = top;
								}
								
								List<String> texts = getTexts(blockMap, line);
								boolean match = setTargetField(supplierNumber, field, invoiceLine, texts);
								if (match) {
									state++;
								}
							}

							// If we have all necessary information start new line
							
		    				if (invoiceLine.getItemNumber() != null && invoiceLine.getQty() != null && 
		    						invoiceLine.getPrice() != null && invoiceLine.getAmount() != null) {
			            		invoiceLine.setPageNumber(block.getPage());
			            		invoiceLine.setLineNumber(lineNumber);
								lineNumber++;
			            		invoice.getLines().add(invoiceLine);
			            		invoiceLine = new Line();
			            		state = 0;
		    				}
				    				
						}

					} 
					
				}
				
			}
		}
		
		return invoice;
	}

	private boolean setTargetField(String supplierNumber, Field field, Line invoiceLine, List<String> texts) {
		boolean match = true;
		if (field.getTarget() == Target.ITEM_NUMBER) {
			if (supplierNumber.equals("03")) {
				if (texts.size() > 1) {
					invoiceLine.setItemNumber(texts.get(1));
				} else {
					match = false;
				}
			} else if (supplierNumber.equals("08")) {
				if (texts.size() > 2) {
					invoiceLine.setItemNumber(texts.get(2));
				} else {
					match = false;
				}
			} else if (supplierNumber.equals("23")) {
				if (texts.size() > 2) {
					invoiceLine.setItemNumber(texts.get(0) + texts.get(1));
				} else {
					match = false;
				}
			} else if (supplierNumber.equals("02") || supplierNumber.equals("27")) {
				if (texts.size() > 1 && texts.get(0).startsWith("Vare")) {
					invoiceLine.setItemNumber(texts.get(texts.size() - 1));
				} else {
					match = false;
				}
			} else {
				invoiceLine.setItemNumber(texts.get(0));
			}
		} else if (field.getTarget() == Target.QTY) {
			try {
				invoiceLine.setQty(parseDouble(texts));
			} catch (ParseException e) {
				match = false;
			}
		} else if (field.getTarget() == Target.PRICE) {
			try {
				invoiceLine.setPrice(parseDouble(texts));
			} catch (ParseException e) {
				match = false;
			}
		} else if (field.getTarget() == Target.AMOUNT) {
			try {
				invoiceLine.setAmount(parseDouble(texts));
			} catch (ParseException e) {
				match = false;
			}
		} else {
			throw new IllegalStateException("Unknown target for field.");
		}
		return match;
	}

	private Double parseDouble(List<String> texts) throws ParseException {
		String text;
		if (texts.size() > 1) {
			if (texts.get(0) != null && texts.get(0).matches("[0-9]*")) {
				text = texts.get(0) + "." + texts.get(1);
			} else {
				text = texts.get(0);
			}
		} else {
			text = texts.get(0);
		}
		if (text == null) {
			return null;
		}
		return decimalFormat.parse(text).doubleValue();
	}

	private List<String> getTexts(Map<String, Block> blockMap, Block cell) {
		List<String> texts = new ArrayList<String>();
		if (cell.getRelationships() != null) {
			for (Relationship relationship2 : cell.getRelationships()) {
				
				if (relationship2.getType().equals("CHILD")) {
					for (String wordId : relationship2.getIds()) {
						Block word = blockMap.get(wordId);
						texts.add(word.getText());
					}
					
				}
			
			}
		}
		return texts;
	}

}
