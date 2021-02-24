package com.gilbert.carshop.repositories;

import com.gilbert.carshop.models.Car;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, String> {
	@Aggregation(pipeline = {"{ $unwind: {'path': '$cars.vehicles'}}", "{$project: {'_id': '$cars.vehicles._id', 'carInfo': '$cars.vehicles', 'location': {'warehouse':'$name', 'name': '$cars.location', 'lat': '$location.lat', 'longitude': '$location.long'}}}", "{$sort: {'carInfo.?0': 1}}"})
	Iterable<Car> getAllCars(String sortBy);
}