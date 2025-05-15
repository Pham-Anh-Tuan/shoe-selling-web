package com.example.backend.core.security;

import com.example.backend.core.utils.JwtUtil;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AccountRepository accountRepository;

//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//
//            if (jwtUtil.validateToken(token)) {
//                String email = jwtUtil.extractEmail(token);
//                Optional<Account> optionalAccount = accountRepository.findByEmail(email);
//
//                if (optionalAccount.isPresent()) {
//                    Account account = optionalAccount.get();
//
//                    String roleName;
//                    switch (account.getRole()) {
//                        case 1:
//                            roleName = "ADMIN";
//                            break;
//                        case 3:
//                            roleName = "STAFF";
//                            break;
//                        default:
//                            roleName = "USER";
//                    }
//
//                    UsernamePasswordAuthenticationToken authentication =
//                            new UsernamePasswordAuthenticationToken(
//                                    account.getEmail(),
//                                    null,
//                                    List.of(new SimpleGrantedAuthority("ROLE_" + roleName))
//                            );
//
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }

    //        String path = request.getRequestURI();
//        if (path.startsWith("/api/public/")) {
//            System.out.println("Trong /api/public/");
//            filterChain.doFilter(request, response);
//            return;
//        }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

            // Kiểm tra token có hợp lệ không
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                // Xác thực token
                if (jwtUtil.validateToken(token)) {
                    System.out.println("Trong validate");
                    String email = jwtUtil.extractEmail(token);
                    Optional<Account> optionalAccount = accountRepository.findByEmail(email);

                    // Kiểm tra người dùng có tồn tại không
                    if (optionalAccount.isPresent()) {
                        Account account = optionalAccount.get();
                        String roleName = getRoleName(account.getRole());

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        account.getEmail(),
                                        null,
                                        List.of(new SimpleGrantedAuthority("ROLE_" + roleName))
                                );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        sendErrorResponse(response, HttpStatus.UNAUTHORIZED.value(), "Account not found");
                        return;
                    }
                } else {
                    sendErrorResponse(response, HttpStatus.UNAUTHORIZED.value(), "Invalid token");
                    return;
                }
            }

            // Tiếp tục filter
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException ex) {
            sendErrorResponse(response, HttpStatus.UNAUTHORIZED.value(), "Token expired");
        } catch (JwtException ex) {
            sendErrorResponse(response, HttpStatus.UNAUTHORIZED.value(), "Invalid token");
        }
    }

    // Hàm gửi lỗi dưới dạng JSON
    private void sendErrorResponse(HttpServletResponse response, int statusCode, String message) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String jsonResponse = String.format("{\"message\": \"%s\"}", message);
        response.getWriter().write(jsonResponse);
    }

    private String getRoleName(int role) {
        switch (role) {
            case 1:
                return "ADMIN";
            case 3:
                return "STAFF";
            default:
                return "USER";
        }
    }

}
