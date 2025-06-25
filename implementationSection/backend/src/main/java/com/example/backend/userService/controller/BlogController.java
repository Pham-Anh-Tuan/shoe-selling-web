package com.example.backend.userService.controller;

import com.example.backend.core.request.BlogRequest;
import com.example.backend.core.request.ProfileRequest;
import com.example.backend.core.response.BlogPageRes;
import com.example.backend.core.response.blogRes.ManagerBlogRes;
import com.example.backend.core.response.blogRes.SumBlogRes;
import com.example.backend.userService.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping(value = "/admin/createBlog", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createBlog(@ModelAttribute BlogRequest blogRequest) {
        blogService.createBlog(blogRequest);
        return ResponseEntity.ok("Blog added successfully.");
    }

    @PutMapping(value ="/admin/updateBlog", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateBlog(@ModelAttribute BlogRequest blogRequest) {
        return blogService.updateBlog(blogRequest);
    }

    @GetMapping(path = "/public/sumBlogs")
    public Page<SumBlogRes> getSumBlogs(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "9") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return blogService.getSumBlogs(pageable);
    }

    @GetMapping(path = "/public/blogPage/{id}")
    public ResponseEntity<BlogPageRes> getBlogPage(@PathVariable("id") String id) {
        return ResponseEntity.ok(blogService.getBlogPage(id));
    }

    @GetMapping(path = "/admin/blogDetail/{id}")
    public ResponseEntity<BlogRequest> getBlogDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(blogService.getBlogDetail(id));
    }

    @GetMapping(path = "/admin/managerBlogs")
    public ResponseEntity<List<ManagerBlogRes>> getManagerBlogs() {
        return ResponseEntity.ok(blogService.getManagerBlogs());
    }

    @DeleteMapping("/admin/deleteBlogById/{id}")
    public ResponseEntity<?> deleteBlogById(@PathVariable("id") String id) {
        return blogService.deleteBlogById(id);
    }

}
