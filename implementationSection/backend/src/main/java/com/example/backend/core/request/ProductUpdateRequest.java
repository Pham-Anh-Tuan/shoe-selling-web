package com.example.backend.core.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductUpdateRequest {
    private String id;
    private String productName;
    private double price;
    private int type;
    private int status;
    private String mainDes;
    private String sideDes;
    private String email;
    private List<ColorUpdateRequest> colors;
}
