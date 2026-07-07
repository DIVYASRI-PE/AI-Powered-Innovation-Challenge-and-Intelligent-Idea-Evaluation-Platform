package com.innovation.repository;

import com.innovation.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    List<Challenge> findByStatus(String status);
    
    List<Challenge> findByCategoryId(Long categoryId);
    
    List<Challenge> findByDeadlineAfter(LocalDateTime date);
    
    @Query("SELECT c FROM Challenge c WHERE c.status = :status AND c.deadline > :currentDate ORDER BY c.deadline ASC")
    List<Challenge> findActiveChallenges(@Param("status") String status, @Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT c FROM Challenge c WHERE c.createdBy.id = :userId")
    List<Challenge> findByCreatedBy(@Param("userId") Long userId);
}
