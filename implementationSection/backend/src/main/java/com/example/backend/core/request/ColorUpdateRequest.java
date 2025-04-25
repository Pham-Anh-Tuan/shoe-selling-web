package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ColorUpdateRequest {
    private String id;
    private String colorHex;
    private List<ImageRequest> images;
    private List<SizeQuantityRequest> sizeQuantities;
}
