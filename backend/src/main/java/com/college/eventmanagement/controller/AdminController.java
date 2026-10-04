package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.ClubRepository;
import com.college.eventmanagement.repository.EventRepository;
import com.college.eventmanagement.repository.RegistrationRepository;
import com.college.eventmanagement.repository.UserRepository;
import com.college.eventmanagement.service.ClubService;
import com.college.eventmanagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ClubService clubService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", userRepository.countByRole("ROLE_STUDENT"));
        stats.put("totalOrganizers", userRepository.countByRole("ROLE_ORGANIZER"));
        stats.put("totalClubs", clubRepository.count());
        stats.put("totalEvents", eventRepository.count());
        stats.put("totalRegistrations", registrationRepository.count());
        stats.put("pendingEventsCount", eventRepository.findByStatus("PENDING").size());
        stats.put("pendingClubsCount", clubRepository.findByStatus("PENDING").size());

        return ResponseEntity.ok(ApiResponse.success("Admin stats retrieved", stats));
    }

    @GetMapping("/events/pending")
    public ResponseEntity<ApiResponse<List<Event>>> getPendingEvents() {
        List<Event> pending = eventService.getPendingEvents();
        return ResponseEntity.ok(ApiResponse.success("Pending events list", pending));
    }

    @PutMapping("/events/{id}/approve")
    public ResponseEntity<ApiResponse<Event>> approveEvent(@PathVariable String id) {
        Event event = eventService.approveEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event approved successfully", event));
    }

    @PutMapping("/events/{id}/reject")
    public ResponseEntity<ApiResponse<Event>> rejectEvent(@PathVariable String id) {
        Event event = eventService.rejectEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event rejected", event));
    }

    @GetMapping("/clubs/pending")
    public ResponseEntity<ApiResponse<List<Club>>> getPendingClubs() {
        List<Club> pending = clubService.getPendingClubs();
        return ResponseEntity.ok(ApiResponse.success("Pending clubs list", pending));
    }

    @PutMapping("/clubs/{id}/approve")
    public ResponseEntity<ApiResponse<Club>> approveClub(@PathVariable String id) {
        Club club = clubService.approveClub(id);
        return ResponseEntity.ok(ApiResponse.success("Club approved successfully", club));
    }

    @PutMapping("/clubs/{id}/reject")
    public ResponseEntity<ApiResponse<Club>> rejectClub(@PathVariable String id) {
        Club club = clubService.rejectClub(id);
        return ResponseEntity.ok(ApiResponse.success("Club rejected", club));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Users list retrieved", users));
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse<User>> toggleUserStatus(@PathVariable String id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setActive(!user.isActive());
        User updated = userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("User status updated", updated));
    }
}
