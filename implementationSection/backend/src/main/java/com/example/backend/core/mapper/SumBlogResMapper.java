package com.example.backend.core.mapper;

import com.example.backend.core.response.blogRes.ManagerBlogRes;
import com.example.backend.core.response.blogRes.SumBlogRes;
import com.example.backend.userService.model.Blog;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class SumBlogResMapper {
    public static List<SumBlogRes> toSumBlogResList(Page<Blog> blogsPage) {
        return blogsPage.getContent().stream().map(blog -> {
            SumBlogRes res = new SumBlogRes();
            res.setId(blog.getId());
            res.setTitle(blog.getTitle());
            res.setThumbnailName(blog.getThumbnailName());
            return res;
        }).collect(Collectors.toList());
    }
}
