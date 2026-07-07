package com.innovation.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ManualReviewRequest {
    @NotNull
    private Long ideaId;

    private BigDecimal originalityScore;
    private BigDecimal innovationScore;
    private BigDecimal technicalFeasibilityScore;
    private BigDecimal presentationScore;
    private String comments;
    private String feedback;

    public Long getIdeaId() { return ideaId; }
    public void setIdeaId(Long ideaId) { this.ideaId = ideaId; }

    public BigDecimal getOriginalityScore() { return originalityScore; }
    public void setOriginalityScore(BigDecimal originalityScore) { this.originalityScore = originalityScore; }

    public BigDecimal getInnovationScore() { return innovationScore; }
    public void setInnovationScore(BigDecimal innovationScore) { this.innovationScore = innovationScore; }

    public BigDecimal getTechnicalFeasibilityScore() { return technicalFeasibilityScore; }
    public void setTechnicalFeasibilityScore(BigDecimal technicalFeasibilityScore) { this.technicalFeasibilityScore = technicalFeasibilityScore; }

    public BigDecimal getPresentationScore() { return presentationScore; }
    public void setPresentationScore(BigDecimal presentationScore) { this.presentationScore = presentationScore; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}
