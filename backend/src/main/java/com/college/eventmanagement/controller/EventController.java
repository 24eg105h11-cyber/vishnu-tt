package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.dto.EventDTO;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.CloudinaryService;
import com.college.eventmanagement.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Event>>> getEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String club,
            @RequestParam(required = false, defaultValue = "recent") String sort) {
        
        List<Event> events = eventService.searchAndFilterEvents(search, category, club, sort);
        return ResponseEntity.ok(ApiResponse.success("Events retrieved successfully", events));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getEventById(@PathVariable String id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(ApiResponse.success("Event details", event));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Event>> createEvent(
            @Valid @RequestBody EventDTO eventDTO,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        Event event = eventService.createEvent(eventDTO, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Event created successfully and sent for admin approval", event));
    }

    @PostMapping(value = "/upload-poster", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<String>> uploadPoster(@RequestParam("file") MultipartFile file) {
        String imageUrl = cloudinaryService.uploadFile(file, "event_posters");
        return ResponseEntity.ok(ApiResponse.success("Poster uploaded successfully", imageUrl));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Event>> updateEvent(
            @PathVariable String id,
            @Valid @RequestBody EventDTO eventDTO,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        Event event = eventService.updateEvent(id, eventDTO, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Event updated successfully", event));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        eventService.deleteEvent(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Event deleted successfully"));
    }
}
