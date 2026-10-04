package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.dto.CheckInRequest;
import com.college.eventmanagement.model.Attendance;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/check-in")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Attendance>> checkInStudent(
            @Valid @RequestBody CheckInRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Attendance attendance = attendanceService.markAttendance(request, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Attendance Marked ✓", attendance));
    }

    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasAnyRole('ORGANIZER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<Attendance>>> getEventAttendance(@PathVariable String eventId) {
        List<Attendance> attendanceList = attendanceService.getEventAttendance(eventId);
        return ResponseEntity.ok(ApiResponse.success("Attendance records", attendanceList));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<Attendance>>> getMyAttendance(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<Attendance> attendanceList = attendanceService.getStudentAttendance(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("My attendance history", attendanceList));
    }
}
