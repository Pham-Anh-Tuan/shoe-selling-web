package com.example.backend.userService.controller;

import com.example.backend.core.dto.HomeProductDTO;
import com.example.backend.core.dto.ProductDetailDTO;
import com.example.backend.userService.mapper.ProductDetailMapper;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(path = "/homeProducts")
    public ResponseEntity<List<HomeProductDTO>> getProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping(path = "/productDetail/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductDetailById(id);
        ProductDetailDTO dto = ProductDetailMapper.toProductDTO(product);
        return ResponseEntity.ok(dto);
    }
}
