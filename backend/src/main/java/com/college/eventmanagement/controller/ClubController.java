package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.dto.ClubDTO;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.ClubService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Club>>> getAllClubs() {
        List<Club> clubs = clubService.getApprovedClubs();
        return ResponseEntity.ok(ApiResponse.success("Approved clubs retrieved", clubs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Club>> getClubById(@PathVariable String id) {
        Club club = clubService.getClubById(id);
        return ResponseEntity.ok(ApiResponse.success("Club details", club));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Club>> createClub(
            @Valid @RequestBody ClubDTO clubDTO,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        Club club = clubService.createClub(clubDTO, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Club created successfully", club));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Club>> updateClub(
            @PathVariable String id,
            @Valid @RequestBody ClubDTO clubDTO,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        Club club = clubService.updateClub(id, clubDTO, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Club profile updated successfully", club));
    }

    @PostMapping("/{id}/follow")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Void>> followClub(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        clubService.followClub(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("You are now following this club!"));
    }

    @DeleteMapping("/{id}/follow")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Void>> unfollowClub(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        clubService.unfollowClub(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Unfollowed club"));
    }
}
