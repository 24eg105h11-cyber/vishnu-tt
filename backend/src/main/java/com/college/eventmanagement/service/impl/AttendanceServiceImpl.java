package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.dto.CheckInRequest;
import com.college.eventmanagement.exception.BadRequestException;
import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Attendance;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.Registration;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.AttendanceRepository;
import com.college.eventmanagement.repository.EventRepository;
import com.college.eventmanagement.repository.RegistrationRepository;
import com.college.eventmanagement.repository.UserRepository;
import com.college.eventmanagement.service.AttendanceService;
import com.college.eventmanagement.service.CertificateService;
import com.college.eventmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private CertificateService certificateService;

    @Override
    public Attendance markAttendance(CheckInRequest request, String organizerUserId) {
        String rawData = request.getQrCodeData();
        String regId = rawData;

        if (rawData.contains("registrationId\":\"")) {
            int start = rawData.indexOf("registrationId\":\"") + 17;
            int end = rawData.indexOf("\"", start);
            if (start > 16 && end > start) {
                regId = rawData.substring(start, end);
            }
        }

        Registration reg = registrationRepository.findByRegistrationId(regId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration record not found for code: " + request.getQrCodeData()));

        if ("CANCELLED".equals(reg.getStatus())) {
            throw new BadRequestException("Registration for this ticket was cancelled!");
        }

        if (attendanceRepository.existsByEventIdAndStudentId(reg.getEventId(), reg.getStudentId())) {
            throw new BadRequestException("Attendance already marked for student: " + reg.getStudentName());
        }

        // Save Attendance
        Attendance attendance = Attendance.builder()
                .eventId(reg.getEventId())
                .studentId(reg.getStudentId())
                .registrationId(reg.getRegistrationId())
                .studentName(reg.getStudentName())
                .collegeId(reg.getCollegeId())
                .markedByUserId(organizerUserId)
                .checkInTime(Instant.now())
                .build();

        Attendance saved = attendanceRepository.save(attendance);

        // Update Registration status
        reg.setStatus("ATTENDED");
        reg.setCheckInTime(Instant.now());
        registrationRepository.save(reg);

        // Award +20 Attendance Points to Student
        User student = userRepository.findById(reg.getStudentId()).orElse(null);
        if (student != null) {
            student.setPoints(student.getPoints() + 20);
            if (student.getPoints() >= 100) student.getBadges().add("🔥 Active Participant");
            if (student.getPoints() >= 300) student.getBadges().add("💻 Tech Enthusiast");
            if (student.getPoints() >= 500) student.getBadges().add("🎯 Campus Champion");
            userRepository.save(student);
        }

        // Generate Certificate
        Event event = eventRepository.findById(reg.getEventId()).orElse(null);
        if (event != null) {
            certificateService.generateCertificate(event, reg);
        }

        // Send notification
        notificationService.sendNotification(reg.getStudentId(),
                "Attendance Marked! ✓",
                "Your attendance was checked-in for " + reg.getEventTitle() + ". +20 Points added!",
                "ATTENDANCE_MARKED", "/my-events");

        return saved;
    }

    @Override
    public List<Attendance> getEventAttendance(String eventId) {
        return attendanceRepository.findByEventId(eventId);
    }

    @Override
    public List<Attendance> getStudentAttendance(String studentUserId) {
        return attendanceRepository.findByStudentId(studentUserId);
    }
}
