package com.example.backend.userService.controller;

import com.example.backend.core.dto.OrderUpdationDTO;
import com.example.backend.core.request.OrderRequest;
import com.example.backend.core.request.ProductUpdateRequest;
import com.example.backend.core.response.ManagerOrderRes;
import com.example.backend.core.response.OrderDetailRes;
import com.example.backend.userService.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping(value = "/user/createOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping(path = "/admin/managerOrders")
    public ResponseEntity<List<ManagerOrderRes>> getManagerOrders() {
        return ResponseEntity.ok(orderService.getManagerOrders());
    }

    @GetMapping(path = "/admin/orderDetail/{id}")
    public ResponseEntity<OrderDetailRes> getOrderDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrderDetail(id));
    }

    @GetMapping(path = "/admin/orderUpdation/{id}")
    public ResponseEntity<OrderUpdationDTO> getOrderUpdation(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrderUpdation(id));
    }

    @DeleteMapping("/admin/cancelOrder/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") String id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok("orderService.getOrderUpdation(id)");
    }

    @PostMapping(value ="/admin/updateOrder")
    public ResponseEntity<?> updateOrder(@RequestBody OrderUpdationDTO orderUpdationDTO) {
        orderService.updateOrder(orderUpdationDTO);
        return ResponseEntity.ok("Order updated successfully");
    }
}
