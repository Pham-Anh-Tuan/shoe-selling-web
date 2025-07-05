package com.example.backend.userService.repository;

import com.example.backend.userService.model.Banner;
import com.example.backend.userService.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, String> {
    Page<Banner> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Banner> findAllByStatusOrderByCreatedAtDesc(int status, Pageable pageable);
    List<Banner> findAllByStatusOrderByCreatedAtDesc(int status);

    Page<Banner> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

}
