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
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    
    private String userId; // Or "ALL", "ROLE_STUDENT", etc.
    private String title;
    private String message;
    private String type; // EVENT_REMINDER, REGISTRATION_SUCCESS, ATTENDANCE_MARKED, CERTIFICATE_AVAILABLE, NEW_EVENT, ANNOUNCEMENT
    private String targetUrl;
    
    @Builder.Default
    private boolean isRead = false;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
