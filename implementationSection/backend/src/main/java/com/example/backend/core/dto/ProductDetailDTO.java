package com.example.backend.core.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDetailDTO {
    private String id;
    private String productName;
    private double price;
    private int type;
    private String sideDes;
    private String mainDes;
    private List<ColorDTO> colors;
}
