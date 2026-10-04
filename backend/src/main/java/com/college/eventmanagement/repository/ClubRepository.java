package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Club;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends MongoRepository<Club, String> {
    List<Club> findByStatus(String status);
    List<Club> findByCategory(String category);
    Optional<Club> findByOrganizerUserId(String organizerUserId);
    List<Club> findByNameContainingIgnoreCase(String keyword);
}
