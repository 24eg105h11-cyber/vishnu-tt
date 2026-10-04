package com.college.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "clubs")
public class Club {

    @Id
    private String id;
    
    private String name;
    private String code;
    private String description;
    private String category;
    private String logoUrl;
    private String bannerUrl;
    private String facultyCoordinator;
    
    @Builder.Default
    private List<String> studentCoordinators = new ArrayList<>();
    
    @Builder.Default
    private int followersCount = 0;
    
    // APPROVED, PENDING, REJECTED
    @Builder.Default
    private String status = "APPROVED";
    
    private String organizerUserId;
    
    private Map<String, String> socialLinks;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
