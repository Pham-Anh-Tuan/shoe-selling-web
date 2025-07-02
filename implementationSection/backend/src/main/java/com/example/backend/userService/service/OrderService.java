package com.example.backend.userService.service;

import com.example.backend.core.dto.OrderUpdationDTO;
import com.example.backend.core.mapper.ManagerOrderResMapper;
import com.example.backend.core.request.OrderItemRequest;
import com.example.backend.core.request.OrderRequest;
import com.example.backend.core.response.ManagerOrderRes;
import com.example.backend.core.response.OrderDetailRes;
import com.example.backend.core.response.OrderItemRes;
import com.example.backend.core.utils.ProductUtil;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Order;
import com.example.backend.userService.model.OrderItem;
import com.example.backend.userService.model.Product;
import com.example.backend.userService.repository.AccountRepository;
import com.example.backend.userService.repository.OrderRepository;
import com.example.backend.userService.repository.ProductRepository;
import com.example.backend.userService.repository.SizeQuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SizeQuantityRepository sizeQuantityRepository;

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
        System.out.println("tong gia order: " + orderRequest.getTotalPrice());
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setOrderDate(LocalDate.now());
        order.setDeliveryDate(LocalDate.now().plusDays(3));
        // Chưa giao là 0, đang giao là 1, đã giao là 2, đã hủy là 3
        order.setShippingStatus(0);
        order.setPaymentStatus(0);
        order.setPayMethod(orderRequest.getPayMethod());
        order.setAccount(account); // gán người dùng vào đơn hàng

        List<OrderItem> orderItems = new ArrayList<>();
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

    @Transactional
    public void cancelOrder(String orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            return;
        }

        Order orderDetail = order.get();
        orderDetail.setShippingStatus(3);

        List<OrderItem> orderItems = orderDetail.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            Optional<Product> p = sizeQuantityRepository.findProductByNameColorSize(
                    orderItem.getProductName(),
                    orderItem.getColorHex(),
                    orderItem.getSize());
            if (p.isPresent()) {
                Product product = p.get();
                int stock = ProductUtil.getQuantityByColorHexAndSize(product, orderItem.getColorHex(), orderItem.getSize());
                ProductUtil.setQuantityByColorHexAndSize(product, orderItem.getColorHex(), orderItem.getSize(), stock + orderItem.getPurchaseQuantity());
                productRepository.save(product);
            }
        }

        orderRepository.save(orderDetail);
    }

    private Map<String, Object> toPagedResponse(Page<Order> ordersPage, Function<Page<Order>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(ordersPage));
        response.put("totalElements", ordersPage.getTotalElements());
        response.put("totalPages", ordersPage.getTotalPages());
        response.put("number", ordersPage.getNumber());
        response.put("size", ordersPage.getSize());
        response.put("hasNext", ordersPage.hasNext());
        response.put("hasPrevious", ordersPage.hasPrevious());
        return response;
    }

    public Map<String, Object> getManagerOrders(Pageable pageable) {
        Page<Order> ordersPage = orderRepository.findAllByOrderByOrderDateDesc(pageable);
        return toPagedResponse(ordersPage, ManagerOrderResMapper:: toManagerOrderResList);
    }

    public Map<String, Object> searchManagerOrders(String keyword, Pageable pageable) {
        Page<Order> ordersPage = orderRepository.findByIdPrefixOrderByOrderDateDesc(keyword, pageable);
        return toPagedResponse(ordersPage, ManagerOrderResMapper:: toManagerOrderResList);
    }

    public OrderDetailRes getOrderDetail(String orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            return null;
        }
        Order orderDetail = order.get();
        OrderDetailRes res = new OrderDetailRes();
        res.setId(orderDetail.getId());
        res.setFullName(orderDetail.getFullName());
        res.setPhoneNumber(orderDetail.getPhoneNumber());
        res.setShippingAddress(orderDetail.getShippingAddress());
        res.setTotalPrice(orderDetail.getTotalPrice());
        res.setOrderDate(orderDetail.getOrderDate());
        res.setDeliveryDate(orderDetail.getDeliveryDate());
        res.setShippingStatus(orderDetail.getShippingStatus());
        res.setPaymentStatus(orderDetail.getPaymentStatus());
        res.setPayMethod(orderDetail.getPayMethod());
        res.setEmail(orderDetail.getAccount().getEmail());
        res.setEmailUpdated(orderDetail.getEmail());

        List<OrderItemRes> orderItemResList = new ArrayList<>();

        List<OrderItem> orderItems = orderDetail.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            OrderItemRes orderItemRes = new OrderItemRes();
            orderItemRes.setProductName(orderItem.getProductName());
            orderItemRes.setColorHex(orderItem.getColorHex());
            orderItemRes.setSize(orderItem.getSize());
            orderItemRes.setPurchaseQuantity(orderItem.getPurchaseQuantity());
            orderItemRes.setPrice(orderItem.getPrice());
            orderItemRes.setPath(orderItem.getPath());
            orderItemResList.add(orderItemRes);
        }
        res.setOrderItems(orderItemResList);
        return res;
    }

    public OrderUpdationDTO getOrderUpdation(String orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            return null;
        }
        Order orderDetail = order.get();
        OrderUpdationDTO res = new OrderUpdationDTO(orderDetail.getId(),
                orderDetail.getDeliveryDate(),
                orderDetail.getShippingStatus(),
                orderDetail.getPaymentStatus(),
                orderDetail.getEmail());
        return res;
    }

    public void updateOrder(OrderUpdationDTO orderUpdationDTO) {
        Optional<Order> order = orderRepository.findById(orderUpdationDTO.getId());
        if (!order.isPresent()) {
            return;
        }
        Order orderDetail = order.get();
        orderDetail.setDeliveryDate(orderUpdationDTO.getDeliveryDate());
        orderDetail.setShippingStatus(orderUpdationDTO.getShippingStatus());
        orderDetail.setPaymentStatus(orderUpdationDTO.getPaymentStatus());
        orderDetail.setEmail(orderUpdationDTO.getEmail());
        orderRepository.save(orderDetail);
    }

}
