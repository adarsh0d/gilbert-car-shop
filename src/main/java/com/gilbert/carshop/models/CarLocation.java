package com.gilbert.carshop.models;

public class CarLocation {
	private String name;
	private String warehouse;
	private String lat;
	private String longitude;
	
	public CarLocation() {
		
	}
	public CarLocation(String name, String warehouse, String lat, String longitude) {
		this.name = name;
		this.warehouse = warehouse;
		this.lat = lat;
		this.longitude = longitude;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getWarehouse() {
		return warehouse;
	}
	public void setWarehouse(String warehouse) {
		this.warehouse = warehouse;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

}
