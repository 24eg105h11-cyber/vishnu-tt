package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByEventIdOrderByCreatedAtDesc(String eventId);
    List<Review> findByStudentId(String studentId);
}
