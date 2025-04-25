package com.example.backend.core.config;

import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageConfig {
    public static String getImageDirPath() {
        String projectDir = System.getProperty("user.dir");
        Path uploadPath = Paths.get(projectDir, "user/uploads");
        return uploadPath.toString();
    }
}
