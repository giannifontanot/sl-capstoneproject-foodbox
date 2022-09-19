package com.foodbox;

import com.foodbox.entity.Food;
import com.foodbox.entity.Food;
import com.foodbox.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.PrintStream;

@RestController
@SpringBootApplication
public class SlCapstoneprojectFoodboxApplication {

    @Autowired
    FoodRepository foodRepository;

    @RequestMapping("/")
    public String greet() {
        return "welcome!";
    }

    public static void main(String[] args) {
        SpringApplication.run(SlCapstoneprojectFoodboxApplication.class, args);
    }

    //@Override
    public void run(String... args) throws Exception {

//        private int id;
//        private String foodName;
//        private Long price;
//        private String cuisine;
//        private String description;
//        private String isEnabled;
//        private String imageUrl;

        Food food = new Food(1,"food name", 10L, "MEXICAN","Best Food", "Y","../image.jpg");
        foodRepository.save(food);
    }
}
