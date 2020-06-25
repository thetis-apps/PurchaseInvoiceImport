package com.thetis.yarnliving.invoicehandler.model;

import java.util.ArrayList;
import java.util.List;

public class Invoice {
	
	private String requisitionNumber;
	
	private List<Line> lines = new ArrayList<Line>();

	public String getRequisitionNumber() {
		return requisitionNumber;
	}

	public void setRequisitionNumber(String requisitionNumber) {
		this.requisitionNumber = requisitionNumber;
	}

	public List<Line> getLines() {
		return lines;
	}

	public void setLines(List<Line> lines) {
		this.lines = lines;
	}

	@Override
	public String toString() {
		return "Invoice [requisitionNumber=" + requisitionNumber + ", lines=" + lines + "]";
	}

	
}
