package com.innovation.controller;

import com.innovation.dto.NotificationDTO;
import com.innovation.security.UserPrincipal;
import com.innovation.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<NotificationDTO> notifications = notificationService.getUserNotifications(userPrincipal.getId());
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotifications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<NotificationDTO> notifications = notificationService.getUnreadNotifications(userPrincipal.getId());
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long count = notificationService.getUnreadCount(userPrincipal.getId());
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationDTO> markAsRead(@PathVariable Long id,
                                                     @AuthenticationPrincipal UserPrincipal userPrincipal) {
        NotificationDTO notification = notificationService.markAsRead(id, userPrincipal.getId());
        return ResponseEntity.ok(notification);
    }

    @PutMapping("/mark-all-read")
    public ResponseEntity<Void> markAllAsRead(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        notificationService.markAllAsRead(userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }
}
