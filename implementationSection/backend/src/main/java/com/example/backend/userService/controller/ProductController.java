package com.example.backend.userService.controller;

import com.example.backend.core.request.ProductUpdateRequest;
import com.example.backend.core.response.HomeProductRes;
import com.example.backend.core.response.ManagerProductRes;
import com.example.backend.core.response.ProductDetailRes;
import com.example.backend.core.mapper.ProductDetailMapper;
import com.example.backend.userService.model.Product;
import com.example.backend.core.request.ProductRequest;
import com.example.backend.userService.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(path = "/public/homeProducts")
    public ResponseEntity<List<HomeProductRes>> getProducts() {
        return ResponseEntity.ok(productService.getAllProductsOrdered());
    }

    @GetMapping(path = "/public/productDetail/{id}")
    public ResponseEntity<ProductDetailRes> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductDetailById(id);
        ProductDetailRes dto = ProductDetailMapper.toProductDetailRes(product);
        return ResponseEntity.ok(dto);
    }

    @GetMapping(path = "/admin/managerProducts")
    public ResponseEntity<List<ManagerProductRes>> getManagerProducts() {
        return ResponseEntity.ok(productService.getManagerProducts());
    }

    @PostMapping(value = "/admin/addProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addProduct(@ModelAttribute ProductRequest productRequest) {
        productService.addProduct(productRequest);
        return ResponseEntity.ok("Product added successfully.");
    }
    @PutMapping(value ="/admin/updateProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductUpdateRequest productUpdateRequest) {
        productService.updateProduct(productUpdateRequest);
        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/admin/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        boolean deleted = productService.deleteProductById(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
    }

}
