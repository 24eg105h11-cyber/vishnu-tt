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
@Document(collection = "announcements")
public class Announcement {

    @Id
    private String id;
    
    private String clubId;
    private String clubName;
    private String title;
    private String content;
    private String priority; // NORMAL, HIGH, URGENT
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
