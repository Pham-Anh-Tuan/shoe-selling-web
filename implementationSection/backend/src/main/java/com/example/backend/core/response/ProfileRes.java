package com.example.backend.core.response;

import lombok.Getter;

@Getter
public class ProfileRes {
    private String email;
    private String fullName;
    private String phoneNumber;
    private String shippingAddress;
    private int gender;
    private String imageName = "";

    public ProfileRes(String email, String fullName, String phoneNumber, String shippingAddress, int gender, String imageName) {
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
        this.gender = gender;
        this.imageName = imageName;
    }
}
