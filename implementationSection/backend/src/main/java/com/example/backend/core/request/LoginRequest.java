package com.example.backend.core.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
