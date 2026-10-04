package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByStatus(String status);
    List<Event> findByClubId(String clubId);
    List<Event> findByOrganizerUserId(String organizerUserId);
    List<Event> findByCategory(String category);
    
    @Query("{ '$or': [ { 'title': { '$regex': ?0, '$options': 'i' } }, { 'description': { '$regex': ?0, '$options': 'i' } }, { 'clubName': { '$regex': ?0, '$options': 'i' } }, { 'venue': { '$regex': ?0, '$options': 'i' } } ] }")
    List<Event> searchEvents(String keyword);
    
    List<Event> findByStatusOrderByCreatedAtDesc(String status);
}
