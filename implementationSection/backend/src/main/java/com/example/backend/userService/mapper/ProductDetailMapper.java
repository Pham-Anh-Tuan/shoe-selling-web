package com.example.backend.userService.mapper;

import com.example.backend.core.dto.ColorDTO;
import com.example.backend.core.dto.ImageDTO;
import com.example.backend.core.dto.ProductDetailDTO;
import com.example.backend.core.dto.SizeQuantityDTO;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;

import java.util.stream.Collectors;

public class ProductDetailMapper {

    public static ProductDetailDTO toProductDTO(Product product) {
        ProductDetailDTO dto = new ProductDetailDTO();
        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setType(product.getType());
        dto.setSideDes(product.getSideDes());
        dto.setMainDes(product.getMainDes());

        // Map list Color
        if (product.getColors() != null) {
            dto.setColors(product.getColors().stream()
                    .map(ProductDetailMapper::toColorDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public static ColorDTO toColorDTO(Color color) {
        ColorDTO dto = new ColorDTO();
        dto.setId(color.getId());
        dto.setColorHex(color.getColorHex());

        if (color.getImages() != null) {
            dto.setImages(color.getImages().stream()
                    .map(ProductDetailMapper::toImageDTO)
                    .collect(Collectors.toList()));
        }

        if (color.getSizeQuantities() != null) {
            dto.setSizeQuantities(color.getSizeQuantities().stream()
                    .map(ProductDetailMapper::toSizeQuantityDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public static ImageDTO toImageDTO(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setPath(image.getPath());
        return dto;
    }

    public static SizeQuantityDTO toSizeQuantityDTO(SizeQuantity sq) {
        SizeQuantityDTO dto = new SizeQuantityDTO();
        dto.setId(sq.getId());
        dto.setSize(sq.getSize());
        dto.setQuantity(sq.getQuantity());
        return dto;
    }
}
