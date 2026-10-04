package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByEventId(String eventId);
    List<Attendance> findByStudentId(String studentId);
    Optional<Attendance> findByRegistrationId(String registrationId);
    Boolean existsByEventIdAndStudentId(String eventId, String studentId);
}
