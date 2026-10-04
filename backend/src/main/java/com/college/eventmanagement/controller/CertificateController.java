package com.college.eventmanagement.controller;

import com.college.eventmanagement.dto.ApiResponse;
import com.college.eventmanagement.model.Certificate;
import com.college.eventmanagement.security.UserPrincipal;
import com.college.eventmanagement.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<Certificate>>> getMyCertificates(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<Certificate> certificates = certificateService.getStudentCertificates(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Certificates list retrieved", certificates));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Certificate>> getCertificateById(@PathVariable String id) {
        Certificate certificate = certificateService.getCertificateById(id);
        return ResponseEntity.ok(ApiResponse.success("Certificate details", certificate));
    }
}
