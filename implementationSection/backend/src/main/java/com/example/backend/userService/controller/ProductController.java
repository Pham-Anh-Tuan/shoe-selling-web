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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(path = "/public/homeProducts")
    public ResponseEntity<List<HomeProductRes>> getProducts() {
        return ResponseEntity.ok(productService.getAllProductsOrdered());
    }

    @GetMapping(path = "/public/getProductsByType")
    public Map<String, Object> getProductsByTypeWithPaging(
            @RequestParam("types") List<Integer> types,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productService.getProductsByTypeOrderByCreatedAtDescAndPage(types, pageable);
    }

    @GetMapping(path = "/public/search")
    public Map<String, Object> getProductsByTypeWithPaging(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productService.searchProducts(keyword, pageable);
    }

    @GetMapping(path = "/admin/managerProducts")
    public Map<String, Object> getManagerProducts(@RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productService.getManagerProducts(pageable);
    }

    @GetMapping(path = "/public/productDetail/{id}")
    public ResponseEntity<ProductDetailRes> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductDetailById(id);
        ProductDetailRes dto = ProductDetailMapper.toProductDetailRes(product);
        return ResponseEntity.ok(dto);
    }

    @PostMapping(value = "/admin/addProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@ModelAttribute ProductRequest productRequest) {
        return productService.addProduct(productRequest);
    }
    @PutMapping(value ="/admin/updateProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductUpdateRequest productUpdateRequest) {
        return productService.updateProduct(productUpdateRequest);
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
