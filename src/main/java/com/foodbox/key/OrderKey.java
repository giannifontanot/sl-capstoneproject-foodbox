package com.foodbox.key;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
public class OrderKey implements Serializable {

//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="client_id")
    private Long clientId;

    @Column(name="box_id")
    private Long boxId;
}
