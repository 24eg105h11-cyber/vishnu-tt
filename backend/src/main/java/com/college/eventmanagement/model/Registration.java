package com.college.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "registrations")
public class Registration {

    @Id
    private String id;
    
    private String registrationId; // Unique formatted ticket code, e.g. REG-2026-88291
    private String eventId;
    private String eventTitle;
    private String studentId;
    private String studentName;
    private String studentEmail;
    private String collegeId;
    private String department;
    private String year;
    private String phone;
    
    private String qrCodeData;
    
    // REGISTERED, ATTENDED, CANCELLED
    @Builder.Default
    private String status = "REGISTERED";
    
    private Instant checkInTime;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
