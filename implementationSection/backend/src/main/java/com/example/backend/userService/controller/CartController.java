package com.example.backend.userService.controller;

import com.example.backend.core.dto.CartItemDTO;
import com.example.backend.core.request.OrderRequest;
import com.example.backend.userService.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping(value = "/public/getNewestCartItem")
    public ResponseEntity<?> getNewestCartItem(@RequestBody List<CartItemDTO> updatedCart) {
        return cartService.getNewestCartItem(updatedCart);
    }
}
