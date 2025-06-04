package com.example.backend.userService.service;

import com.example.backend.core.dto.CartItemDTO;
import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Image;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;
import com.example.backend.userService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<?> getNewestCartItem(List<CartItemDTO> cart) {
        List<CartItemDTO> newCart = new ArrayList<>();
        for (CartItemDTO cartItemDTO : cart) {
            Optional<Product> p = productRepository.findById(cartItemDTO.getId());
            if (p.isPresent()) {
                Product product = p.get();
                if (product.getStatus() == 1) {
                    Color color = existColorId(cartItemDTO.getColorId(), product.getColors());
                    if (color != null) {
                        SizeQuantity sizeQuantity = existSizeId(cartItemDTO.getSizeId(), color.getSizeQuantities());
                        Image image = existImageId(cartItemDTO.getImageId(), color.getImages());
                        if (sizeQuantity != null && image != null) {
                            CartItemDTO newCartItem = new CartItemDTO(
                                    product.getId(),
                                    product.getProductName(),
                                    color.getId(),
                                    color.getColorHex(),
                                    sizeQuantity.getId(),
                                    sizeQuantity.getSize(),
                                    cartItemDTO.getQuantity(),
                                    product.getPrice(),
                                    image.getId(),
                                    image.getPath(),
                                    sizeQuantity.getQuantity()
                            );
                            newCart.add(newCartItem);
                        }
                    }
                }
            }
        }
        return ResponseEntity.ok(newCart);
    }

    public Color existColorId(String id, List<Color> list) {
        for (Color color : list) {
            if (id.equals(color.getId())) {
                return color;
            }
        }
        return null;
    }

    public SizeQuantity existSizeId(String id, List<SizeQuantity> list) {
        for (SizeQuantity sizeQuantity : list) {
            if (id.equals(sizeQuantity.getId())) {
                return sizeQuantity;
            }
        }
        return null;
    }

    public Image existImageId(String id, List<Image> list) {
        for (Image image : list) {
            if (id.equals(image.getId())) {
                return image;
            }
        }
        return null;
    }


}
