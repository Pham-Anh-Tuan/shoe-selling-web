package com.example.backend.userService.repository;

import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    Page<Account> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Account> findAllByEmailContainingIgnoreCaseOrderByCreatedAtDesc(String email, Pageable pageable);

    boolean existsByEmail(String email);
}
