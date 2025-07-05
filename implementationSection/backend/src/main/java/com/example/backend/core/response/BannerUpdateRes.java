package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BannerUpdateRes {
    private String id;
    private String title;
    private String content;
    private String imageName;
    private int status;
    private LocalDateTime createdAt;
    private String email;

    public BannerUpdateRes(String id, String title, String content, String imageName, int status, LocalDateTime createdAt, String email) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageName = imageName;
        this.status = status;
        this.createdAt = createdAt;
        this.email = email;
    }
}
