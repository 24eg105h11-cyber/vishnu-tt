package com.college.eventmanagement.service;

import com.college.eventmanagement.dto.RegistrationRequest;
import com.college.eventmanagement.model.Registration;

import java.util.List;

public interface RegistrationService {
    Registration registerForEvent(String eventId, RegistrationRequest request, String studentUserId);
    void cancelRegistration(String registrationId, String studentUserId);
    List<Registration> getStudentRegistrations(String studentUserId);
    List<Registration> getEventRegistrations(String eventId);
    Registration getRegistrationById(String registrationId);
}
