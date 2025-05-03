package com.example.backend.userService.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "role")
    private int role = 2;
}
