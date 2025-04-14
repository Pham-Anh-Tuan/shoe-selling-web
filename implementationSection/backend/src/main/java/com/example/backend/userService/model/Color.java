package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "color")
public class Color {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(nullable = false, length = 20)
    private String colorHex;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "color")
    private List<Image> images;

    @OneToMany(mappedBy = "color")
    private List<SizeQuantity> sizeQuantities;
}
