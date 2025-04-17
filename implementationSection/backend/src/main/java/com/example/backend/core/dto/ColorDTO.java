package com.example.backend.core.dto;

import lombok.Data;

import java.util.List;

@Data
public class ColorDTO {
    private String id;
    private String colorHex;
    private List<ImageDTO> images;
    private List<SizeQuantityDTO> sizeQuantities;
}
