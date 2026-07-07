package com.innovation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;

public class AIEvaluationResponse {

    @JsonProperty("originality_score")
    private BigDecimal originalityScore;

    @JsonProperty("innovation_score")
    private BigDecimal innovationScore;

    @JsonProperty("technical_feasibility_score")
    private BigDecimal technicalFeasibilityScore;

    @JsonProperty("technical_complexity_score")
    private BigDecimal technicalComplexityScore;

    @JsonProperty("market_potential_score")
    private BigDecimal marketPotentialScore;

    @JsonProperty("scalability_score")
    private BigDecimal scalabilityScore;

    @JsonProperty("social_impact_score")
    private BigDecimal socialImpactScore;

    @JsonProperty("sustainability_score")
    private BigDecimal sustainabilityScore;

    @JsonProperty("overall_score")
    private BigDecimal overallScore;

    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;

    @JsonProperty("future_scope")
    private String futureScope;

    public AIEvaluationResponse() {}

    public BigDecimal getOriginalityScore()             { return originalityScore; }
    public void setOriginalityScore(BigDecimal v)       { this.originalityScore = v; }
    public BigDecimal getInnovationScore()              { return innovationScore; }
    public void setInnovationScore(BigDecimal v)        { this.innovationScore = v; }
    public BigDecimal getTechnicalFeasibilityScore()    { return technicalFeasibilityScore; }
    public void setTechnicalFeasibilityScore(BigDecimal v){ this.technicalFeasibilityScore = v; }
    public BigDecimal getTechnicalComplexityScore()     { return technicalComplexityScore; }
    public void setTechnicalComplexityScore(BigDecimal v){ this.technicalComplexityScore = v; }
    public BigDecimal getMarketPotentialScore()         { return marketPotentialScore; }
    public void setMarketPotentialScore(BigDecimal v)   { this.marketPotentialScore = v; }
    public BigDecimal getScalabilityScore()             { return scalabilityScore; }
    public void setScalabilityScore(BigDecimal v)       { this.scalabilityScore = v; }
    public BigDecimal getSocialImpactScore()            { return socialImpactScore; }
    public void setSocialImpactScore(BigDecimal v)      { this.socialImpactScore = v; }
    public BigDecimal getSustainabilityScore()          { return sustainabilityScore; }
    public void setSustainabilityScore(BigDecimal v)    { this.sustainabilityScore = v; }
    public BigDecimal getOverallScore()                 { return overallScore; }
    public void setOverallScore(BigDecimal v)           { this.overallScore = v; }
    public List<String> getStrengths()                  { return strengths; }
    public void setStrengths(List<String> v)            { this.strengths = v; }
    public List<String> getWeaknesses()                 { return weaknesses; }
    public void setWeaknesses(List<String> v)           { this.weaknesses = v; }
    public List<String> getSuggestions()                { return suggestions; }
    public void setSuggestions(List<String> v)          { this.suggestions = v; }
    public String getFutureScope()                      { return futureScope; }
    public void setFutureScope(String v)                { this.futureScope = v; }
}
