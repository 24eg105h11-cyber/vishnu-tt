package com.college.eventmanagement.service;

import com.college.eventmanagement.dto.CheckInRequest;
import com.college.eventmanagement.model.Attendance;

import java.util.List;

public interface AttendanceService {
    Attendance markAttendance(CheckInRequest checkInRequest, String organizerUserId);
    List<Attendance> getEventAttendance(String eventId);
    List<Attendance> getStudentAttendance(String studentUserId);
}
