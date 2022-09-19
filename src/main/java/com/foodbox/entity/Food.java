package com.foodbox.entity;

import javax.persistence.*;
import java.util.Set;

/**
 * Food is a calatog.
 * If there is no boxes, there are still Food in the DB
 *
 * One To Many means: in a table you can have
 * one food that exists in many boxes. That would be
 * one food_id repeating along the rows related to
 * many box_id.
 *
 * The opposite is not true. You cannot have one box
 * that exists in many foods.
 *
 * private Set<Box> Boxs means that the one food is
 * related to the many boxes stored in this Set.
 *
 */

@Entity
public class Food {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String foodName;
    private Long price;
    private String cuisine;
    private String description;
    private String isEnabled;
    private String imageUrl;

    @OneToMany(mappedBy="foods")
    private Set<Box> Boxs;

    public Food() {
    }

    public Food(int id, String foodName, Long price, String cuisine, String description, String isEnabled,
                String imageUrl) {
        this.id = id;
        this.foodName = foodName;
        this.price = price;
        this.cuisine = cuisine;
        this.description = description;
        this.isEnabled = isEnabled;
        this.imageUrl = imageUrl;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String name) {
        this.foodName = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(String isEnabled) {
        this.isEnabled = isEnabled;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    @Override
    public String toString() {
        return "Dish{" +
                "id=" + id +
                ", name='" + foodName + '\'' +
                ", price=" + price +
                ", cuisine='" + cuisine + '\'' +
                ", description='" + description + '\'' +
                ", isEnabled='" + isEnabled + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
