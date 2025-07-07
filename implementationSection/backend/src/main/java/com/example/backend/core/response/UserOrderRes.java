package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserOrderRes {
    private String id;
    private LocalDate orderDate;
    private double totalPrice;
    private int shippingStatus;
}
