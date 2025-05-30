package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "fullName", nullable = false, length = 100)
    private String fullName;

    @Column(name = "password", nullable = false, length = 200)
    private String password;

    @Column(name = "imageName", nullable = false, length = 200)
    private String imageName = "";

    @Column(name = "phoneNumber", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "shippingAddress", nullable = false, length = 200)
    private String shippingAddress;

    @Column(name = "gender")
    private int gender = 0;

    @Column(name = "role")
    private int role = 2;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> orders;
}
