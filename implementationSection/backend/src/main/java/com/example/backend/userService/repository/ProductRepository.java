package com.example.backend.userService.repository;

import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsById(String id);

    // Sắp xếp toàn bộ danh sách Product theo createdAt
    List<Product> findAllByOrderByCreatedAtAsc();

    // Sắp xếp toàn bộ danh sách Product theo createdAt
    List<Product> findAllByOrderByCreatedAtDesc();

    boolean existsByProductName(String productName);

    List<Product> findAllByStatusOrderByCreatedAtDesc(int status);

    List<Product> findAllByTypeInOrderByCreatedAtDesc(List<Integer> type);

    Page<Product> findAllByTypeInOrderByCreatedAtDesc(List<Integer> type, Pageable pageable);
}
