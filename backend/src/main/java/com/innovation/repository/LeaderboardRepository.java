package com.innovation.repository;

import com.innovation.entity.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {

    // Leaderboard has a 'user' relationship, not a direct userId field
    @Query("SELECT l FROM Leaderboard l WHERE l.user.id = :userId")
    Optional<Leaderboard> findByUserId(@Param("userId") Long userId);

    @Query("SELECT l FROM Leaderboard l ORDER BY l.totalScore DESC")
    List<Leaderboard> findAllOrderByScoreDesc();

    @Query("SELECT l FROM Leaderboard l WHERE l.user.id = :userId")
    Optional<Leaderboard> findByUserIdWithIdeas(@Param("userId") Long userId);
}
