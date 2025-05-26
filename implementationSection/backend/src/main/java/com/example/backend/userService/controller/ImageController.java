package com.example.backend.userService.controller;

import com.example.backend.userService.service.ImageService;
import com.example.backend.userService.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/public")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/productImages/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "uploads");
    }

    @GetMapping("/avatars/{imageName}")
    public ResponseEntity<byte[]> getAvatarImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "avatars");
    }

}
