package com.example.backend.userService.service;

import com.example.backend.core.config.BlogImgApi;
import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.ManagerBlogResMapper;
import com.example.backend.core.mapper.SumBlogResMapper;
import com.example.backend.core.request.BlogRequest;
import com.example.backend.core.response.*;
import com.example.backend.core.response.blogRes.ManagerBlogRes;
import com.example.backend.core.response.blogRes.SumBlogRes;
import com.example.backend.core.utils.ImageProcessor;
import com.example.backend.userService.model.Blog;
import com.example.backend.userService.model.Order;
import com.example.backend.userService.repository.BlogRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Transactional
    public void createBlog(BlogRequest blogRequest) {
        Blog blog = new Blog();
        blog.setId(UUID.randomUUID().toString());
        blog.setTitle(blogRequest.getTitle());

        String projectDir = System.getProperty("user.dir");

        MultipartFile thumbnailFile = blogRequest.getThumbnailFile();
        if (thumbnailFile != null) {
            String fileName = UUID.randomUUID().toString() + ".png";
            Path uploadPath = Paths.get(projectDir, ImageConfig.thumbnailPath, fileName);
            blog.setThumbnailName(fileName);

            try {
                Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                Files.copy(thumbnailFile.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image: " + fileName, e);
            }
        }
        blog.setStatus(blogRequest.getStatus());
        try {
            blog.setContent(ImageProcessor.processBase64Images(blogRequest.getContent(), ImageConfig.blogPath, BlogImgApi.blogImgApi));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        blog.setEmail(blogRequest.getEmail());
        blogRepository.save(blog);
    }

    private Map<String, Object> toPagedResponse(Page<Blog> blogsPage, Function<Page<Blog>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(blogsPage));
        response.put("totalElements", blogsPage.getTotalElements());
        response.put("totalPages", blogsPage.getTotalPages());
        response.put("number", blogsPage.getNumber());
        response.put("size", blogsPage.getSize());
        response.put("hasNext", blogsPage.hasNext());
        response.put("hasPrevious", blogsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> getSumBlogs(Pageable pageable) {
        Page<Blog> blogsPage = blogRepository.findAllByStatusOrderByCreatedAtDesc(1, pageable);
        return toPagedResponse(blogsPage, SumBlogResMapper::toSumBlogResList);
    }

    public Map<String, Object> getManagerBlogs(Pageable pageable) {
        Page<Blog> blogsPage = blogRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(blogsPage, ManagerBlogResMapper::toManagerBlogResList);
    }

    public Map<String, Object> searchManagerBlogs(String keyword, Pageable pageable) {
        Page<Blog> blogsPage = blogRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        return toPagedResponse(blogsPage, ManagerBlogResMapper::toManagerBlogResList);
    }

    public BlogPageRes getBlogPage(String blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        if (!blog.isPresent()) {
            return null;
        }
        Blog blogDetail = blog.get();
        BlogPageRes res = new BlogPageRes();
        res.setTitle(blogDetail.getTitle());
        res.setContent(blogDetail.getContent());
        res.setCreatedAt(blogDetail.getCreatedAt());
        return res;
    }

    public BlogRequest getBlogDetail(String blogId) {
        Optional<Blog> optionalBlog = blogRepository.findById(blogId);
        if (!optionalBlog.isPresent()) {
            return null;
        }
        Blog blog = optionalBlog.get();
        BlogRequest res = new BlogRequest();
        res.setTitle(blog.getTitle());
        res.setThumbnailName(blog.getThumbnailName());
        res.setThumbnailFile(null);
        res.setStatus(blog.getStatus());
        res.setContent(blog.getContent());
        res.setEmail(blog.getEmail());
        return res;
    }

    @Transactional
    public ResponseEntity<String> deleteBlogById(String blogId) {
        Optional<Blog> optionalBlog = blogRepository.findById(blogId);
        if (optionalBlog.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy blog với ID: " + blogId);
        }

        Blog blog = optionalBlog.get();

        String projectDir = System.getProperty("user.dir");

        // 1. XÓA ẢNH THUMBNAIL
        String thumbnailName = blog.getThumbnailName();
        if (thumbnailName != null && !thumbnailName.isEmpty()) {
            Path thumbnailPath = Paths.get(projectDir, ImageConfig.thumbnailPath, thumbnailName);
            try {
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể xóa ảnh thumbnail.");
            }
        }

        // 2. XÓA ẢNH TRONG NỘI DUNG HTML
        String htmlContent = blog.getContent();
        if (htmlContent != null && !htmlContent.isEmpty()) {
            Document doc = Jsoup.parse(htmlContent);
            Elements imgs = doc.select("img");

            for (Element img : imgs) {
                String src = img.attr("src");
                String fileName = src.substring(src.lastIndexOf("/") + 1); // Lấy tên ảnh từ URL
                Path imagePath = Paths.get(projectDir, ImageConfig.blogPath, fileName);

                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa ảnh trong content.");
                }
            }
        }

        // 3. XÓA BLOG
        blogRepository.deleteById(blogId);

        return ResponseEntity.ok("Đã xóa blog thành công và các ảnh liên quan.");
    }

    @Transactional
    public ResponseEntity<String> updateBlog(BlogRequest blogRequest) {
        String blogId = blogRequest.getId();
        Optional<Blog> optionalBlog = blogRepository.findById(blogId);
        if (optionalBlog.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy blog với ID: " + blogId);
        }

        Blog blog = optionalBlog.get();
        String projectDir = System.getProperty("user.dir");

        // 1. Cập nhật các trường cơ bản
        blog.setTitle(blogRequest.getTitle());
        blog.setStatus(blogRequest.getStatus());
        blog.setEmail(blogRequest.getEmail());

        // 2. Xử lý thumbnail mới (nếu có)
        MultipartFile newThumbnailFile = blogRequest.getThumbnailFile();
        if (newThumbnailFile != null && !newThumbnailFile.isEmpty()) {
            // Xóa thumbnail cũ nếu có
            if (blog.getThumbnailName() != null) {
                Path oldThumbnailPath = Paths.get(projectDir, ImageConfig.thumbnailPath, blog.getThumbnailName());
                try {
                    Files.deleteIfExists(oldThumbnailPath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa thumbnail cũ.");
                }
            }

            // Lưu thumbnail mới
            String newThumbnailName = UUID.randomUUID().toString() + ".png";
            Path newThumbnailPath = Paths.get(projectDir, ImageConfig.thumbnailPath, newThumbnailName);
            try {
                Files.createDirectories(newThumbnailPath.getParent());
                Files.copy(newThumbnailFile.getInputStream(), newThumbnailPath, StandardCopyOption.REPLACE_EXISTING);
                blog.setThumbnailName(newThumbnailName);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể lưu thumbnail mới.");
            }
        }

        // 3. Xử lý content
        String oldContent = blog.getContent(); // nội dung cũ để so sánh ảnh
        Set<String> oldImages = extractImageFileNames(oldContent);

        String newContent;
        try {
            newContent = ImageProcessor.processBase64Images(blogRequest.getContent(), ImageConfig.blogPath, BlogImgApi.blogImgApi);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể xử lý nội dung mới.");
        }

        Set<String> newImages = extractImageFileNames(newContent);

        // 4. Xóa ảnh không còn được sử dụng
        Set<String> removedImages = new HashSet<>(oldImages);
        removedImages.removeAll(newImages);
        for (String imageFileName : removedImages) {
            Path imagePath = Paths.get(projectDir, ImageConfig.blogPath, imageFileName);
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể xóa ảnh không còn dùng: " + imageFileName);
            }
        }

        // 5. Cập nhật content mới
        blog.setContent(newContent);

        // 6. Lưu vào DB
        blogRepository.save(blog);
        return ResponseEntity.ok("Cập nhật blog thành công với ID: " + blogId);
    }

    private Set<String> extractImageFileNames(String htmlContent) {
        Set<String> fileNames = new HashSet<>();
        if (htmlContent == null || htmlContent.isEmpty()) return fileNames;

        Document doc = Jsoup.parse(htmlContent);
        Elements imgs = doc.select("img");

        for (Element img : imgs) {
            String src = img.attr("src");
            if (src != null && !src.startsWith("data:image")) {
                try {
                    String fileName = Paths.get(new URI(src).getPath()).getFileName().toString();
                    fileNames.add(fileName);
                } catch (Exception e) {
                    System.err.println("Lỗi khi phân tích src: " + src);
                }
            }
        }

        return fileNames;
    }

}
