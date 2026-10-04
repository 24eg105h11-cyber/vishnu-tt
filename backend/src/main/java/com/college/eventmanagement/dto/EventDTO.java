package com.college.eventmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class EventDTO {
    private String id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String clubId;
    private String clubName;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private String posterUrl;
    
    @NotBlank(message = "Date is required")
    private String date;
    
    @NotBlank(message = "Start time is required")
    private String startTime;
    
    private String endTime;
    
    @NotBlank(message = "Venue is required")
    private String venue;
    
    @Min(value = 1, message = "Maximum capacity must be at least 1")
    private int maxCapacity;
    
    private List<String> rules;
    private String eligibility;
    private String contactEmail;
    private String contactPhone;
}
