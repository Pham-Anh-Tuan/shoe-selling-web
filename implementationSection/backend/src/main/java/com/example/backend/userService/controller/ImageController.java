package com.example.backend.userService.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/images")
public class ImageController {
    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        // Đường dẫn ảnh trong resource
        ClassPathResource imgFile = new ClassPathResource("static/productImages/" + imageName);

        byte[] imageBytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

        // Xác định kiểu nội dung dựa vào phần mở rộng của ảnh
        String contentType = Files.probeContentType(imgFile.getFile().toPath());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageBytes);
    }

}
