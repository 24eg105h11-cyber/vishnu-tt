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
@Document(collection = "certificates")
public class Certificate {

    @Id
    private String id;
    
    private String certificateId; // E.g. CERT-2026-99381
    private String eventId;
    private String eventTitle;
    private String studentId;
    private String studentName;
    private String collegeId;
    private String issueDate;
    private String signatureUrl;
    private String pdfUrl;
    
    @Builder.Default
    private Instant createdAt = Instant.now();
}
