package com.college.eventmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private String id;
    private String name;
    private String email;
    private String collegeId;
    private String role;
    private int points;
    private Set<String> badges;
    private String avatarUrl;
}
