package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HomeBannerRes {
    private String id;
    private String title;
    private String content;
    private String imageName;

}
