package com.example.backend.userService.service;

import com.example.backend.userService.repository.OrderRepository;
import com.example.backend.userService.repository.SizeQuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DashboardService {
    @Autowired
    private SizeQuantityRepository sizeQuantityRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Long getTotalProductQuantity() {
        return Optional.ofNullable(sizeQuantityRepository.getTotalQuantity()).orElse(0L);
    }

    public Long getDeliveredOrderCount() {
        return orderRepository.countByShippingStatus(2);
    }

    public Long getSoldProductCount() {
        return Optional.ofNullable(orderRepository.getTotalSoldOrReturned(2)).orElse(0L);
    }

    public Long getReturnedProductCount() {
        return Optional.ofNullable(orderRepository.getTotalSoldOrReturned(3)).orElse(0L);
    }
}
