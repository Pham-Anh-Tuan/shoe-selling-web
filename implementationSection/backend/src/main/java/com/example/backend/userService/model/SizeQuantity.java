package com.example.backend.userService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sizeQuantity")
public class SizeQuantity {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(name = "size")
    private int size;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "colorId", nullable = false)
    private Color color;



}
