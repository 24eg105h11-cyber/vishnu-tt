package com.college.eventmanagement.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewRequest {
    @NotBlank(message = "Event ID is required")
    private String eventId;

    @Min(1)
    @Max(5)
    private int rating;

    private String comment;
}
