package com.example.backend.core.response;

import lombok.Data;

@Data
public class ColorWithImageRes {
    private String colorHex;
    private String mainImage; // chỉ lấy ảnh đầu tiên
}
