package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerProductRes;
import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ManagerProductResMapper {
    public static List<ManagerProductRes> toManagerProductResList(Page<Product> productsPage) {
        return productsPage.getContent().stream().map(product -> {
            ManagerProductRes res = new ManagerProductRes();
            res.setId(product.getId());
            res.setProductName(product.getProductName());
            res.setType(product.getType());
            res.setStatus(product.getStatus());
            res.setPrice(product.getPrice());
            return res;
        }).collect(Collectors.toList());
    }
}
