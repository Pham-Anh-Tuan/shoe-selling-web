package com.example.backend.userService.controller;

import com.example.backend.userService.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/staff/statics-summary")
    public ResponseEntity<Map<String, Long>> getDashboardSummary() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("totalProductQuantity", dashboardService.getTotalProductQuantity());
        summary.put("deliveredOrderCount", dashboardService.getDeliveredOrderCount());
        summary.put("soldProductCount", dashboardService.getSoldProductCount());
        summary.put("returnedProductCount", dashboardService.getReturnedProductCount());

        return ResponseEntity.ok(summary);
    }
}
