package com.thetis.yarnliving.invoicehandler.model;

public class Line {
	
	private String itemNumber;
	
	private Double qty;
	
	private Double price;
	
	private Double amount;
	
	private int pageNumber;
	
	private int lineNumber;

	public String getItemNumber() {
		return itemNumber;
	}

	public void setItemNumber(String itemNumber) {
		this.itemNumber = itemNumber;
	}

	public Double getQty() {
		return qty;
	}

	public void setQty(Double qty) {
		this.qty = qty;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Line [itemNumber=" + itemNumber + ", qty=" + qty + ", price=" + price + ", amount=" + amount
				+ ", pageNumber=" + pageNumber + ", lineNumber=" + lineNumber + "]";
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(int lineNumber) {
		this.lineNumber = lineNumber;
	}


}
