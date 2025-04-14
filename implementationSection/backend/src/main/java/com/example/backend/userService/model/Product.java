package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(nullable = false, length = 100)
    private String productName;

    @Column(name = "price")
    private double price;

    @Column(name = "type")
    private int type;

    @Column(columnDefinition = "TEXT")
    private String sideDes;

    @Column(columnDefinition = "TEXT")
    private String mainDes;

    @OneToMany(mappedBy = "product")
    private List<Color> colors;

}
