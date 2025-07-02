package com.example.backend.userService.controller;

import com.example.backend.core.dto.AccountDTO;
import com.example.backend.userService.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping(path = "/admin/managerAccounts")
    public Map<String, Object> getManagerAccounts(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return accountService.getManagerAccounts(pageable);
    }

    @GetMapping(path = "/admin/searchManagerAccounts")
    public Map<String, Object> searchManagerAccounts(@RequestParam(defaultValue = "") String keyword,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return accountService.searchManagerAccounts(keyword, pageable);
    }

    @PostMapping(value = "/admin/addAccount", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addAccount(@ModelAttribute AccountDTO accountDTO) {
        return accountService.addAccount(accountDTO);
    }

    @PutMapping(value = "/admin/updateAccount", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateAccount(@ModelAttribute AccountDTO accountDTO) {
        return accountService.updateAccount(accountDTO);
    }

    @GetMapping(path = "/admin/getAccountDetail/{id}")
    public ResponseEntity<?> getAccountDetail(@PathVariable("id") String id) {
        return accountService.getAccountDetail(id);
    }
}
