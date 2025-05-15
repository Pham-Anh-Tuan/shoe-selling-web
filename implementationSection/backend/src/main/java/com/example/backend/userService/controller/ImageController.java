package com.example.backend.userService.controller;

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
@RequestMapping("/api/public/productImages")
public class ImageController {
    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        // Lấy đường dẫn thư mục gốc của project
        String projectDir = System.getProperty("user.dir");

        // Tạo đường dẫn đến file ảnh
        Path imagePath = Paths.get(projectDir, "user/uploads", imageName);
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build(); // Trả về 404 nếu ảnh không tồn tại
        }

        // Đọc dữ liệu ảnh
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Xác định kiểu nội dung dựa vào phần mở rộng của ảnh
        String contentType = Files.probeContentType(imagePath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageBytes);
    }

}
