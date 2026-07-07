package com.innovation.repository;

import com.innovation.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Notification> findByUserIdAndReadOrderByCreatedAtDesc(Long userId, Boolean read);
    
    Long countByUserIdAndRead(Long userId, Boolean read);
}
