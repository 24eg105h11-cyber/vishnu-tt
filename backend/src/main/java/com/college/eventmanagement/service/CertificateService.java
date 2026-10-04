package com.college.eventmanagement.service;

import com.college.eventmanagement.model.Certificate;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.Registration;

import java.util.List;

public interface CertificateService {
    Certificate generateCertificate(Event event, Registration registration);
    List<Certificate> getStudentCertificates(String studentUserId);
    Certificate getCertificateById(String certificateId);
}
