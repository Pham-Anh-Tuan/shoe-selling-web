package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ManagerOrderRes {
    private String id;
    private String fullName;
    private String customerEmail;
    private String phoneNumber;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private double totalPrice;
    private int shippingStatus;
    private int paymentStatus;
}
