package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ColorRequest {
    private String id;
    private String colorHex;
    private List<MultipartFile> imageFiles;
    private List<SizeQuantityRequest> sizeQuantities;
}
