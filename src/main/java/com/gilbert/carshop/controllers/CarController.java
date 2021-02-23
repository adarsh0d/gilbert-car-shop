package com.gilbert.carshop.controllers;
import com.gilbert.carshop.models.Car;
import com.gilbert.carshop.repositories.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {

    @Autowired
    CarRepository carRepository;

    @RequestMapping(method=RequestMethod.GET, value="/search/cars")
    public Iterable<Car> car() {
    	System.out.println(carRepository.getAllCars().get(0).getCarInfo().getMake());
        return carRepository.getAllCars();
    }

}