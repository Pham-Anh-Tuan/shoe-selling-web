package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerOrderRes;
import com.example.backend.core.response.UserOrderRes;
import com.example.backend.userService.model.Order;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class UserOrderResMapper {
    public static List<UserOrderRes> toUserOrderResList(Page<Order> ordersPage) {
        return ordersPage.getContent().stream().map(order -> {
            UserOrderRes res = new UserOrderRes();
            res.setId(order.getId());
            res.setOrderDate(order.getOrderDate());
            res.setTotalPrice(order.getTotalPrice());
            res.setShippingStatus(order.getShippingStatus());
            return res;
        }).collect(Collectors.toList());
    }
}
