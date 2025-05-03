package com.example.backend.core.response;

import lombok.Getter;

@Getter
public class AuthRes {
    private String token;

    public AuthRes(String token) {
        this.token = token;
    }
}
