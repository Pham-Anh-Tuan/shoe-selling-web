package com.example.backend.core.dto;

import lombok.Data;

import java.util.List;

@Data
public class ColorWithImageDTO {
    private String colorHex;
    private String mainImage; // chỉ lấy ảnh đầu tiên
}
