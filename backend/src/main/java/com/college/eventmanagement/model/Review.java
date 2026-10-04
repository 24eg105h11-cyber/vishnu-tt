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
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    
    private String eventId;
    private String studentId;
    private String studentName;
    private int rating; // 1 to 5
    private String comment;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
