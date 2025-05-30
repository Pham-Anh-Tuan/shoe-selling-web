package com.example.backend.userService.controller;

import com.example.backend.core.request.ProductUpdateRequest;
import com.example.backend.core.request.ProfileRequest;
import com.example.backend.core.response.ProfileRes;
import com.example.backend.userService.service.ProductService;
import com.example.backend.userService.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PutMapping(value ="/user/updateProfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfile(@ModelAttribute ProfileRequest profileRequest) {
        profileService.updateProfile(profileRequest);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @GetMapping(path = "/user/getProfileByEmail/{email}")
    public ResponseEntity<?> getProfileByEmail(@PathVariable("email") String email) {
        return profileService.getProfileByEmail(email);
    }

    @GetMapping(path = "/user/getProfileSumByEmail/{email}")
    public ResponseEntity<?> getProfileSum(@PathVariable("email") String email) {
        return profileService.getProfileSumByEmail(email);
    }
}
