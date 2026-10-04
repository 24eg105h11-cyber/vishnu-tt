package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.dto.RegistrationRequest;
import com.college.eventmanagement.exception.BadRequestException;
import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.Registration;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.EventRepository;
import com.college.eventmanagement.repository.RegistrationRepository;
import com.college.eventmanagement.repository.UserRepository;
import com.college.eventmanagement.service.NotificationService;
import com.college.eventmanagement.service.RegistrationService;
import com.college.eventmanagement.util.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Registration registerForEvent(String eventId, RegistrationRequest req, String studentUserId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId));

        if (registrationRepository.existsByEventIdAndStudentId(eventId, studentUserId)) {
            throw new BadRequestException("You have already registered for this event!");
        }

        if (event.getRegisteredCount() >= event.getMaxCapacity()) {
            throw new BadRequestException("Event capacity is full!");
        }

        String regId = "REG-" + (100000 + new Random().nextInt(900000));
        String qrPayload = String.format("{\"registrationId\":\"%s\",\"eventId\":\"%s\",\"studentId\":\"%s\"}", regId, eventId, studentUserId);
        String qrCodeBase64 = QRCodeGenerator.generateQRCodeBase64(qrPayload, 300, 300);

        Registration registration = Registration.builder()
                .registrationId(regId)
                .eventId(eventId)
                .eventTitle(event.getTitle())
                .studentId(studentUserId)
                .studentName(req.getName())
                .studentEmail(req.getEmail())
                .collegeId(req.getCollegeId())
                .department(req.getDepartment())
                .year(req.getYear())
                .phone(req.getPhone())
                .qrCodeData(qrCodeBase64)
                .status("REGISTERED")
                .build();

        Registration savedReg = registrationRepository.save(registration);

        // Update event registration count
        event.setRegisteredCount(event.getRegisteredCount() + 1);
        eventRepository.save(event);

        // Award points to student for registering (+5 points)
        User student = userRepository.findById(studentUserId).orElse(null);
        if (student != null) {
            student.setPoints(student.getPoints() + 5);
            userRepository.save(student);
        }

        // Send notification
        notificationService.sendNotification(studentUserId, 
                "Registration Confirmed! 🎉", 
                "You have successfully registered for " + event.getTitle() + ". Your ticket is ready!", 
                "REGISTRATION_SUCCESS", "/my-events");

        return savedReg;
    }

    @Override
    public void cancelRegistration(String registrationId, String studentUserId) {
        Registration reg = registrationRepository.findByRegistrationId(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration", "id", registrationId));

        if (!reg.getStudentId().equals(studentUserId)) {
            throw new BadRequestException("Unauthorized action");
        }

        reg.setStatus("CANCELLED");
        registrationRepository.save(reg);

        Event event = eventRepository.findById(reg.getEventId()).orElse(null);
        if (event != null && event.getRegisteredCount() > 0) {
            event.setRegisteredCount(event.getRegisteredCount() - 1);
            eventRepository.save(event);
        }
    }

    @Override
    public List<Registration> getStudentRegistrations(String studentUserId) {
        return registrationRepository.findByStudentId(studentUserId);
    }

    @Override
    public List<Registration> getEventRegistrations(String eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    @Override
    public Registration getRegistrationById(String registrationId) {
        return registrationRepository.findByRegistrationId(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration", "registrationId", registrationId));
    }
}
