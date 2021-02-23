package com.gilbert.carshop.models;

public class CarInformation {
	private String make;
    private String model;
    private int year_model;
    private double price;
    private boolean licensed;
    private String date_added;
    
    public CarInformation() {
    	
    }
    
    public CarInformation(String make, String model, int year_model, double price, boolean licensed, String date_added) {
    	this.make = make;
    	this.model = model;
    	this.year_model = year_model;
    	this.price = price;
    	this.licensed = licensed;
    	this.date_added = date_added;
    }
    
    public String getMake() {
		return make;
	}
	public void setMake(String make) {
		this.make = make;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public boolean isLicensed() {
		return licensed;
	}
	public void setLicensed(boolean licensed) {
		this.licensed = licensed;
	}
	public String getDateAdded() {
		return date_added;
	}
	public void setDateAdded(String date_added) {
		this.date_added = date_added;
	}
	public int getYearModel() {
		return year_model;
	}
	public void setYearModel(int year_model) {
		this.year_model = year_model;
	}

}
