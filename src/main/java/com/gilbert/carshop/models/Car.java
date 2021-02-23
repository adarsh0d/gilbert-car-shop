package com.gilbert.carshop.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
public class Car {
	@Id
	private int _id;
	private CarInformation carInfo;

	public Car() {
	}

	public int getId() {
		return _id;
	}

	public void setId(int _id) {
		this._id = _id;
	}

	public Car(CarInformation carInfo, int id) {
		this._id = id;
		this.carInfo = carInfo;
	}

	public CarInformation getCarInfo() {
		return carInfo;
	}

	public void setCarInfo(CarInformation carInfo) {
		this.carInfo = carInfo;
	}

}