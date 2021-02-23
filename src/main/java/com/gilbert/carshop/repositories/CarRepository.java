package com.gilbert.carshop.repositories;

import com.gilbert.carshop.models.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, String> {
}