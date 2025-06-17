package com.example.backend.userService.repository;

import com.example.backend.userService.model.Blog;
import com.example.backend.userService.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, String> {
    List<Blog> findAllByStatus(int status);
    List<Blog> findAllByOrderByCreatedAtDesc();

}

