package com.college.eventmanagement.service;

import com.college.eventmanagement.model.Notification;

import java.util.List;

public interface NotificationService {
    Notification sendNotification(String userId, String title, String message, String type, String targetUrl);
    List<Notification> getUserNotifications(String userId);
    Notification markAsRead(String notificationId);
}
