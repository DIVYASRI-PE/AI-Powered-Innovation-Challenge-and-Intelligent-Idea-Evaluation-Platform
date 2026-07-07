package com.innovation.repository;

import com.innovation.entity.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {

    // Idea has a 'user' relationship, not a direct userId field
    @Query("SELECT i FROM Idea i WHERE i.user.id = :userId")
    List<Idea> findByUserId(@Param("userId") Long userId);

    @Query("SELECT i FROM Idea i WHERE i.challenge.id = :challengeId")
    List<Idea> findByChallengeId(@Param("challengeId") Long challengeId);

    List<Idea> findByStatus(String status);

    @Query("SELECT i FROM Idea i WHERE i.user.id = :userId AND i.status = :status")
    List<Idea> findByUserIdAndStatus(@Param("userId") Long userId, @Param("status") String status);

    @Query("SELECT i FROM Idea i WHERE i.user.id = :userId ORDER BY i.createdAt DESC")
    List<Idea> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    @Query("SELECT i FROM Idea i WHERE i.status = :status ORDER BY i.overallScore DESC")
    List<Idea> findTopIdeasByScore(@Param("status") String status);

    @Query("SELECT COUNT(i) FROM Idea i WHERE i.challenge.id = :challengeId")
    Long countByChallengeId(@Param("challengeId") Long challengeId);

    @Query("SELECT i.challenge.category.name, COUNT(i) FROM Idea i WHERE i.challenge IS NOT NULL AND i.challenge.category IS NOT NULL GROUP BY i.challenge.category.name")
    List<Object[]> findIdeasByCategory();

    @Query("SELECT i.status, COUNT(i) FROM Idea i GROUP BY i.status")
    List<Object[]> findIdeasByStatusGrouped();
}
