package com.example.backend.core.mapper;

import com.example.backend.core.response.blogRes.ManagerBlogRes;
import com.example.backend.userService.model.Blog;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ManagerBlogResMapper {
    public static List<ManagerBlogRes> toManagerBlogResList(Page<Blog> blogsPage) {
        return blogsPage.stream().map(blog -> {
            ManagerBlogRes res = new ManagerBlogRes();
            res.setId(blog.getId());
            res.setTitle(blog.getTitle());
            res.setThumbnailName(blog.getThumbnailName());
            res.setStatus(blog.getStatus());
            res.setCreatedAt(blog.getCreatedAt());
            return res;
        }).collect(Collectors.toList());
    }
}
