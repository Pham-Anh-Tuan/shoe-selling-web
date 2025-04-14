package com.example.backend.core.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private String id;
    private String productName;
    private double price;
    private List<ColorWithImageDTO> colors;

}
