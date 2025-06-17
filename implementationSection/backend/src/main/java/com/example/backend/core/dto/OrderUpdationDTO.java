package com.example.backend.core.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderUpdationDTO {
    private String id;
    private LocalDate deliveryDate;
    private int shippingStatus = 0;
    private int paymentStatus = 0;
    private String email;

    public OrderUpdationDTO(String id, LocalDate deliveryDate, int shippingStatus, int paymentStatus, String email) {
        this.id = id;
        this.deliveryDate = deliveryDate;
        this.shippingStatus = shippingStatus;
        this.paymentStatus = paymentStatus;
        this.email = email;
    }
}
