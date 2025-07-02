package com.example.backend.core.mapper;

import com.example.backend.core.response.HomeProductRes;
import com.example.backend.core.response.ManagerAccountRes;
import com.example.backend.core.response.blogRes.ManagerBlogRes;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ManagerAccountResMapper {
    public static List<ManagerAccountRes> toManagerAccountResList(Page<Account> accountsPage) {
        return accountsPage.stream().map(account -> {
            ManagerAccountRes res = new ManagerAccountRes();
            res.setId(account.getId());
            res.setEmail(account.getEmail());
            res.setFullName(account.getFullName());
            res.setRole(account.getRole());
            res.setStatus(account.getStatus());
            res.setCreatedAt(account.getCreatedAt());
            return res;
        }).collect(Collectors.toList());
    }
}
