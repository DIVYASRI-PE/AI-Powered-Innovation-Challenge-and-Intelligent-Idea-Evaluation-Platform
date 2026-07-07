package com.innovation.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "manual_reviews")
public class ManualReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User reviewer;

    @Column(name = "originality_score", precision = 5, scale = 2)
    private BigDecimal originalityScore;

    @Column(name = "innovation_score", precision = 5, scale = 2)
    private BigDecimal innovationScore;

    @Column(name = "technical_feasibility_score", precision = 5, scale = 2)
    private BigDecimal technicalFeasibilityScore;

    @Column(name = "presentation_score", precision = 5, scale = 2)
    private BigDecimal presentationScore;

    @Column(name = "overall_score", precision = 5, scale = 2)
    private BigDecimal overallScore;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private String status = "PENDING";

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ManualReview() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Idea getIdea() { return idea; }
    public void setIdea(Idea idea) { this.idea = idea; }

    public User getReviewer() { return reviewer; }
    public void setReviewer(User reviewer) { this.reviewer = reviewer; }

    public BigDecimal getOriginalityScore() { return originalityScore; }
    public void setOriginalityScore(BigDecimal originalityScore) { this.originalityScore = originalityScore; }

    public BigDecimal getInnovationScore() { return innovationScore; }
    public void setInnovationScore(BigDecimal innovationScore) { this.innovationScore = innovationScore; }

    public BigDecimal getTechnicalFeasibilityScore() { return technicalFeasibilityScore; }
    public void setTechnicalFeasibilityScore(BigDecimal technicalFeasibilityScore) { this.technicalFeasibilityScore = technicalFeasibilityScore; }

    public BigDecimal getPresentationScore() { return presentationScore; }
    public void setPresentationScore(BigDecimal presentationScore) { this.presentationScore = presentationScore; }

    public BigDecimal getOverallScore() { return overallScore; }
    public void setOverallScore(BigDecimal overallScore) { this.overallScore = overallScore; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
