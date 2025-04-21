package com.example.backend.core.response;

import lombok.Data;

import java.util.List;

@Data
public class ColorRes {
    private String id;
    private String colorHex;
    private List<ImageRes> images;
    private List<SizeQuantityRes> sizeQuantities;
}
