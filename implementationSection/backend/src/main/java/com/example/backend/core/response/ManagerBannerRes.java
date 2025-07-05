package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManagerBannerRes {
    private String id;
    private String title;
    private String imageName;
    private int status;
    private LocalDateTime createdAt;
}
