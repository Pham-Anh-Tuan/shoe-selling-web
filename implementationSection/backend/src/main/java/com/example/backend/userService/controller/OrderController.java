package com.example.backend.userService.controller;

import com.example.backend.core.dto.OrderUpdationDTO;
import com.example.backend.core.request.OrderRequest;
import com.example.backend.core.request.ProductUpdateRequest;
import com.example.backend.core.response.ManagerOrderRes;
import com.example.backend.core.response.OrderDetailRes;
import com.example.backend.userService.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping(value = "/user/createOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping(path = "/staff/managerOrders")
    public Map<String, Object> getManagerOrders(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderDate").descending());
        return orderService.getManagerOrders(pageable);
    }

    @GetMapping(path = "/staff/searchManagerOrders")
    public Map<String, Object> searchManagerOrders(@RequestParam(defaultValue = "") String keyword,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderDate").descending());
        return orderService.searchManagerOrders(keyword, pageable);
    }

    @GetMapping(path = "/staff/orderDetail/{id}")
    public ResponseEntity<OrderDetailRes> getOrderDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrderDetail(id));
    }

    @GetMapping(path = "/staff/orderUpdation/{id}")
    public ResponseEntity<OrderUpdationDTO> getOrderUpdation(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrderUpdation(id));
    }

    @DeleteMapping("/staff/cancelOrder/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") String id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok("orderService.getOrderUpdation(id)");
    }

    @PostMapping(value ="/staff/updateOrder")
    public ResponseEntity<?> updateOrder(@RequestBody OrderUpdationDTO orderUpdationDTO) {
        orderService.updateOrder(orderUpdationDTO);
        return ResponseEntity.ok("Order updated successfully");
    }
}
