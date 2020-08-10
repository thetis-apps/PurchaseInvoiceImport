package com.thetis.yarnliving.invoicehandler.function;

class Field {
	
	private double start;

	private double width;
	
	private Target target;
	
	public Field() {
		
	}
	
	public double getStart() {
		return start;
	}

	public void setStart(double start) {
		this.start = start;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public Target getTarget() {
		return target;
	}

	public void setTarget(Target target) {
		this.target = target;
	}

	boolean within(double x, double w) {
		return x >= start && x + w <= start + width;
	}

	@Override
	public String toString() {
		return "Field [start=" + start + ", width=" + width + ", target=" + target + "]";
	}
	
	

}