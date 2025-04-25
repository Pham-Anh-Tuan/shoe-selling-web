package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ImageRequest {
    private String id;
    private String path;
    private MultipartFile imageFile;
}
