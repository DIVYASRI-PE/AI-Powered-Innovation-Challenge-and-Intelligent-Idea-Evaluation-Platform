package com.innovation.service;

import com.innovation.dto.NotificationDTO;
import com.innovation.entity.Notification;
import com.innovation.entity.User;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.NotificationRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public NotificationDTO createNotification(Long userId, String type, String message, String link) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setMessage(message);
        notification.setLink(link);
        notification.setRead(false);

        Notification savedNotification = notificationRepository.save(notification);
        return convertToDTO(savedNotification);
    }

    public List<NotificationDTO> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<NotificationDTO> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndReadOrderByCreatedAtDesc(userId, false).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndRead(userId, false);
    }

    public NotificationDTO markAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

        if (!notification.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this notification");
        }

        notification.setRead(true);
        Notification updatedNotification = notificationRepository.save(notification);
        return convertToDTO(updatedNotification);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndReadOrderByCreatedAtDesc(userId, false);
        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setUserId(notification.getUser().getId());
        dto.setType(notification.getType());
        dto.setMessage(notification.getMessage());
        dto.setLink(notification.getLink());
        dto.setRead(notification.getRead());
        dto.setCreatedAt(notification.getCreatedAt());
        return dto;
    }
}
