package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_table")
public class Order {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(name = "fullName", nullable = false, length = 100)
    private String fullName;

    @Column(name = "phoneNumber", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "shippingAddress", nullable = false, length = 200)
    private String shippingAddress;

    @Column(name = "totalPrice")
    private double totalPrice;

    @Column(name = "orderDate", updatable = false)
    LocalDate orderDate;

    @Column(name = "deliveryDate", updatable = false)
    LocalDate deliveryDate;

    @Column(name = "shippingStatus")
    private int shippingStatus = 0;

    @Column(name = "paymentStatus")
    private int paymentStatus = 0;

    @Column(name = "payMethod")
    private int payMethod = 1;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

}
