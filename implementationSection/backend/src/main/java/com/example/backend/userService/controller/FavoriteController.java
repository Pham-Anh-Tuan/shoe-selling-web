package com.example.backend.userService.controller;

import com.example.backend.userService.model.Product;
import com.example.backend.userService.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FavoriteController {
    @Autowired
    FavoriteService favoriteService;

    @PostMapping(value = "/user/toggleFavorite")
    public ResponseEntity<String> toggleFavorite(@RequestParam(defaultValue = "") String email,
                                            @RequestParam(defaultValue = "") String productId) {
        return favoriteService.toggleFavorite(email, productId);
    }

    @GetMapping("/user/getFavorites")
    public Map<String, Object> getFavorites(
            @RequestParam(defaultValue = "") String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return favoriteService.getFavoriteProducts(email, pageable);
    }

    @GetMapping("/user/getFavoriteProductIds")
    public ResponseEntity<List<String>> getFavoriteProductIds(@RequestParam(defaultValue = "") String email) {
        return ResponseEntity.ok( favoriteService.getFavoriteProductIds(email));
    }
}
