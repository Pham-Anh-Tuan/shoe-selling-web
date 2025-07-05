package com.example.backend.core.mapper;

import com.example.backend.core.response.HomeBannerRes;
import com.example.backend.core.response.ManagerBannerRes;
import com.example.backend.userService.model.Banner;

import java.util.List;
import java.util.stream.Collectors;

public class HomeBannerResMapper {
    public static List<HomeBannerRes> toHomeBannerResList(List<Banner> bannerList) {
        return bannerList.stream().map(banner -> {
            HomeBannerRes res = new HomeBannerRes();
            res.setId(banner.getId());
            res.setTitle(banner.getTitle());
            res.setContent(banner.getContent());
            res.setImageName(banner.getImageName());
            return res;
        }).collect(Collectors.toList());
    }
}
