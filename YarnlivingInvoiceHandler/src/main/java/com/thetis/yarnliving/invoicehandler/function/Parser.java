package com.thetis.yarnliving.invoicehandler.function;

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
	            	
					GetDocumentAnalysisRequest request= new GetDocumentAnalysisRequest()
	                        .withJobId(completion.getJobId())
	                        .withMaxResults(100000)
	                        .withNextToken(paginationToken);
	                
	                GetDocumentAnalysisResult result = textract.getDocumentAnalysis(request);

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
	            
 				if (inboundShipment.getSupplierNumber().equals("10")) {
 					invoice = parseFromLines(blockMap);
 				} else {
 					invoice = parseFromTables(blockMap);
 				}

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

	            		Long numItemsExpected = inboundShipmentLine.getNumItemsExpected();
	            		if (numItemsExpected == null || qty != inboundShipmentLine.getNumItemsExpected()) {
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "numItemsExpected", qty, InboundShipmentLine.class);
	            		}
	            		
	            		BigDecimal purchasePrice = inboundShipmentLine.getPurchasePrice();
						if (purchasePrice == null || !purchasePrice.equals(price)) {
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "purchasePrice", price, InboundShipmentLine.class);
	            		}
						
						BigDecimal discountPercentage = inboundShipmentLine.getDiscountPercentage();
						if (discountPercentage == null || line.getDiscountPercentage() != discountPercentage.doubleValue()) {
            				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "discountPercentage", BigDecimal.valueOf(line.getDiscountPercentage() != null ? line.getDiscountPercentage() : 0), InboundShipmentLine.class);
	            		}
						
        				pack.put("inboundShipmentLines", inboundShipmentLine.getId(), "suppliersDescription", line.getPageNumber() * 1000 + line.getLineNumber(), InboundShipmentLine.class);
						
						inboundShipmentLines.remove(inboundShipmentLine);
						
	            	} else {
	            		
	            		String messageText = MessageFormat.format("Cannot find trade item with SKU or suppliers item number equal to {0}. The name of the item is {1}.", line.getItemNumber(), line.getItemName());
	            		
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

	private Invoice parseFromTables(Map<String, Block> blockMap) throws ParseException {
		
		Invoice invoice = new Invoice();
		for (Block block : blockMap.values()) {
			
			if (block.getBlockType().equals("TABLE")) {
				
				// Handle table
				
				int lineNumber = 1;
				
				int itemNumberIdx = 0;
				int itemNameIdx = 0;
				int unitIdx = 0;
				int qtyIdx = 0;
				int priceIdx = 0;
				int discountPercentageIdx = 0;
				int amountIdx = 0;
				
				for (Relationship relationship1 : block.getRelationships()) {
					
					if (relationship1.getType().equals("CHILD")) {
						
						Line line = new Line();
						
						for (String cellId : relationship1.getIds()) {
							
							// Handle cell

							Block cell = blockMap.get(cellId);
							
							List<String> texts = getTexts(blockMap, cell);
							
							if (cell.getRowIndex() > 1) {
		    					
								if (!texts.isEmpty()) {
								
		    						if (cell.getColumnIndex() == itemNumberIdx) {
		    							line.setItemNumber(String.join(" ", texts));
		    						} else if (cell.getColumnIndex() == itemNameIdx) {
		        						line.setItemName(String.join(" ", texts));
		    						} else if (cell.getColumnIndex() == qtyIdx) {
		    							line.setQty(parseDouble(texts));
		    						} else if (cell.getColumnIndex() == priceIdx) {
		    							line.setPrice(parseDouble(texts));
		    						} else if (cell.getColumnIndex() == discountPercentageIdx) {
		    							line.setDiscountPercentage(parseDouble(texts));
		    						} else if (cell.getColumnIndex() == amountIdx) {	
		    							line.setAmount(parseDouble(texts));
		    						}
		    						
								}
								
							} else {
								
								String value = String.join(" ", texts);
								if (value.equals("Nummer") || value.equals("VARENR")) {
									itemNumberIdx = cell.getColumnIndex();
								} else if (value.equals("Beskrivelse") || value.equals("VAREBETEGNELSE")) {
									itemNameIdx = cell.getColumnIndex();
								} else if (value.equals("Antal") || value.equals("ANTAL")) {
									qtyIdx = cell.getColumnIndex();
								} else if (value.equals("Enhed")) {
									unitIdx = cell.getColumnIndex();
								} else if (value.equals("Antal Enhed")) {
									qtyIdx = cell.getColumnIndex();
								} else if (value.equals("Enhedspris") || value.equals("A PRIS")) {
									priceIdx = cell.getColumnIndex();
								} else if (value.endsWith("pct.") || value.equals("%")) {
									discountPercentageIdx = cell.getColumnIndex();
								} else if (value.equals("Belob") || value.equals("BELOB")) {
									amountIdx = cell.getColumnIndex();
								}
							}

							// If we have all necessary information flush line to collection
							
		    				if (line.getItemNumber() != null && line.getQty() != null && 
		    						line.getPrice() != null && line.getAmount() != null) {
			            		line.setPageNumber(block.getPage());
			            		line.setLineNumber(lineNumber);
								lineNumber++;
			            		invoice.getLines().add(line);
			            		line = new Line();
		    				}
						
						}

					} 
					
				}
				
			}
		}
		
		return invoice;
	}
	
	private class Range {
		
		private double start;

		private double end;
		
		public Range(double start, double end) {
			super();
			this.start = start;
			this.end = end;
		}

		private boolean within(double x) {
			return x >= start && x <= end;
		}
		
	}
	
	private Invoice parseFromLines(Map<String, Block> blockMap) throws ParseException {
		Invoice invoice = new Invoice();
		for (Block block : blockMap.values()) {
			
			if (block.getBlockType().equals("PAGE")) {
				
				// Handle table
				
				int lineNumber = 1;
				
				Range itemNumberRange = new Range(0.050, 0.064);
				Range itemNameRange = new Range(0.230, 0.232);
				Range unitRange = new Range(0, 0);
				Range qtyRange = new Range(0.500, 0.600);
				Range priceRange = new Range(0.600, 0.740);
				Range discountPercentageRange = new Range(0.750, 0.800);
				Range amountRange = new Range(0.810, 1);
				
				int state = 0;
				
				for (Relationship relationship1 : block.getRelationships()) {
					
					if (relationship1.getType().equals("CHILD")) {
						
						Line invoiceLine = new Line();
						
						for (String cellId : relationship1.getIds()) {
							
							// Handle line

							Block line = blockMap.get(cellId);
							
							System.out.println("State: " + state + " Line: " + line.getText());
							
							double pos = line.getGeometry().getBoundingBox().getLeft();
							
							if (state == 0) {
								if (line.getText().equals("Item #") && itemNumberRange.within(pos)) {
									state = 1;
								} 
							} else if (state == 1) {
								if (line.getText().equals("Total")) {
									state = 2;
								} 
							} else if (state == 2) {
								List<String> texts = getTexts(blockMap, line);
								if (itemNumberRange.within(pos)) {
									invoiceLine.setItemNumber(line.getText());
								} else if (itemNameRange.within(pos)) {
									invoiceLine.setItemName(line.getText());
								} else if (qtyRange.within(pos)) {
									invoiceLine.setQty(parseDouble(texts));
								} else if (priceRange.within(pos)) {
									invoiceLine.setPrice(parseDouble(texts));
								} else if (discountPercentageRange.within(pos)) {
									invoiceLine.setDiscountPercentage(parseDouble(texts));
								} else if (amountRange.within(pos)) {
									invoiceLine.setAmount(parseDouble(texts));
								}
								
			    				if (invoiceLine.getItemNumber() != null && invoiceLine.getQty() != null && 
			    						invoiceLine.getPrice() != null && invoiceLine.getAmount() != null) {
				            		invoiceLine.setPageNumber(block.getPage());
				            		invoiceLine.setLineNumber(lineNumber);
									lineNumber++;
				            		invoice.getLines().add(invoiceLine);
				            		invoiceLine = new Line();
			    				}
			    				
							}
							
						}

					} 
					
				}
				
			}
		}
		
		return invoice;
	}

	private Double parseDouble(List<String> texts) throws ParseException {
		try {
			String text = texts.get(0);
			if (text == null) {
				return null;
			}
			return decimalFormat.parse(text).doubleValue();
		} catch (ParseException e) {
			return null;
		}
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
