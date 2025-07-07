package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class UserOrderDetailRes {
    private String id;
    private String phoneNumber;
    private String shippingAddress;
    private double totalPrice;
    private LocalDate deliveryDate;
    private int payMethod;
    private int shippingStatus;
    private List<OrderItemRes> orderItems;
}
