package com.thetis.yarnliving.invoicehandler.model;

public class Line {
	
	private String itemNumber;
	
	private String itemName;
	
	private Double qty;
	
	private Double price;
	
	private Double discountPercentage;
	
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

	public Double getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(Double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
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

	@Override
	public String toString() {
		return "Line [itemNumber=" + itemNumber + ", itemName=" + itemName + ", qty=" + qty + ", price=" + price
				+ ", discountPercentage=" + discountPercentage + ", amount=" + amount + "]";
	}

}
