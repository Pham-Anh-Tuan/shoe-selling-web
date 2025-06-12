package com.example.backend.core.mapper;

import com.example.backend.core.response.ColorRes;
import com.example.backend.core.response.ImageRes;
import com.example.backend.core.response.ProductDetailRes;
import com.example.backend.core.response.SizeQuantityRes;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;

import java.util.stream.Collectors;

public class ProductDetailMapper {

    public static ProductDetailRes toProductDetailRes(Product product) {
        ProductDetailRes dto = new ProductDetailRes();
        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setType(product.getType());
        dto.setStatus(product.getStatus());
        dto.setSideDes(product.getSideDes());
        dto.setMainDes(product.getMainDes());
        dto.setEmail(product.getEmail());
        // Map list Color
        if (product.getColors() != null) {
            dto.setColors(product.getColors().stream()
                    .map(ProductDetailMapper::toColorRes)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public static ColorRes toColorRes(Color color) {
        ColorRes dto = new ColorRes();
        dto.setId(color.getId());
        dto.setColorHex(color.getColorHex());

        if (color.getImages() != null) {
            dto.setImages(color.getImages().stream()
                    .map(ProductDetailMapper::toImageRes)
                    .collect(Collectors.toList()));
        }

        if (color.getSizeQuantities() != null) {
            dto.setSizeQuantities(color.getSizeQuantities().stream()
                    .map(ProductDetailMapper::toSizeQuantityRes)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public static ImageRes toImageRes(Image image) {
        ImageRes dto = new ImageRes();
        dto.setId(image.getId());
        dto.setPath(image.getPath());
        return dto;
    }

    public static SizeQuantityRes toSizeQuantityRes(SizeQuantity sq) {
        SizeQuantityRes dto = new SizeQuantityRes();
        dto.setId(sq.getId());
        dto.setSize(sq.getSize());
        dto.setQuantity(sq.getQuantity());
        return dto;
    }
}
