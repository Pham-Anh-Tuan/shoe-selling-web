package com.example.backend.userService.service;

import com.example.backend.core.response.ColorWithImageRes;
import com.example.backend.core.response.HomeProductRes;
import com.example.backend.core.response.ManagerProductRes;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;
import com.example.backend.userService.repository.ProductRepository;
import com.example.backend.core.request.ColorRequest;
import com.example.backend.core.request.ProductRequest;
import com.example.backend.core.request.SizeQuantityRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product getProductDetailById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<HomeProductRes> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
            HomeProductRes res = new HomeProductRes();
            res.setId(product.getId());
            res.setProductName(product.getProductName());
            res.setPrice(product.getPrice());

            List<ColorWithImageRes> colorWithImageDTOs = product.getColors().stream().map(color -> {
                ColorWithImageRes colorWithImageDTO = new ColorWithImageRes();
                colorWithImageDTO.setColorHex(color.getColorHex());

                // Lấy ảnh đầu tiên (nếu có)
                String mainImage = color.getImages().isEmpty() ? null :
                        color.getImages().get(0).getPath();
                colorWithImageDTO.setMainImage(mainImage);
                return colorWithImageDTO;
            }).collect(Collectors.toList());

            res.setColors(colorWithImageDTOs);
            return res;
        }).collect(Collectors.toList());
    }

    public List<ManagerProductRes> getManagerProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            ManagerProductRes res = new ManagerProductRes();
            res.setId(product.getId());
            res.setProductName(product.getProductName());
            res.setType(product.getType());
            res.setPrice(product.getPrice());
            return res;
        }).collect(Collectors.toList());
    }

    public void addProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setProductName(productRequest.getProductName());
        product.setPrice(productRequest.getPrice());
        product.setType(productRequest.getType());
        product.setSideDes(productRequest.getSideDes());
        product.setMainDes(productRequest.getMainDes());

        List<Color> colorList = new ArrayList<>();
        for (ColorRequest colorRequest : productRequest.getColors()) {
            Color color = new Color();
            color.setId(UUID.randomUUID().toString());
            color.setColorHex(colorRequest.getColorHex());
            color.setProduct(product);

            List<Image> imageList = new ArrayList<>();
            for (MultipartFile file : colorRequest.getImageFiles()) {
                // Lấy đường dẫn thư mục gốc của project
                String projectDir = System.getProperty("user.dir");

                String fileName = file.getOriginalFilename();
                Path uploadPath = Paths.get(projectDir,"user/uploads", fileName);

                try {
                    Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                    Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image: " + fileName, e);
                }

                Image image = new Image();
                image.setId(UUID.randomUUID().toString());
                image.setPath(fileName);
                image.setColor(color);
                imageList.add(image);
            }

            List<SizeQuantity> sizeList = new ArrayList<>();
            for (SizeQuantityRequest sizeQuantity : colorRequest.getSizeQuantities()) {
                SizeQuantity size = new SizeQuantity();
                size.setId(UUID.randomUUID().toString());
                size.setSize(sizeQuantity.getSize());
                size.setQuantity(sizeQuantity.getQuantity());
                size.setColor(color);
                sizeList.add(size);
            }
            color.setImages(imageList);
            color.setSizeQuantities(sizeList);
            colorList.add(color);
        }
        product.setColors(colorList);
        productRepository.save(product);
    }

    public boolean deleteProductById(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id); // sẽ xóa tất cả Color, Image, SizeQuantity liên quan
            return true;
        }
        return false;
    }
}
