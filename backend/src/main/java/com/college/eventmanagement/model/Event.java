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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "events")
public class Event {

    @Id
    private String id;
    
    private String title;
    private String clubId;
    private String clubName;
    private String clubLogoUrl;
    private String category;
    private String description;
    private String posterUrl;
    
    private String date; // YYYY-MM-DD
    private String startTime; // HH:mm
    private String endTime; // HH:mm
    private String venue;
    
    private int maxCapacity;
    @Builder.Default
    private int registeredCount = 0;
    
    // PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED
    @Builder.Default
    private String status = "PENDING";
    
    @Builder.Default
    private List<String> rules = new ArrayList<>();
    private String eligibility;
    
    private String organizerUserId;
    private String contactEmail;
    private String contactPhone;
    
    @Builder.Default
    private Instant registrationDeadline = Instant.now().plusSeconds(86400 * 7);
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
