package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDetailRes {
    private String id;
    private String fullName;
    private String phoneNumber;
    private String shippingAddress;
    private double totalPrice;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private int shippingStatus;
    private int paymentStatus;
    private int payMethod;
    private String email;
    private List<OrderItemRes> orderItems;
}
