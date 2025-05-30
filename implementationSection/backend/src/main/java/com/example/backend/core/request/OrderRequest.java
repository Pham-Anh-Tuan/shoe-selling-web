package com.example.backend.core.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String fullName;
    private String phoneNumber;
    private String shippingAddress;
    private int payMethod;
    private double totalPrice;
    private String email;
    private List<OrderItemRequest> orderItemRequests;
}
