package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.dto.RegistrationRequest;
import com.college.eventmanagement.model.Registration;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/events/{eventId}/register")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Registration>> registerForEvent(
            @PathVariable String eventId,
            @Valid @RequestBody RegistrationRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Registration registration = registrationService.registerForEvent(eventId, request, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Registration successful! Ticket generated.", registration));
    }

    @DeleteMapping("/registrations/{registrationId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Void>> cancelRegistration(
            @PathVariable String registrationId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        registrationService.cancelRegistration(registrationId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Registration cancelled successfully"));
    }

    @GetMapping("/registrations/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<Registration>>> getMyRegistrations(
            @AuthenticationPrincipal UserPrincipal currentUser) {

        List<Registration> registrations = registrationService.getStudentRegistrations(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("My registrations retrieved", registrations));
    }

    @GetMapping("/events/{eventId}/registrations")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<Registration>>> getEventRegistrations(@PathVariable String eventId) {
        List<Registration> registrations = registrationService.getEventRegistrations(eventId);
        return ResponseEntity.ok(ApiResponse.success("Event participants list retrieved", registrations));
    }
}
