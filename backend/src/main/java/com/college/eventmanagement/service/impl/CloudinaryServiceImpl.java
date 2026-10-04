package com.college.eventmanagement.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.college.eventmanagement.exception.BadRequestException;
import com.college.eventmanagement.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    @Autowired(required = false)
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folderName) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty");
        }

        try {
            if (cloudinary != null) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                        "folder", folderName
                ));
                return (String) uploadResult.get("secure_url");
            }
        } catch (IOException e) {
            throw new BadRequestException("Failed to upload image: " + e.getMessage());
        }

        // Fallback placeholder URL if Cloudinary credentials are mock/default
        return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80";
    }
}
