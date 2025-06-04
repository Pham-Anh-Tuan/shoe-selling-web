package com.example.backend.core.response;

import lombok.Data;

@Data
public class OrderItemRes {
    private String productName;
    private String colorHex;
    private int size;
    private int purchaseQuantity;
    private double price;
    private String path;
}
