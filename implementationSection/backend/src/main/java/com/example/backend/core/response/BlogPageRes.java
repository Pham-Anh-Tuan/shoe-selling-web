package com.example.backend.core.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BlogPageRes {
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
