package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BannerRequest {
    private String id;
    private String title;
    private String content;
    private String imageName;
    private MultipartFile imageFile;
    private int status;
    private String email;
}
