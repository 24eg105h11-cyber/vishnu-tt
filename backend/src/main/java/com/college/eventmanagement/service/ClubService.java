package com.college.eventmanagement.service;

import com.college.eventmanagement.dto.ClubDTO;
import com.college.eventmanagement.model.Club;

import java.util.List;

public interface ClubService {
    List<Club> getAllClubs();
    List<Club> getApprovedClubs();
    Club getClubById(String id);
    Club createClub(ClubDTO clubDTO, String organizerUserId);
    Club updateClub(String id, ClubDTO clubDTO, String organizerUserId);
    void followClub(String clubId, String studentUserId);
    void unfollowClub(String clubId, String studentUserId);
    List<Club> getPendingClubs();
    Club approveClub(String id);
    Club rejectClub(String id);
}
