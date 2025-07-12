package com.example.backend.userService.repository;

import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SizeQuantityRepository extends JpaRepository<SizeQuantity, String> {

    @Query("SELECT sq.color.product FROM SizeQuantity sq " +
            "WHERE sq.size = :size " +
            "AND sq.color.colorHex = :colorHex " +
            "AND sq.color.product.productName = :productName")
    Optional<Product> findProductByNameColorSize(
            @Param("productName") String productName,
            @Param("colorHex") String colorHex,
            @Param("size") int size
    );

    @Query("SELECT SUM(sq.quantity) FROM SizeQuantity sq")
    Long getTotalQuantity();
}
