package com.college.eventmanagement.repository;

import com.college.eventmanagement.model.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
    List<Certificate> findByStudentId(String studentId);
    Optional<Certificate> findByEventIdAndStudentId(String eventId, String studentId);
    Optional<Certificate> findByCertificateId(String certificateId);
}
