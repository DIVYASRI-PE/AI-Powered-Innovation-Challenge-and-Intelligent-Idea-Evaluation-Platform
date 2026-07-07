package com.innovation.dto;

import java.util.List;

public class SimilarityResponse {
    private Double similarityPercentage;
    private Boolean isDuplicate;
    private String semanticSimilarity;
    private String technicalSimilarity;
    private String marketOverlap;
    private List<String> relatedAspects;
    private List<String> uniqueAspectsIdea1;
    private List<String> uniqueAspectsIdea2;

    public SimilarityResponse() {}

    public Double getSimilarityPercentage() { return similarityPercentage; }
    public void setSimilarityPercentage(Double similarityPercentage) { this.similarityPercentage = similarityPercentage; }

    public Boolean getIsDuplicate() { return isDuplicate; }
    public void setIsDuplicate(Boolean isDuplicate) { this.isDuplicate = isDuplicate; }

    public String getSemanticSimilarity() { return semanticSimilarity; }
    public void setSemanticSimilarity(String semanticSimilarity) { this.semanticSimilarity = semanticSimilarity; }

    public String getTechnicalSimilarity() { return technicalSimilarity; }
    public void setTechnicalSimilarity(String technicalSimilarity) { this.technicalSimilarity = technicalSimilarity; }

    public String getMarketOverlap() { return marketOverlap; }
    public void setMarketOverlap(String marketOverlap) { this.marketOverlap = marketOverlap; }

    public List<String> getRelatedAspects() { return relatedAspects; }
    public void setRelatedAspects(List<String> relatedAspects) { this.relatedAspects = relatedAspects; }

    public List<String> getUniqueAspectsIdea1() { return uniqueAspectsIdea1; }
    public void setUniqueAspectsIdea1(List<String> uniqueAspectsIdea1) { this.uniqueAspectsIdea1 = uniqueAspectsIdea1; }

    public List<String> getUniqueAspectsIdea2() { return uniqueAspectsIdea2; }
    public void setUniqueAspectsIdea2(List<String> uniqueAspectsIdea2) { this.uniqueAspectsIdea2 = uniqueAspectsIdea2; }
}
