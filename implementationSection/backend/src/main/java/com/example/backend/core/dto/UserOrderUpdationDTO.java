package com.example.backend.core.dto;

import lombok.Data;

@Data
public class UserOrderUpdationDTO {
    private String id;
    private String phoneNumber;
    private String shippingAddress;
    private int payMethod;

    public UserOrderUpdationDTO(String id, String phoneNumber, String shippingAddress, int payMethod) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
        this.payMethod = payMethod;
    }
}
