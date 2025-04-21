package com.example.backend.core.response;

import lombok.Data;

import java.util.List;

@Data
public class ProductDetailRes {
    private String id;
    private String productName;
    private double price;
    private int type;
    private String sideDes;
    private String mainDes;
    private List<ColorRes> colors;
}
