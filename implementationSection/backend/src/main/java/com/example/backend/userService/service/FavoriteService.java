package com.example.backend.userService.service;

import com.example.backend.core.mapper.HomeProductResMapper;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Favorite;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.repository.AccountRepository;
import com.example.backend.userService.repository.FavoriteRepository;
import com.example.backend.userService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<String> toggleFavorite(String email, String productId) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (accountOpt.isEmpty() || productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Tài khoản hoặc sản phẩm không tồn tại.");
        }

        Account account = accountOpt.get();
        Product product = productOpt.get();

        Optional<Favorite> existing = favoriteRepository.findByAccountAndProduct(account, product);

        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
            return ResponseEntity.ok("Đã xóa khỏi danh sách yêu thích.");
        } else {
            Favorite favorite = new Favorite();
            favorite.setId(UUID.randomUUID().toString());
            favorite.setAccount(account);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
            return ResponseEntity.ok("Đã thêm vào danh sách yêu thích.");
        }
    }

    public List<String> getFavoriteProductIds(String email) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            return Collections.emptyList();
        }
        List<Favorite> favorites = favoriteRepository.findByAccount(accountOpt.get());
        List<Product> products = favorites.stream().map(Favorite::getProduct).collect(Collectors.toList());
        return extractProductIds(products);
    }

    public List<String> extractProductIds(List<Product> products) {
        return products.stream()
                .map(Product::getId)
                .collect(Collectors.toList());
    }

//    public Map<String, Object> getProductsByTypeOrderByCreatedAtDescAndPage(List<Integer> types, Pageable pageable) {
//        Page<Product> productsPage = productRepository.findAllByStatusAndTypeInOrderByCreatedAtDesc(1, types, pageable);
//        return toPagedResponse(productsPage, HomeProductResMapper::toHomeProductResList);
//    }

//    public Map<String, Object> getFavoriteProducts(String email, Pageable pageable) {
//        Optional<Account> accountOpt = accountRepository.findByEmail(email);
//        if (accountOpt.isEmpty()) {
//            // Trả về cấu trúc rỗng nếu không có tài khoản
//            Page<Product> emptyPage = Page.empty(pageable);
//            return toPagedResponse(emptyPage, Page::getContent);
//        }
//
//        List<Favorite> favorites = favoriteRepository.findByAccount(accountOpt.get());
//
//        List<Product> allProducts = favorites.stream()
//                .map(Favorite::getProduct)
//                .collect(Collectors.toList());
//
//        int start = (int) pageable.getOffset();
//        int end = Math.min(start + pageable.getPageSize(), allProducts.size());
//

    /// /        int start = pageable.getPageNumber();
    /// ///        int end = pageable.getPageSize();
//
//        List<Product> pagedList = (start <= end)
//                ? allProducts.subList(start, end)
//                : Collections.emptyList();
//
//        Page<Product> productPage = new PageImpl<>(pagedList, pageable, allProducts.size());
//
//        return toPagedResponse(productPage, HomeProductResMapper::toHomeProductResList);
//    }
    public Map<String, Object> getFavoriteProducts(String email, Pageable pageable) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            // Trả về trang rỗng nếu không có tài khoản
            Page<Product> emptyPage = Page.empty(pageable);
            return toPagedResponse(emptyPage, Page::getContent);
        }

        // Phân trang trực tiếp trong database
        Page<Favorite> favoritePage = favoriteRepository.findByAccount(accountOpt.get(), pageable);

        // Lấy danh sách sản phẩm từ favoritePage
        List<Product> products = favoritePage.getContent()
                .stream()
                .map(Favorite::getProduct)
                .collect(Collectors.toList());

        // Tạo Page<Product> để xử lý kết quả
        Page<Product> productPage = new PageImpl<>(products, pageable, favoritePage.getTotalElements());

        return toPagedResponse(productPage, HomeProductResMapper::toHomeProductResList);
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

}

