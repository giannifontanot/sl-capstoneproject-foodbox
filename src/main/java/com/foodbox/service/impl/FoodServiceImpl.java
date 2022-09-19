package com.foodbox.service.impl;

import com.foodbox.entity.Food;
import com.foodbox.repository.FoodRepository;
import com.foodbox.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    FoodRepository foodRepository;

    @Override
    public List<Food> getFood() {
        return foodRepository.findAll();
    }
}

