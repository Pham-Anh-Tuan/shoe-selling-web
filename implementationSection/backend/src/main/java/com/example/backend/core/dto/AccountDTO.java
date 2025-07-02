package com.example.backend.core.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AccountDTO {
    private String email;
    private String fullName;
    private String password;
    private String phoneNumber;
    private String shippingAddress;
    private int gender;
    private int role;
    private int status;
    private String emailUpdate;
    private String imageName = "";
    private MultipartFile imageFile;

    public AccountDTO(String email, String fullName, String password, String phoneNumber, String shippingAddress, int gender, int role, int status, String emailUpdate, String imageName) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
        this.gender = gender;
        this.role = role;
        this.status = status;
        this.emailUpdate = emailUpdate;
        this.imageName = imageName;
    }
}
