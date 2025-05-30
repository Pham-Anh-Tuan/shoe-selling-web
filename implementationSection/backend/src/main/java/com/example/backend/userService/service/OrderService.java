package com.example.backend.userService.service;

import com.example.backend.core.request.OrderItemRequest;
import com.example.backend.core.request.OrderRequest;
import com.example.backend.core.utils.ProductUtil;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Order;
import com.example.backend.userService.model.OrderItem;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.repository.AccountRepository;
import com.example.backend.userService.repository.OrderRepository;
import com.example.backend.userService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ResponseEntity<?> createOrder(OrderRequest orderRequest) {
        Optional<Account> acc = accountRepository.findByEmail(orderRequest.getEmail());
        if (!acc.isPresent()) {
            return ResponseEntity.badRequest().body("Email not found");
        }

        Account account = acc.get();

        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setFullName(orderRequest.getFullName());
        order.setPhoneNumber(orderRequest.getPhoneNumber());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPayMethod(orderRequest.getPayMethod());
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setAccount(account); // gán người dùng vào đơn hàng

        List<OrderItem> orderItems = new ArrayList<>();
        System.out.println("do dai la: " + orderRequest.getOrderItemRequests().size());
        System.out.println("list la: " + orderRequest.getOrderItemRequests());
        for (OrderItemRequest orderItemReq : orderRequest.getOrderItemRequests()) {
            Optional<Product> p = productRepository.findById(orderItemReq.getId());
            if (!p.isPresent()) {
                return ResponseEntity.badRequest().body("Sản phẩm " + orderItemReq.getProductName() + " không còn tồn tại.");
            }
            Product product = p.get();

            if (product.getStatus() != 1) {
                return ResponseEntity.badRequest().body("Sản phẩm " + orderItemReq.getProductName() + " không còn tồn tại.");
            }

            int stock = ProductUtil.getQuantityByColorHexAndSize(product, orderItemReq.getColorHex(), orderItemReq.getSize());
            if (stock < orderItemReq.getQuantity()) {
                return ResponseEntity.badRequest().body("Số lượng sản phẩm " + orderItemReq.getProductName() + " chỉ còn " + stock);
            }

            ProductUtil.setQuantityByColorHexAndSize(product, orderItemReq.getColorHex(), orderItemReq.getSize(), stock - orderItemReq.getQuantity());

            productRepository.save(product);


            OrderItem orderItem = new OrderItem();

            orderItem.setId(UUID.randomUUID().toString());
            orderItem.setProductName(orderItemReq.getProductName());
            orderItem.setColorHex(orderItemReq.getColorHex());
            orderItem.setSize(orderItemReq.getSize());
            orderItem.setPurchaseQuantity(orderItemReq.getQuantity());
            orderItem.setPrice(orderItemReq.getPrice());
            orderItem.setPath(orderItemReq.getPath());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        orderRepository.save(order);
        return ResponseEntity.ok("Order successful");
    }
}
