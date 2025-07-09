package com.example.backend.userService.repository;

import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Favorite;
import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, String> {
    Optional<Favorite> findByAccountAndProduct(Account account, Product product);

    List<Favorite> findByAccount(Account account);

    //    void deleteByAccountAndProduct(Account account, Product product);
    Page<Favorite> findByAccount(Account account, Pageable pageable);
}
