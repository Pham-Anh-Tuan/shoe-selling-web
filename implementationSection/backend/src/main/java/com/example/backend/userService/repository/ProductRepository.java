package com.example.backend.userService.repository;

import com.example.backend.userService.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsById(String id);

    // Sắp xếp toàn bộ danh sách Product theo createdAt
    List<Product> findAllByOrderByCreatedAtAsc();
}
