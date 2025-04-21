package com.example.backend.userService.repository;

import com.example.backend.userService.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsById(String id);
}
