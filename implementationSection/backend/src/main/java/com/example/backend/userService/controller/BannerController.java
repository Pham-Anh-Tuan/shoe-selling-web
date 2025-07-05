package com.example.backend.userService.controller;

import com.example.backend.core.request.BannerRequest;
import com.example.backend.core.request.BlogRequest;
import com.example.backend.core.response.BannerUpdateRes;
import com.example.backend.core.response.HomeBannerRes;
import com.example.backend.userService.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BannerController {
    @Autowired
    private BannerService bannerService;

    @GetMapping(path = "/public/homeBanners")
    public List<HomeBannerRes> getHomeBanners() {
        return bannerService.getHomeBanners();
    }

    @GetMapping(path = "/staff/managerBanners")
    public Map<String, Object> getManagerBanners(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return bannerService.getManagerBanners(pageable);
    }

    @GetMapping(path = "/staff/searchManagerBanners")
    public Map<String, Object> searchManagerBanners(@RequestParam(defaultValue = "") String keyword,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return bannerService.searchManagerBanners(keyword, pageable);
    }

    @GetMapping(path = "/staff/bannerDetail/{id}")
    public ResponseEntity<BannerUpdateRes> getBannerDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(bannerService.getBannerDetail(id));
    }

    @PostMapping(value = "/staff/createBanner", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createBanner(@ModelAttribute BannerRequest bannerRequest) {
        bannerService.createBanner(bannerRequest);
        return ResponseEntity.ok("Banner added successfully.");
    }

    @PostMapping(value ="/staff/updateBanner", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateBlog(@ModelAttribute BannerRequest bannerRequest) {
        return bannerService.updateBanner(bannerRequest);
    }

    @DeleteMapping("/staff/deleteBannerById/{id}")
    public ResponseEntity<?> deleteBannerById(@PathVariable("id") String id) {
        return bannerService.deleteBanner(id);
    }
}
