package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.HomeProductResMapper;
import com.example.backend.core.mapper.ManagerProductResMapper;
import com.example.backend.core.request.*;
import com.example.backend.core.response.ColorWithImageRes;
import com.example.backend.core.response.HomeProductRes;
import com.example.backend.core.response.ManagerProductRes;
import com.example.backend.core.utils.UpdateProductUtil;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;
import com.example.backend.userService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product getProductDetailById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    private Map<String, Object> toPagedResponse(Page<Product> productsPage, Function<Page<Product>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(productsPage));
        response.put("totalElements", productsPage.getTotalElements());
        response.put("totalPages", productsPage.getTotalPages());
        response.put("number", productsPage.getNumber());
        response.put("size", productsPage.getSize());
        response.put("hasNext", productsPage.hasNext());
        response.put("hasPrevious", productsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> getProductsByTypeOrderByCreatedAtDescAndPage(List<Integer> types, Pageable pageable) {
        Page<Product> productsPage = productRepository.findAllByStatusAndTypeInOrderByCreatedAtDesc(1, types, pageable);
        return toPagedResponse(productsPage, HomeProductResMapper::toHomeProductResList);
    }

    public Map<String, Object> getProductsByTypeAndExcludeId(List<Integer> types, String excludedId, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByStatusAndTypeInAndIdNotOrderByCreatedAtDesc(1, types, excludedId, pageable);
        return toPagedResponse(productsPage, HomeProductResMapper::toHomeProductResList);
    }

    public Map<String, Object> searchProducts(String keyword, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByProductNameContainingIgnoreCaseAndStatus(keyword, 1, pageable);
        return toPagedResponse(productsPage, HomeProductResMapper::toHomeProductResList);
    }

    public Map<String, Object> getManagerProducts(Pageable pageable) {
        Page<Product> productsPage = productRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(productsPage, ManagerProductResMapper::toManagerProductResList);
    }

    public Map<String, Object> searchManagerProducts(String keyword, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByProductNameContainingIgnoreCase(keyword, pageable);
        return toPagedResponse(productsPage, ManagerProductResMapper::toManagerProductResList);
    }

    public List<HomeProductRes> getAllProductsOrdered() {
        List<Product> products = productRepository.findAllByStatusOrderByCreatedAtDesc(1);

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

    @Transactional
    public ResponseEntity<?> addProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setId(UUID.randomUUID().toString());

        if (productRepository.existsByProductName(productRequest.getProductName())) {
            return ResponseEntity
                    .badRequest()
                    .body("Tên của sản phẩm này đã tồn tại.");
        }

        product.setProductName(productRequest.getProductName());
        product.setPrice(productRequest.getPrice());
        product.setType(productRequest.getType());
        product.setStatus(productRequest.getStatus());
        product.setSideDes(productRequest.getSideDes());
        product.setMainDes(productRequest.getMainDes());
        product.setEmail(productRequest.getEmail());

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

                String fileName = UUID.randomUUID().toString() + ".png";
                Path uploadPath = Paths.get(projectDir, ImageConfig.uploadPath, fileName);

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
        return ResponseEntity.ok("Product added successful");
    }

    @Transactional
    public ResponseEntity<?> updateProduct(ProductUpdateRequest productUpdateRequest) {
        Product product = productRepository.findById(productUpdateRequest.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        String productNameRes = productUpdateRequest.getProductName();

        if (!productNameRes.equals(product.getProductName()) && productRepository.existsByProductName(productUpdateRequest.getProductName())) {
            return ResponseEntity
                    .badRequest()
                    .body("Tên của sản phẩm này đã tồn tại.");
        }

        product.setProductName(productNameRes);
        product.setPrice(productUpdateRequest.getPrice());
        product.setType(productUpdateRequest.getType());
        product.setStatus(productUpdateRequest.getStatus());
        product.setSideDes(productUpdateRequest.getSideDes());
        product.setMainDes(productUpdateRequest.getMainDes());
        product.setEmail(productUpdateRequest.getEmail());
        // Xóa những file ảnh mà id màu trong database không có trong danh sách màu gửi về
        List<Color> deleteColors = UpdateProductUtil.deleteColorList(product.getColors(), productUpdateRequest.getColors());
        UpdateProductUtil.deleteImageByColor(deleteColors);

        String projectDir = System.getProperty("user.dir");

        // Danh sách color cũ
        List<Color> colorList = product.getColors();
        List<String> colorIds = new ArrayList<>();
        for (Color color : colorList) {
            colorIds.add(color.getId());
        }

        // Danh sách color mới để cập nhật
        List<Color> newColorList = new ArrayList<>();

        // Xóa ảnh với điều kiện:
        // Những image mà không có trong danh sách ảnh gửi về
        // Hoặc những path có nhưng imageFile lại không null
        List<ColorUpdateRequest> colorUpdateRequestList = productUpdateRequest.getColors();
        for (int i = 0; i < colorUpdateRequestList.size(); i++) {
            Color color = new Color();
            color.setId(colorUpdateRequestList.get(i).getId());
            color.setColorHex(colorUpdateRequestList.get(i).getColorHex());
            color.setProduct(product);

            List<Image> imageList = new ArrayList<>();
            // Trường hợp giữ nguyên color
            if (colorIds.contains(colorUpdateRequestList.get(i).getId())) {
                // Danh sách image cũ của color đó
                List<Image> oldImageList = colorList.get(i).getImages();

                List<ImageRequest> imageRequestList = colorUpdateRequestList.get(i).getImages();

                // Xóa những file ảnh mà path của nó có trong danh sách color cũ nhưng không có trong danh sách gửi về
                List<Image> deleteImages = UpdateProductUtil.deleteImageList(oldImageList, imageRequestList);
                UpdateProductUtil.deleteImages(deleteImages);

                for (ImageRequest imageRequest : imageRequestList) {
                    Image image = new Image();

                    image.setId(imageRequest.getId());
                    image.setPath(imageRequest.getPath());

                    MultipartFile file = imageRequest.getImageFile();

                    // Trường hợp update ảnh hoặc thêm ảnh
                    if (file != null) {
                        String fileName = UUID.randomUUID().toString() + ".png";
                        Path uploadPath = Paths.get(projectDir, ImageConfig.uploadPath, fileName);
                        image.setPath(fileName);
                        try {
                            Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to store image: " + fileName, e);
                        }
                    }
                    image.setColor(color);
                    imageList.add(image);
                }
            } else {
                // Trường hợp color mới
                // Không cần xóa file ảnh
                for (ImageRequest imageRequest : colorUpdateRequestList.get(i).getImages()) {
                    Image image = new Image();
                    image.setId(imageRequest.getId());
                    String fileName = UUID.randomUUID().toString() + ".png";
                    image.setPath(fileName);
                    MultipartFile file = imageRequest.getImageFile();
                    if (file != null) {
                        Path uploadPath = Paths.get(projectDir, ImageConfig.uploadPath, fileName);

                        try {
                            Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to store image: " + fileName, e);
                        }
                    }
                    image.setColor(color);
                    imageList.add(image);
                }
            }
            color.setImages(imageList);

            List<SizeQuantity> sizeList = new ArrayList<>();
            for (SizeQuantityRequest sizeQuantity : colorUpdateRequestList.get(i).getSizeQuantities()) {
                SizeQuantity size = new SizeQuantity();
//                size.setId(UUID.randomUUID().toString());
                size.setId(sizeQuantity.getId());
                size.setSize(sizeQuantity.getSize());
                size.setQuantity(sizeQuantity.getQuantity());
                size.setColor(color);
                sizeList.add(size);
            }
            color.setSizeQuantities(sizeList);

            newColorList.add(color);
        }
        product.getColors().clear();
        product.getColors().addAll(newColorList);
        productRepository.save(product);
        return ResponseEntity.ok("Product updated successful");
    }

    @Transactional
    public boolean deleteProductById(String id) {
        if (productRepository.existsById(id)) {
            Product product = productRepository.findById(id).get();
            // Lấy đường dẫn thư mục gốc của project
            String projectDir = System.getProperty("user.dir");

            // Lặp qua từng Color và xóa ảnh
            for (Color color : product.getColors()) {
                for (Image image : color.getImages()) {
                    String fileName = image.getPath();
                    Path imagePath = Paths.get(projectDir, ImageConfig.uploadPath, fileName);
                    try {
                        Files.deleteIfExists(imagePath);
                    } catch (IOException e) {
                        System.err.println("Failed to delete image file: " + fileName);
                    }
                }
            }
            productRepository.deleteById(id); // sẽ xóa tất cả Color, Image, SizeQuantity liên quan
            return true;
        }
        return false;
    }
}
