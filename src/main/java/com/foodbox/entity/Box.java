package com.foodbox.entity;

import javax.persistence.*;

/**
 * The box is not a catalog, but a join table.
 * If there is no boxes, we still have foods.
 * That is why foods is catalog and box is not.
 *
 * Many To One means: in a table you can have
 * many box_id with the same food_id
 *
 * Box is the owner of the relationship, and food
 * is the catalog.
 *
 * JoinColumn(name = "food_id") means:
 * "we will join with the other table by creating
 * here the column food_id"
 *
 * private Food foods means: "Each of the many
 * boxes  will have one food, and we will store
 * the relationship in this variable"
 *
 * That "foods" variable must have the same name
 * as the (mappedBy="foods"), because it is the way
 * both tables are related.
 *
 * Since this is the side that owns the relationship,
 * the setters and getters for this "foods" variable
 * appear here.
 *
 * Note that box own the relationship, but food_id is
 * not defined as a field. It will be created by
 * the ORM due to the JoinColumn annotation.
 */

@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food foods;

    @OneToOne(mappedBy="box")
    private Orden orden;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public Food getFoods() {
        return foods;
    }

    public void setFoods(Food foods) {
        this.foods = foods;
    }

}
