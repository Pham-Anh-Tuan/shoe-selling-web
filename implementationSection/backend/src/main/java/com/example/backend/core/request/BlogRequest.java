package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BlogRequest {
    private String id;
    private String title;
    private String thumbnailName;
    private MultipartFile thumbnailFile;
    private int status;
    private String content;
    private String email;
}
