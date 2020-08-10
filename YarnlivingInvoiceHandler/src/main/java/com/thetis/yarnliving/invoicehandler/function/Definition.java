package com.thetis.yarnliving.invoicehandler.function;

import java.util.List;

public class Definition {
	
	private List<Field> fields;
	
	private Double lineHeight;

	public List<Field> getFields() {
		return fields;
	}

	public void setFields(List<Field> fields) {
		this.fields = fields;
	}

	public Double getLineHeight() {
		return lineHeight;
	}

	public void setLineHeight(Double lineHeight) {
		this.lineHeight = lineHeight;
	}

	@Override
	public String toString() {
		return "Definition [fields=" + fields + ", lineHeight=" + lineHeight + "]";
	}

}
