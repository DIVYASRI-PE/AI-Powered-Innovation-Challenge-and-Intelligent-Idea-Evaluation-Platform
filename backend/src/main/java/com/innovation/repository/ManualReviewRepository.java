package com.innovation.repository;

import com.innovation.entity.ManualReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManualReviewRepository extends JpaRepository<ManualReview, Long> {

    Optional<ManualReview> findByIdeaIdAndReviewerId(Long ideaId, Long reviewerId);
    
    List<ManualReview> findByReviewerId(Long reviewerId);
    
    List<ManualReview> findByIdeaId(Long ideaId);
    
    List<ManualReview> findByStatus(String status);
    
    @Query("SELECT r FROM ManualReview r WHERE r.status = 'PENDING' ORDER BY r.createdAt ASC")
    List<ManualReview> findPendingReviews();
}
