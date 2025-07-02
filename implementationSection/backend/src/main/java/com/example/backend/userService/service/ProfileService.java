package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.request.ProfileRequest;
import com.example.backend.core.response.ProfileRes;
import com.example.backend.core.response.ProfileSumRes;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {
    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<?> getProfileByEmail(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);

        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("This account not found");
        }
        Account acc = account.get();
        ProfileRes profileRes = new ProfileRes(
                acc.getEmail(),
                acc.getFullName(),
                acc.getPhoneNumber(),
                acc.getShippingAddress(),
                acc.getGender(),
                acc.getImageName());
        return ResponseEntity.ok(profileRes);
    }


    public void updateProfile(ProfileRequest profileRequest) {
        Account account = accountRepository.findByEmail(profileRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setFullName(profileRequest.getFullName());
        account.setPhoneNumber(profileRequest.getPhoneNumber());
        account.setShippingAddress(profileRequest.getShippingAddress());
        account.setGender(profileRequest.getGender());

        String projectDir = System.getProperty("user.dir");
        String imageName = account.getImageName();
        String newImageName = profileRequest.getImageName();

        if (!imageName.equals(newImageName)) {
            if (!imageName.equals("userLogo192192adeal.png") && !imageName.startsWith("https:")) {
                Path imagePath = Paths.get(projectDir, ImageConfig.avatarPath, imageName);
                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    System.err.println("Failed to delete image file: " + imageName);
                }
            }

            MultipartFile file = profileRequest.getImageFile();
            if (file != null) {
                String fileName = UUID.randomUUID().toString() + ".png";
                Path uploadPath = Paths.get(projectDir, ImageConfig.avatarPath, fileName);
                account.setImageName(fileName);
                try {
                    Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                    Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image: " + fileName, e);
                }
            }
        }
        accountRepository.save(account);
    }

    public ResponseEntity<?> getProfileSumByEmail(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);

        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("This account not found");
        }
        Account acc = account.get();
        ProfileSumRes profileRes = new ProfileSumRes(
                acc.getFullName(),
                acc.getPhoneNumber(),
                acc.getShippingAddress());
        return ResponseEntity.ok(profileRes);
    }
}
