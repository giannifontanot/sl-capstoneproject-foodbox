package com.foodbox.controller;

import com.foodbox.entity.Food;
import com.foodbox.service.FoodService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dishes")
public class DishController {
    @Autowired
    FoodService dishService;

    @GetMapping
    public List<Food> getDishes(){
        return dishService.getFood();
    }

}
