package com.example.backend.userService.repository;

import com.example.backend.userService.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderByOrderDateDesc();
}
