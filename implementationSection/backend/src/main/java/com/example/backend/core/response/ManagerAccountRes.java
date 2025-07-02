package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManagerAccountRes {
    private String id;
    private String email;
    private String fullName;
    private int role;
    private int status;
    private LocalDateTime createdAt;
}
