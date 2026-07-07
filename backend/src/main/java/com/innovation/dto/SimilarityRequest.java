package com.innovation.dto;

public class SimilarityRequest {
    private AIRequest idea1;
    private AIRequest idea2;

    public SimilarityRequest() {}

    public AIRequest getIdea1() { return idea1; }
    public void setIdea1(AIRequest idea1) { this.idea1 = idea1; }

    public AIRequest getIdea2() { return idea2; }
    public void setIdea2(AIRequest idea2) { this.idea2 = idea2; }
}
