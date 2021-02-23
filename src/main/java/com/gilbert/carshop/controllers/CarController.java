package com.gilbert.carshop.controllers;
import com.gilbert.carshop.models.Car;
import com.gilbert.carshop.repositories.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class CarController {

    @Autowired
    CarRepository carRepository;

    @RequestMapping(method=RequestMethod.GET, value="/search/cars")
    public Iterable<Car> car() {
        return carRepository.findAll();
    }

}