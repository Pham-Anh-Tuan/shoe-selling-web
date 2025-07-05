package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.HomeBannerResMapper;
import com.example.backend.core.request.BannerRequest;
import com.example.backend.core.response.BannerUpdateRes;
import com.example.backend.core.response.HomeBannerRes;
import com.example.backend.core.response.ManagerBannerRes;
import com.example.backend.userService.model.Banner;
import com.example.backend.userService.model.Blog;
import com.example.backend.userService.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.core.mapper.ManagerBannerResMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.function.Function;

@Service
public class BannerService {
    @Autowired
    private BannerRepository bannerRepository;

    private Map<String, Object> toPagedResponse(Page<Banner> bannersPage, Function<Page<Banner>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(bannersPage));
        response.put("totalElements", bannersPage.getTotalElements());
        response.put("totalPages", bannersPage.getTotalPages());
        response.put("number", bannersPage.getNumber());
        response.put("size", bannersPage.getSize());
        response.put("hasNext", bannersPage.hasNext());
        response.put("hasPrevious", bannersPage.hasPrevious());
        return response;
    }

    public List<HomeBannerRes> getHomeBanners() {
        List<Banner> bannerList = bannerRepository.findAllByStatusOrderByCreatedAtDesc(1);
        return HomeBannerResMapper.toHomeBannerResList(bannerList);
    }

    public Map<String, Object> getManagerBanners(Pageable pageable) {
        Page<Banner> bannersPage = bannerRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(bannersPage, ManagerBannerResMapper::toManagerBannerResList);
    }

    public Map<String, Object> searchManagerBanners(String keyword, Pageable pageable) {
        Page<Banner> bannersPage = bannerRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        return toPagedResponse(bannersPage, ManagerBannerResMapper::toManagerBannerResList);
    }

    public BannerUpdateRes getBannerDetail(String id) {
        Optional<Banner> optionalBanner = bannerRepository.findById(id);
        if (optionalBanner.isEmpty()) {
            return null;
        }
        Banner banner = optionalBanner.get();
        BannerUpdateRes res = new BannerUpdateRes(banner.getId(),
                banner.getTitle(),
                banner.getContent(),
                banner.getImageName(),
                banner.getStatus(),
                banner.getCreatedAt(),
                banner.getEmail());
        return res;
    }

    @Transactional
    public void createBanner(BannerRequest bannerRequest) {
        Banner banner = new Banner();
        banner.setId(UUID.randomUUID().toString());
        banner.setTitle(bannerRequest.getTitle());
        banner.setContent(bannerRequest.getContent());
        banner.setStatus(bannerRequest.getStatus());
        banner.setEmail(bannerRequest.getEmail());

        String projectDir = System.getProperty("user.dir");
        MultipartFile file = bannerRequest.getImageFile();
        if (file != null) {
            String fileName = UUID.randomUUID().toString() + ".png";
            Path uploadPath = Paths.get(projectDir, ImageConfig.bannerPath, fileName);
            banner.setImageName(fileName);
            try {
                Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image: " + fileName, e);
            }
        }
        bannerRepository.save(banner);
    }

    @Transactional
    public ResponseEntity<String> updateBanner(BannerRequest bannerRequest) {
        String bannerId = bannerRequest.getId();
        Optional<Banner> optionalBanner = bannerRepository.findById(bannerId);
        if (optionalBanner.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy banner với ID: " + bannerId);
        }

        Banner banner = optionalBanner.get();
        banner.setTitle(bannerRequest.getTitle());
        banner.setContent(bannerRequest.getContent());
        banner.setStatus(bannerRequest.getStatus());
        banner.setEmail(bannerRequest.getEmail());

//        String imageName = banner.getImageName();
//        String newImageName = bannerRequest.getImageName();

        String projectDir = System.getProperty("user.dir");
        MultipartFile newImageFile = bannerRequest.getImageFile();
        if (newImageFile != null && !newImageFile.isEmpty()) {
            // Xóa image cũ nếu có
            if (banner.getImageName() != null) {
                Path oldThumbnailPath = Paths.get(projectDir, ImageConfig.bannerPath, banner.getImageName());
                try {
                    Files.deleteIfExists(oldThumbnailPath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa ảnh cũ.");
                }
            }

            // Lưu ảnh mới
            String newImageName = UUID.randomUUID().toString() + ".png";
            Path newImagePath = Paths.get(projectDir, ImageConfig.bannerPath, newImageName);
            try {
                Files.createDirectories(newImagePath.getParent());
                Files.copy(newImageFile.getInputStream(), newImagePath, StandardCopyOption.REPLACE_EXISTING);
                banner.setImageName(newImageName);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể lưu ảnh mới.");
            }
        }

//        String projectDir = System.getProperty("user.dir");
//        if (!imageName.equals(newImageName)) {
//            Path imagePath = Paths.get(projectDir, ImageConfig.bannerPath, imageName);
//            try {
//                Files.deleteIfExists(imagePath);
//            } catch (IOException e) {
//                System.err.println("Failed to delete image file: " + imageName);
//            }
//
//            MultipartFile file = bannerRequest.getImageFile();
//            if (file != null) {
//                String fileName = UUID.randomUUID().toString() + ".png";
//                Path uploadPath = Paths.get(projectDir, ImageConfig.bannerPath, fileName);
//                banner.setImageName(fileName);
//                try {
//                    Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
//                    Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
//                } catch (IOException e) {
//                    throw new RuntimeException("Failed to store image: " + fileName, e);
//                }
//            }
//        }

        bannerRepository.save(banner);
        return ResponseEntity.ok("Cập nhật banner thành công với.");
    }

    @Transactional
    public ResponseEntity<String> deleteBanner(String bannerId) {
        Optional<Banner> optionalBanner = bannerRepository.findById(bannerId);
        if (optionalBanner.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy banner với ID: " + bannerId);
        }
        Banner banner = optionalBanner.get();
        // Xóa file ảnh nếu có
        if (banner.getImageName() != null && !banner.getImageName().isEmpty()) {
            String projectDir = System.getProperty("user.dir");
            Path imagePath = Paths.get(projectDir, ImageConfig.bannerPath, banner.getImageName());

            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                System.err.println("Không thể xóa file ảnh: " + imagePath + ", lỗi: " + e.getMessage());
                // Có thể ném lỗi nếu bạn muốn rollback luôn khi xóa ảnh thất bại
            }
        }

        // Xóa banner trong DB
        bannerRepository.delete(banner);
        return ResponseEntity.ok("Đã xóa banner thành công.");
    }

}
