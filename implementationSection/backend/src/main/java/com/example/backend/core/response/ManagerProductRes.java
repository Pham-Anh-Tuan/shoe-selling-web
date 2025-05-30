package com.example.backend.core.response;

import lombok.Data;

@Data
public class ManagerProductRes {
    private String id;
    private String productName;
    private int type;
    private double price;
    private int status;
}
