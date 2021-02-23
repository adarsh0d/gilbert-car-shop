package com.gilbert.carshop.repositories;

import com.gilbert.carshop.models.Car;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, String> {
	@Aggregation(pipeline = {"{ $unwind: {'path': '$cars.vehicles'}}", "{$project: {'_id': '$cars.vehicles._id', 'carInfo': '$cars.vehicles'}}", "{$sort: {'carInfo.date_added': 1}}"})
	List<Car> getAllCars();
}