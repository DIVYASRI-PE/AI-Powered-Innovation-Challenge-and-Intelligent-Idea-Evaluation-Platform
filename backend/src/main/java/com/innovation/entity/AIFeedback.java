package com.innovation.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_feedback")
public class AIFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;

    @Column(name = "originality_score", precision = 5, scale = 2)
    private BigDecimal originalityScore;

    @Column(name = "innovation_score", precision = 5, scale = 2)
    private BigDecimal innovationScore;

    @Column(name = "technical_feasibility_score", precision = 5, scale = 2)
    private BigDecimal technicalFeasibilityScore;

    @Column(name = "technical_complexity_score", precision = 5, scale = 2)
    private BigDecimal technicalComplexityScore;

    @Column(name = "market_potential_score", precision = 5, scale = 2)
    private BigDecimal marketPotentialScore;

    @Column(name = "scalability_score", precision = 5, scale = 2)
    private BigDecimal scalabilityScore;

    @Column(name = "social_impact_score", precision = 5, scale = 2)
    private BigDecimal socialImpactScore;

    @Column(name = "sustainability_score", precision = 5, scale = 2)
    private BigDecimal sustainabilityScore;

    @Column(name = "overall_score", precision = 5, scale = 2)
    private BigDecimal overallScore;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    @Column(columnDefinition = "TEXT")
    private String suggestions;

    @Column(columnDefinition = "TEXT")
    private String futureScope;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public AIFeedback() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Idea getIdea() { return idea; }
    public void setIdea(Idea idea) { this.idea = idea; }

    public BigDecimal getOriginalityScore() { return originalityScore; }
    public void setOriginalityScore(BigDecimal originalityScore) { this.originalityScore = originalityScore; }

    public BigDecimal getInnovationScore() { return innovationScore; }
    public void setInnovationScore(BigDecimal innovationScore) { this.innovationScore = innovationScore; }

    public BigDecimal getTechnicalFeasibilityScore() { return technicalFeasibilityScore; }
    public void setTechnicalFeasibilityScore(BigDecimal technicalFeasibilityScore) { this.technicalFeasibilityScore = technicalFeasibilityScore; }

    public BigDecimal getTechnicalComplexityScore() { return technicalComplexityScore; }
    public void setTechnicalComplexityScore(BigDecimal technicalComplexityScore) { this.technicalComplexityScore = technicalComplexityScore; }

    public BigDecimal getMarketPotentialScore() { return marketPotentialScore; }
    public void setMarketPotentialScore(BigDecimal marketPotentialScore) { this.marketPotentialScore = marketPotentialScore; }

    public BigDecimal getScalabilityScore() { return scalabilityScore; }
    public void setScalabilityScore(BigDecimal scalabilityScore) { this.scalabilityScore = scalabilityScore; }

    public BigDecimal getSocialImpactScore() { return socialImpactScore; }
    public void setSocialImpactScore(BigDecimal socialImpactScore) { this.socialImpactScore = socialImpactScore; }

    public BigDecimal getSustainabilityScore() { return sustainabilityScore; }
    public void setSustainabilityScore(BigDecimal sustainabilityScore) { this.sustainabilityScore = sustainabilityScore; }

    public BigDecimal getOverallScore() { return overallScore; }
    public void setOverallScore(BigDecimal overallScore) { this.overallScore = overallScore; }

    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }

    public String getWeaknesses() { return weaknesses; }
    public void setWeaknesses(String weaknesses) { this.weaknesses = weaknesses; }

    public String getSuggestions() { return suggestions; }
    public void setSuggestions(String suggestions) { this.suggestions = suggestions; }

    public String getFutureScope() { return futureScope; }
    public void setFutureScope(String futureScope) { this.futureScope = futureScope; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
