package com.example.backend.core.request;

import lombok.Data;

@Data
public class SizeQuantityRequest {
    private String id;
    private int size;
    private int quantity;
}
