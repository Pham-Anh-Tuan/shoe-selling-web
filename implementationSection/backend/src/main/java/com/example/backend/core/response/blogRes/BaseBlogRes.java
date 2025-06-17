package com.example.backend.core.response.blogRes;

import lombok.Data;

@Data
public abstract class BaseBlogRes {
    private String id;
    private String title;
    private String thumbnailName;
}
