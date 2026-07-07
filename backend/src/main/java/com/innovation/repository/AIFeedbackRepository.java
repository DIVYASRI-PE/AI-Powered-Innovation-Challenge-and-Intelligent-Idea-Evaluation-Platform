package com.innovation.repository;

import com.innovation.entity.AIFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AIFeedbackRepository extends JpaRepository<AIFeedback, Long> {

    Optional<AIFeedback> findByIdeaId(Long ideaId);
    
    void deleteByIdeaId(Long ideaId);
}
