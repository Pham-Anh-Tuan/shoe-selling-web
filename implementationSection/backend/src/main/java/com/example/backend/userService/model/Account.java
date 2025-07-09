package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Column(name = "fullName", length = 100)
    private String fullName;

    @Column(name = "password", length = 200)
    private String password;

    @Column(name = "imageName", nullable = false, length = 200)
    private String imageName = "";

    @Column(name = "phoneNumber", length = 20)
    private String phoneNumber;

    @Column(name = "shippingAddress", length = 200)
    private String shippingAddress;

    @Column(name = "gender")
    private int gender = 0;

    @Column(name = "role")
    private int role = 2;

    @Column(name = "status")
    private int status;

    @Column(length = 100)
    private String emailUpdate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Favorite> favorites = new ArrayList<>();
}
