package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Registration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends MongoRepository<Registration, String> {
    List<Registration> findByStudentId(String studentId);
    List<Registration> findByEventId(String eventId);
    Optional<Registration> findByRegistrationId(String registrationId);
    Optional<Registration> findByEventIdAndStudentId(String eventId, String studentId);
    Boolean existsByEventIdAndStudentId(String eventId, String studentId);
    long countByEventIdAndStatus(String eventId, String status);
}
