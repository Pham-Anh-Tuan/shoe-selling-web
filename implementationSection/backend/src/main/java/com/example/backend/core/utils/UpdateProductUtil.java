package com.example.backend.core.utils;

import com.example.backend.core.request.ColorUpdateRequest;
import com.example.backend.core.request.ImageRequest;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class UpdateProductUtil {
    public static List<Color> deleteColorList(List<Color> colors, List<ColorUpdateRequest> colorUpdateRequests) {
        // Cần xử lý trường hợp  colorUpdateRequests == null

        List<String> colorUpdateIds = new ArrayList<>();
        for (ColorUpdateRequest colorUpdateRequest : colorUpdateRequests) {
            colorUpdateIds.add(colorUpdateRequest.getId());
        }

        List<Color> deleteColors = new ArrayList<>();
        for (Color color : colors) {
            if (!colorUpdateIds.contains(color.getId())) {
                deleteColors.add(color);
            }
        }
        return deleteColors;
    }

    public static void deleteImageByColor(List<Color> deleteColors) {
        // Lấy đường dẫn thư mục gốc của project
        String projectDir = System.getProperty("user.dir");

        // Lặp qua từng Color và xóa ảnh
        for (Color color : deleteColors) {
            for (Image image : color.getImages()) {
                String fileName = image.getPath();
                Path imagePath = Paths.get(projectDir, "user/uploads", fileName);
                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    System.err.println("Failed to delete image file: " + fileName);
                }
            }
        }
    }

    // Xóa những file ảnh mà path của nó có trong danh sách color cũ nhưng không có trong danh sách gửi về

    // 1. Lấy những ảnh đó
    public static List<Image> deleteImageList(List<Image> imageList, List<ImageRequest> imageRequestList) {
        List<String> updatePaths = new ArrayList<>();
        for (ImageRequest imageRequest : imageRequestList) {
            updatePaths.add(imageRequest.getPath());
        }

        List<Image> deleteImages = new ArrayList<>();
        for (Image image : imageList) {
            if (!updatePaths.contains(image.getPath())) {
                deleteImages.add(image);
            }
        }
        return deleteImages;
    }

    // 2. Xóa file ảnh
    public static void deleteImages(List<Image> deleteImages) {
        // Lấy đường dẫn thư mục gốc của project
        String projectDir = System.getProperty("user.dir");
        for (Image image : deleteImages) {
            String fileName = image.getPath();
            Path imagePath = Paths.get(projectDir, "user/uploads", fileName);
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                System.err.println("Failed to delete image file: " + fileName);
            }
        }
    }


}
