package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Certificate;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.Registration;
import com.college.eventmanagement.repository.CertificateRepository;
import com.college.eventmanagement.service.CertificateService;
import com.college.eventmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Certificate generateCertificate(Event event, Registration registration) {
        return certificateRepository.findByEventIdAndStudentId(event.getId(), registration.getStudentId())
                .orElseGet(() -> {
                    String certId = "CERT-" + LocalDate.now().getYear() + "-" + (100000 + new Random().nextInt(900000));
                    Certificate certificate = Certificate.builder()
                            .certificateId(certId)
                            .eventId(event.getId())
                            .eventTitle(event.getTitle())
                            .studentId(registration.getStudentId())
                            .studentName(registration.getStudentName())
                            .collegeId(registration.getCollegeId())
                            .issueDate(LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")))
                            .signatureUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80")
                            .build();

                    Certificate saved = certificateRepository.save(certificate);

                    // Notify student
                    notificationService.sendNotification(registration.getStudentId(),
                            "Certificate Ready! 🎓",
                            "Your certificate for " + event.getTitle() + " is now available to download!",
                            "CERTIFICATE_AVAILABLE", "/certificates");

                    return saved;
                });
    }

    @Override
    public List<Certificate> getStudentCertificates(String studentUserId) {
        return certificateRepository.findByStudentId(studentUserId);
    }

    @Override
    public Certificate getCertificateById(String certificateId) {
        return certificateRepository.findByCertificateId(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "id", certificateId));
    }
}
