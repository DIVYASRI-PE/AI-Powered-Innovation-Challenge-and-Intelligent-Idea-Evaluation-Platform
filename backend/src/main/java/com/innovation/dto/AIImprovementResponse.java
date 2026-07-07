package com.innovation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AIImprovementResponse {

    @JsonProperty("better_title")
    private String betterTitle;

    @JsonProperty("better_abstract")
    private String betterAbstract;

    @JsonProperty("better_problem_statement")
    private String betterProblemStatement;

    @JsonProperty("better_solution")
    private String betterSolution;

    @JsonProperty("better_tech_stack")
    private String betterTechStack;

    @JsonProperty("better_features")
    private List<String> betterFeatures;

    @JsonProperty("future_enhancements")
    private List<String> futureEnhancements;

    public AIImprovementResponse() {}

    public String getBetterTitle()                        { return betterTitle; }
    public void setBetterTitle(String v)                  { this.betterTitle = v; }
    public String getBetterAbstract()                     { return betterAbstract; }
    public void setBetterAbstract(String v)               { this.betterAbstract = v; }
    public String getBetterProblemStatement()             { return betterProblemStatement; }
    public void setBetterProblemStatement(String v)       { this.betterProblemStatement = v; }
    public String getBetterSolution()                     { return betterSolution; }
    public void setBetterSolution(String v)               { this.betterSolution = v; }
    public String getBetterTechStack()                    { return betterTechStack; }
    public void setBetterTechStack(String v)              { this.betterTechStack = v; }
    public List<String> getBetterFeatures()               { return betterFeatures; }
    public void setBetterFeatures(List<String> v)         { this.betterFeatures = v; }
    public List<String> getFutureEnhancements()           { return futureEnhancements; }
    public void setFutureEnhancements(List<String> v)     { this.futureEnhancements = v; }
}
