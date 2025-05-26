package com.example.backend.userService.service;

import com.example.backend.core.request.RegisterRequest;
import com.example.backend.core.response.LoginRes;
import com.example.backend.core.utils.JwtUtil;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> register(RegisterRequest registerRequest) {
        if (accountRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Account account = new Account();
        account.setId(UUID.randomUUID().toString());
        account.setEmail(registerRequest.getEmail());
        account.setFullName(registerRequest.getFullName());
        account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        account.setImageName("userLogo192192adeal.png");
        accountRepository.save(account);

        return ResponseEntity.ok("Register successful");
    }

    public ResponseEntity<?> login(Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Optional<Account> account = accountRepository.findByEmail(email);

        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("Email not found");
        }

        if (!passwordEncoder.matches(password, account.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        String token = jwtUtil.generateToken(account.get());
        Account acc = account.get();

        // Trả về đối tượng LoginResponse chứa token và thông tin
        LoginRes response = new LoginRes(
                token,
                acc.getEmail(),
                acc.getFullName(),
                acc.getImageName(),
                acc.getPhoneNumber(),
                acc.getShippingAddress(),
                acc.getGender(),
                acc.getRole()
        );

        return ResponseEntity.ok(response);
    }
}
