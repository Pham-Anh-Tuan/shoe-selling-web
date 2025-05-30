package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orderItem")
public class OrderItem {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(nullable = false, length = 100)
    private String productName;

    @Column(nullable = false, length = 20)
    private String colorHex;

    @Column(name = "size")
    private int size;

    @Column(name = "purchaseQuantity")
    private int purchaseQuantity;

    @Column(name = "price")
    private double price;

    @Column(nullable = false, length = 200)
    private String path;

    @ManyToOne
    @JoinColumn(name = "order_table_id", nullable = false)
    private Order order;
}
