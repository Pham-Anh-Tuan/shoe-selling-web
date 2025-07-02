package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.ManagerAccountResMapper;
import com.example.backend.core.dto.AccountDTO;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.function.Function;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Map<String, Object> toPagedResponse(Page<Account> accountsPage, Function<Page<Account>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(accountsPage));
        response.put("totalElements", accountsPage.getTotalElements());
        response.put("totalPages", accountsPage.getTotalPages());
        response.put("number", accountsPage.getNumber());
        response.put("size", accountsPage.getSize());
        response.put("hasNext", accountsPage.hasNext());
        response.put("hasPrevious", accountsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> getManagerAccounts(Pageable pageable) {
        Page<Account> accountsPage = accountRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(accountsPage, ManagerAccountResMapper::toManagerAccountResList);
    }

    public Map<String, Object> searchManagerAccounts(String email, Pageable pageable) {
        Page<Account> accountsPage = accountRepository.findAllByEmailContainingIgnoreCaseOrderByCreatedAtDesc(email, pageable);
        return toPagedResponse(accountsPage, ManagerAccountResMapper::toManagerAccountResList);
    }

    public ResponseEntity<?> addAccount(AccountDTO accountDTO) {
        String accountEmail = accountDTO.getEmail();
        if (accountRepository.existsByEmail(accountEmail)) {
            return ResponseEntity
                    .badRequest()
                    .body("Email này đã tồn tại.");
        }
        Account account = new Account();
        account.setId(UUID.randomUUID().toString());
        account.setEmail(accountEmail);
        account.setFullName(accountDTO.getFullName());
        account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        account.setPhoneNumber(accountDTO.getPhoneNumber());
        account.setShippingAddress(accountDTO.getShippingAddress());
        account.setGender(accountDTO.getGender());
        account.setStatus(accountDTO.getStatus());
        account.setEmailUpdate(accountDTO.getEmailUpdate());

        String projectDir = System.getProperty("user.dir");
        String newImageName = accountDTO.getImageName();

        if (newImageName.equals("")) {
            account.setImageName("userLogo192192adeal.png");
        }

        MultipartFile file = accountDTO.getImageFile();
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

        accountRepository.save(account);
        return ResponseEntity.ok("ok");
    }

    public ResponseEntity<?> getAccountDetail(String accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("Tài khoản này không tồn tại.");
        }
        Account acc = account.get();
        AccountDTO accountDTO = new AccountDTO(
                acc.getEmail(),
                acc.getFullName(),
                acc.getPassword(),
                acc.getPhoneNumber(),
                acc.getShippingAddress(),
                acc.getGender(),
                acc.getRole(),
                acc.getStatus(),
                acc.getEmailUpdate(),
                acc.getImageName()
        );
        return ResponseEntity.ok(accountDTO);
    }

    public ResponseEntity<?> updateAccount(AccountDTO accountDTO) {
        Optional<Account> account = accountRepository.findByEmail(accountDTO.getEmail());
        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("Tài khoản này không tồn tại.");
        }

        Account acc = account.get();
        acc.setFullName(accountDTO.getFullName());

        String password = accountDTO.getPassword();
        if (!password.equals("")) {
            acc.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        }

        acc.setPhoneNumber(accountDTO.getPhoneNumber());
        acc.setShippingAddress(accountDTO.getShippingAddress());
        acc.setGender(accountDTO.getGender());
        acc.setRole(accountDTO.getRole());
        acc.setStatus(accountDTO.getStatus());
        acc.setEmailUpdate(accountDTO.getEmailUpdate());

        String projectDir = System.getProperty("user.dir");
        String imageName = acc.getImageName();
        String newImageName = accountDTO.getImageName();

        System.out.println("tên ảnh từ database: " + imageName);
        System.out.println("tên ảnh gửi về: " + newImageName);

        if (!imageName.equals(newImageName)) {
            if (!imageName.equals("userLogo192192adeal.png") && !imageName.startsWith("https:")) {
                Path imagePath = Paths.get(projectDir, ImageConfig.avatarPath, imageName);
                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    System.err.println("Failed to delete image file: " + imageName);
                }
            }

            MultipartFile file = accountDTO.getImageFile();
            if (file != null) {
                String fileName = UUID.randomUUID().toString() + ".png";
                Path uploadPath = Paths.get(projectDir, ImageConfig.avatarPath, fileName);
                acc.setImageName(fileName);
                try {
                    Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                    Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image: " + fileName, e);
                }
            }
        }
        accountRepository.save(acc);
        return ResponseEntity.ok("Account updated successfully.");
    }
}
