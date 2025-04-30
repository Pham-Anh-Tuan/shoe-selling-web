package com.example.backend.core.utils;

import com.example.backend.core.config.ImageConfig;

import java.time.LocalDateTime;

public class Test {
    public static void main(String[] args) {
        System.out.println(ImageConfig.getImageDirPath());
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now);
    }
}
