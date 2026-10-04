package com.college.eventmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ClubDTO {
    private String id;
    
    @NotBlank(message = "Club name is required")
    private String name;
    
    private String code;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private String category;
    private String logoUrl;
    private String bannerUrl;
    private String facultyCoordinator;
    private List<String> studentCoordinators;
    private Map<String, String> socialLinks;
}
