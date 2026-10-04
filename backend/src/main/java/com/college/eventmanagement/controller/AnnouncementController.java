package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.AnnouncementDTO;
import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.model.Announcement;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.repository.AnnouncementRepository;
import com.college.eventmanagement.repository.ClubRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private ClubRepository clubRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Announcement>>> getAllAnnouncements() {
        List<Announcement> list = announcementRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.success("Announcements list", list));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Announcement>> createAnnouncement(@Valid @RequestBody AnnouncementDTO dto) {
        String clubName = "Campus Announcement";
        if (dto.getClubId() != null && !dto.getClubId().isEmpty()) {
            Club club = clubRepository.findById(dto.getClubId()).orElse(null);
            if (club != null) clubName = club.getName();
        }

        Announcement announcement = Announcement.builder()
                .clubId(dto.getClubId())
                .clubName(clubName)
                .title(dto.getTitle())
                .content(dto.getContent())
                .priority(dto.getPriority() != null ? dto.getPriority() : "NORMAL")
                .build();

        Announcement saved = announcementRepository.save(announcement);
        return ResponseEntity.ok(ApiResponse.success("Announcement published successfully", saved));
    }
}
