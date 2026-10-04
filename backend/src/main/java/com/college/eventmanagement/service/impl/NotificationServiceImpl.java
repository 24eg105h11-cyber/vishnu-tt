package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Notification;
import com.college.eventmanagement.repository.NotificationRepository;
import com.college.eventmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired(required = false)
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public Notification sendNotification(String userId, String title, String message, String type, String targetUrl) {
        Notification notification = Notification.builder()
                .userId(userId)
                .title(title)
                .message(message)
                .type(type)
                .targetUrl(targetUrl)
                .isRead(false)
                .build();

        Notification saved = notificationRepository.save(notification);

        // Push real-time notification via STOMP WebSocket if available
        if (messagingTemplate != null) {
            try {
                messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", saved);
            } catch (Exception ignored) {}
        }

        return saved;
    }

    @Override
    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Notification markAsRead(String notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
}
