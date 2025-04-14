package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "image")
public class Image {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(nullable = false, length = 200)
    private String path;

    @ManyToOne
    @JoinColumn(name = "colorId", nullable = false)
    private Color color;
}
