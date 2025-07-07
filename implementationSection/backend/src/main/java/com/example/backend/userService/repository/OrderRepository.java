package com.example.backend.userService.repository;

import com.example.backend.userService.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderByOrderDateDesc();

    Page<Order> findByAccount_EmailAndShippingStatusInOrderByOrderDateDesc(String email, List<Integer> shippingStatus, Pageable pageable);

    Page<Order> findAllByOrderByOrderDateDesc(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE SUBSTRING(o.id, 1, 11) = :idPrefix ORDER BY o.orderDate DESC")
    Page<Order> findByIdPrefixOrderByOrderDateDesc(@Param("idPrefix") String idPrefix, Pageable pageable);

}
