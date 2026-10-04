package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.dto.AuthRequest;
import com.college.eventmanagement.dto.JwtResponse;
import com.college.eventmanagement.dto.RegisterRequest;
import com.college.eventmanagement.exception.BadRequestException;
import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.UserRepository;
import com.college.eventmanagement.security.JwtTokenProvider;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    public JwtResponse authenticateUser(AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        return JwtResponse.builder()
                .token(jwt)
                .type("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .collegeId(user.getCollegeId())
                .role(user.getRole())
                .points(user.getPoints())
                .badges(user.getBadges())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public User registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email is already in use!");
        }

        if (signUpRequest.getCollegeId() != null && !signUpRequest.getCollegeId().isEmpty() &&
                userRepository.existsByCollegeId(signUpRequest.getCollegeId())) {
            throw new BadRequestException("College ID is already registered!");
        }

        Set<String> initialBadges = new HashSet<>();
        initialBadges.add("🏆 Event Explorer");

        User user = User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .collegeId(signUpRequest.getCollegeId())
                .department(signUpRequest.getDepartment())
                .year(signUpRequest.getYear())
                .phone(signUpRequest.getPhone())
                .role(signUpRequest.getRole() != null ? signUpRequest.getRole() : "ROLE_STUDENT")
                .points(50) // welcome bonus points
                .badges(initialBadges)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User getCurrentUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
}
