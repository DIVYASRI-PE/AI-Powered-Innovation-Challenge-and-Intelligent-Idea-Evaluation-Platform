package com.innovation.repository;

import com.innovation.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<ChatHistory> findByUserIdAndSessionIdOrderByCreatedAtAsc(Long userId, String sessionId);
}
