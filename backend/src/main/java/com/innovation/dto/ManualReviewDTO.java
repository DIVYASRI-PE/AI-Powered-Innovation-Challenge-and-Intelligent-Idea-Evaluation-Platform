package com.innovation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ManualReviewDTO {
    private Long id;
    private Long ideaId;
    private String ideaTitle;
    private Long reviewerId;
    private String reviewerName;
    private BigDecimal originalityScore;
    private BigDecimal innovationScore;
    private BigDecimal technicalFeasibilityScore;
    private BigDecimal presentationScore;
    private BigDecimal overallScore;
    private String comments;
    private String feedback;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;

    public ManualReviewDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIdeaId() { return ideaId; }
    public void setIdeaId(Long ideaId) { this.ideaId = ideaId; }

    public String getIdeaTitle() { return ideaTitle; }
    public void setIdeaTitle(String ideaTitle) { this.ideaTitle = ideaTitle; }

    public Long getReviewerId() { return reviewerId; }
    public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }

    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}
