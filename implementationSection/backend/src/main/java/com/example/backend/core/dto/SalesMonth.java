package com.example.backend.core.dto;

public class SalesMonth {
    private String month;
    private double revenue;

    // 👇 Constructor PHẢI là public và đúng thứ tự: Integer, Double
    public SalesMonth(Integer month, Double revenue) {
        this.month = String.valueOf(month);
        this.revenue = revenue;
    }

    public String getMonth() {
        return month;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }
}
