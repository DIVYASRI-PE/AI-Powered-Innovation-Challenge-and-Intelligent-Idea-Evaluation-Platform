package com.innovation.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "leaderboard")
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id")
    private Idea idea;

    @Column(name = "rank_position")
    private Integer rank;

    @Column(name = "total_score", precision = 5, scale = 2)
    private BigDecimal totalScore;

    @Column(name = "ideas_submitted")
    private Integer ideasSubmitted = 0;

    @Column(name = "ideas_approved")
    private Integer ideasApproved = 0;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Leaderboard() {}

    @PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Idea getIdea() { return idea; }
    public void setIdea(Idea idea) { this.idea = idea; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public BigDecimal getTotalScore() { return totalScore; }
    public void setTotalScore(BigDecimal totalScore) { this.totalScore = totalScore; }

    public Integer getIdeasSubmitted() { return ideasSubmitted; }
    public void setIdeasSubmitted(Integer ideasSubmitted) { this.ideasSubmitted = ideasSubmitted; }

    public Integer getIdeasApproved() { return ideasApproved; }
    public void setIdeasApproved(Integer ideasApproved) { this.ideasApproved = ideasApproved; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
