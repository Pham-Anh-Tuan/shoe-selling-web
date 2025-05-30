package com.example.backend.core.utils;

import com.example.backend.userService.model.Color;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.model.SizeQuantity;

public class ProductUtil {
    public static int getQuantityByColorHexAndSize(Product product, String colorHex, int size) {
        for (Color color : product.getColors()) {
            if (color.getColorHex().equalsIgnoreCase(colorHex)) {
                for (SizeQuantity sq : color.getSizeQuantities()) {
                    if (sq.getSize() == size) {
                        return sq.getQuantity();
                    }
                }
            }
        }
        return 0;
    }

    public static void setQuantityByColorHexAndSize(Product product, String colorHex, int size, int newQuantity) {
        for (Color color : product.getColors()) {
            if (color.getColorHex().equalsIgnoreCase(colorHex)) {
                for (SizeQuantity sq : color.getSizeQuantities()) {
                    if (sq.getSize() == size) {
                        sq.setQuantity(newQuantity);
                        return; // đã set xong, không cần duyệt tiếp
                    }
                }
            }
        }
    }
}
