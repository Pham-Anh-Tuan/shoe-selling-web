package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerOrderRes;
import com.example.backend.userService.model.Order;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ManagerOrderResMapper {
    public static List<ManagerOrderRes> toManagerOrderResList(Page<Order> ordersPage) {
        return ordersPage.getContent().stream().map(order -> {
            ManagerOrderRes res = new ManagerOrderRes();
            res.setId(order.getId());
            res.setFullName(order.getFullName());
            res.setCustomerEmail(order.getAccount().getEmail());
            res.setPhoneNumber(order.getPhoneNumber());
            res.setOrderDate(order.getOrderDate());
            res.setDeliveryDate(order.getDeliveryDate());
            res.setTotalPrice(order.getTotalPrice());
            res.setShippingStatus(order.getShippingStatus());
            res.setPaymentStatus(order.getPaymentStatus());
            return res;
        }).collect(Collectors.toList());
    }
}
