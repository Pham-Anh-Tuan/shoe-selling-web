package com.example.backend.core.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private String id;
    private String productName;
    private String colorId;
    private String colorHex;
    private String sizeId;
    private int size;
    private int quantity;
    private double price;
    private String imageId;
    private String path;
    private int availableQuantity;

    public CartItemDTO(String id, String productName, String colorId, String colorHex, String sizeId, int size, int quantity, double price, String imageId, String path, int availableQuantity) {
        this.id = id;
        this.productName = productName;
        this.colorId = colorId;
        this.colorHex = colorHex;
        this.sizeId = sizeId;
        this.size = size;
        this.quantity = quantity;
        this.price = price;
        this.imageId = imageId;
        this.path = path;
        this.availableQuantity = availableQuantity;
    }
}
