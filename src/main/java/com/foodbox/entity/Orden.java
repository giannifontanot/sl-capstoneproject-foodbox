package com.foodbox.entity;

import com.foodbox.key.OrderKey;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Orden {



    @EmbeddedId
    private OrderKey id;
    private String status;

    @OneToOne
    @MapsId("box_id")
    @JoinColumn(name = "box_id")
    private Box box;

    @ManyToOne
    @MapsId("client_id")
    @JoinColumn(name="client_id")
    private Client client;


}