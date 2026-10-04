package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends MongoRepository<Announcement, String> {
    List<Announcement> findByClubIdOrderByCreatedAtDesc(String clubId);
    List<Announcement> findAllByOrderByCreatedAtDesc();
}
