package com.gilbert.carshop.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
public class Car {
    @Id
    String _id;
    String make;
    String model;
    String year_model;
    double price;
    Boolean licensed;
    String date_added;

    public Car() {
    }

    public String getId() {
		return _id;
	}

	public void setId(String _id) {
		this._id = _id;
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

	public String getYearModel() {
		return year_model;
	}

	public void setYear(String year) {
		this.year_model = year;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Boolean getLicensed() {
		return licensed;
	}

	public void setLicensed(Boolean licensed) {
		this.licensed = licensed;
	}

	public String getDateAdded() {
		return date_added;
	}

	public void setDateAdded(String date_added) {
		this.date_added = date_added;
	}

	public Car(String make, String model, String year_model, double price, Boolean licensed, String date_added, String id) {
        this._id = id;
        this.make = make;
        this.year_model = year_model;
        this.price = price;
        this.licensed = licensed;
        this.date_added = date_added;
        this.model = model;
    }

}