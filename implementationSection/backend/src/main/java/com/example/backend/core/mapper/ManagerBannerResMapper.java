package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerBannerRes;
import com.example.backend.userService.model.Banner;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ManagerBannerResMapper {
    public static List<ManagerBannerRes> toManagerBannerResList(Page<Banner> bannersPage) {
        return bannersPage.stream().map(banner -> {
            ManagerBannerRes res = new ManagerBannerRes();
            res.setId(banner.getId());
            res.setTitle(banner.getTitle());
            res.setImageName(banner.getImageName());
            res.setStatus(banner.getStatus());
            res.setCreatedAt(banner.getCreatedAt());
            return res;
        }).collect(Collectors.toList());
    }
}
