package com.example.backend.userService.repository;

import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsById(String id);

    boolean existsByProductName(String productName);

    List<Product> findAllByStatusOrderByCreatedAtDesc(int status);

    Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Product> findAllByStatusAndTypeInOrderByCreatedAtDesc(int status, List<Integer> type, Pageable pageable);

    Page<Product> findByProductNameContainingIgnoreCaseAndStatus(String keyword, int status, Pageable pageable);

    Page<Product> findByProductNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Product> findByStatusAndTypeInAndIdNotOrderByCreatedAtDesc(int status, List<Integer> type, String excludedId, Pageable pageable);

}
