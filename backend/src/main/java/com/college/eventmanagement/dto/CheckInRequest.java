package com.college.eventmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CheckInRequest {
    @NotBlank(message = "QR Code data or Registration ID is required")
    private String qrCodeData;
    
    private String eventId;
}
