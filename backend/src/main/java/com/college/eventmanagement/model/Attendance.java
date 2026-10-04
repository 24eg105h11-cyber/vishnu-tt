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
@Document(collection = "attendances")
public class Attendance {

    @Id
    private String id;
    
    private String eventId;
    private String studentId;
    private String registrationId;
    private String studentName;
    private String collegeId;
    private String markedByUserId;
    
    @Builder.Default
    private Instant checkInTime = Instant.now();
}
