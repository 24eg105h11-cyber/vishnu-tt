package com.college.eventmanagement.service;

import com.college.eventmanagement.dto.AuthRequest;
import com.college.eventmanagement.dto.JwtResponse;
import com.college.eventmanagement.dto.RegisterRequest;
import com.college.eventmanagement.model.User;

public interface AuthService {
    JwtResponse authenticateUser(AuthRequest loginRequest);
    User registerUser(RegisterRequest signUpRequest);
    User getCurrentUser(String userId);
}
