package com.college.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;
    
    private String name;
    private String email;
    private String password;
    private String collegeId;
    private String department;
    private String year;
    private String phone;
    private String avatarUrl;
    
    // ROLE_STUDENT, ROLE_ORGANIZER, ROLE_ADMIN
    private String role;
    
    @Builder.Default
    private int points = 0;
    
    @Builder.Default
    private Set<String> badges = new HashSet<>();
    
    @Builder.Default
    private List<String> savedEventIds = new ArrayList<>();
    
    @Builder.Default
    private List<String> followedClubIds = new ArrayList<>();
    
    @Builder.Default
    private boolean active = true;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
