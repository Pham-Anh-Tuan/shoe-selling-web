package com.example.backend.core.response.blogRes;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManagerBlogRes extends BaseBlogRes {
    private int status;
    private LocalDateTime createdAt;
}
