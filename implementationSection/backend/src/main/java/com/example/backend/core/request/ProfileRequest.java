package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileRequest {
    private String email;
    private String fullName;
    private String phoneNumber;
    private String shippingAddress;
    private int gender;
    private String imageName = "";
    private MultipartFile imageFile;
}
