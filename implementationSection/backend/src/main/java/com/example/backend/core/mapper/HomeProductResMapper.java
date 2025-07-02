package com.example.backend.core.mapper;

import com.example.backend.core.response.ColorWithImageRes;
import com.example.backend.core.response.HomeProductRes;
import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class HomeProductResMapper {
    public static List<HomeProductRes> toHomeProductResList(Page<Product> productsPage) {
        return productsPage.getContent().stream().map(product -> {
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
}
