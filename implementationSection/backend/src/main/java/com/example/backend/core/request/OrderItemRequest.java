package com.example.backend.core.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private String id;
    private String productName;
    private String colorHex;
    private int size;
    private int quantity;
    private double price;
    private String path;
}
