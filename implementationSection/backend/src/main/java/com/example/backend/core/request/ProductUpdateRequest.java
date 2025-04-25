package com.example.backend.core.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductUpdateRequest {
    private String id;
    private String productName;
    private double price;
    private int type;
    private String mainDes;
    private String sideDes;
    private List<ColorUpdateRequest> colors;
}
