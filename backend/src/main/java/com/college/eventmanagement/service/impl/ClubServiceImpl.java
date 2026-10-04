package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.dto.ClubDTO;
import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.ClubRepository;
import com.college.eventmanagement.repository.UserRepository;
import com.college.eventmanagement.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    @Override
    public List<Club> getApprovedClubs() {
        return clubRepository.findByStatus("APPROVED");
    }

    @Override
    public Club getClubById(String id) {
        return clubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Club", "id", id));
    }

    @Override
    public Club createClub(ClubDTO dto, String organizerUserId) {
        Club club = Club.builder()
                .name(dto.getName())
                .code(dto.getCode())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .logoUrl(dto.getLogoUrl())
                .bannerUrl(dto.getBannerUrl())
                .facultyCoordinator(dto.getFacultyCoordinator())
                .studentCoordinators(dto.getStudentCoordinators())
                .socialLinks(dto.getSocialLinks())
                .organizerUserId(organizerUserId)
                .status("APPROVED") // Default auto approved or pending
                .build();

        return clubRepository.save(club);
    }

    @Override
    public Club updateClub(String id, ClubDTO dto, String organizerUserId) {
        Club club = getClubById(id);
        club.setName(dto.getName());
        club.setDescription(dto.getDescription());
        club.setCategory(dto.getCategory());
        if (dto.getLogoUrl() != null) club.setLogoUrl(dto.getLogoUrl());
        if (dto.getBannerUrl() != null) club.setBannerUrl(dto.getBannerUrl());
        club.setFacultyCoordinator(dto.getFacultyCoordinator());
        if (dto.getStudentCoordinators() != null) club.setStudentCoordinators(dto.getStudentCoordinators());
        if (dto.getSocialLinks() != null) club.setSocialLinks(dto.getSocialLinks());

        return clubRepository.save(club);
    }

    @Override
    public void followClub(String clubId, String studentUserId) {
        Club club = getClubById(clubId);
        User user = userRepository.findById(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", studentUserId));

        if (!user.getFollowedClubIds().contains(clubId)) {
            user.getFollowedClubIds().add(clubId);
            userRepository.save(user);

            club.setFollowersCount(club.getFollowersCount() + 1);
            clubRepository.save(club);
        }
    }

    @Override
    public void unfollowClub(String clubId, String studentUserId) {
        Club club = getClubById(clubId);
        User user = userRepository.findById(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", studentUserId));

        if (user.getFollowedClubIds().contains(clubId)) {
            user.getFollowedClubIds().remove(clubId);
            userRepository.save(user);

            club.setFollowersCount(Math.max(0, club.getFollowersCount() - 1));
            clubRepository.save(club);
        }
    }

    @Override
    public List<Club> getPendingClubs() {
        return clubRepository.findByStatus("PENDING");
    }

    @Override
    public Club approveClub(String id) {
        Club club = getClubById(id);
        club.setStatus("APPROVED");
        return clubRepository.save(club);
    }

    @Override
    public Club rejectClub(String id) {
        Club club = getClubById(id);
        club.setStatus("REJECTED");
        return clubRepository.save(club);
    }
}
