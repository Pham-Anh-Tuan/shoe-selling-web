package com.example.backend.core.response;

import lombok.Data;

import java.util.List;

@Data
public class HomeProductRes {
    private String id;
    private String productName;
    private double price;
    private List<ColorWithImageRes> colors;

}
