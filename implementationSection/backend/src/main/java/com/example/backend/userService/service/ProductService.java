package com.example.backend.userService.service;

import com.example.backend.core.dto.ColorWithImageDTO;
import com.example.backend.core.dto.HomeProductDTO;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product getProductDetailById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<HomeProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
            HomeProductDTO dto = new HomeProductDTO();
            dto.setId(product.getId());
            dto.setProductName(product.getProductName());
            dto.setPrice(product.getPrice());

            List<ColorWithImageDTO> colorWithImageDTOs = product.getColors().stream().map(color -> {
                ColorWithImageDTO colorWithImageDTO = new ColorWithImageDTO();
                colorWithImageDTO.setColorHex(color.getColorHex());

                // Lấy ảnh đầu tiên (nếu có)
                String mainImage = color.getImages().isEmpty() ? null :
                        color.getImages().get(0).getPath();
                colorWithImageDTO.setMainImage(mainImage);
                return colorWithImageDTO;
            }).collect(Collectors.toList());

            dto.setColors(colorWithImageDTOs);
            return dto;
        }).collect(Collectors.toList());
    }
}
