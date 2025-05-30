package com.example.backend.core.response;

import lombok.Getter;

@Getter
public class ProfileSumRes {
    private String fullName;
    private String phoneNumber;
    private String shippingAddress;

    public ProfileSumRes(String fullName, String phoneNumber, String shippingAddress) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
    }
}
