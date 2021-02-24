package com.gilbert.carshop.controllers;
import com.gilbert.carshop.models.Car;
import com.gilbert.carshop.repositories.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {

    @Autowired
    CarRepository carRepository;

    @RequestMapping(method=RequestMethod.GET, value="/search/cars")
    public Iterable<Car> getCars(@RequestParam(name="sortBy", defaultValue = "date_added") String sortBy) {
    	return carRepository.getAllCars(sortBy);
    }
//    
//    @RequestMapping(method=RequestMethod.GET, value="/search/cars/{id}")
//    public Car getCar(@PathVariable("id") int id) {
//    	return carRepository.getCar(id);
//    }

}