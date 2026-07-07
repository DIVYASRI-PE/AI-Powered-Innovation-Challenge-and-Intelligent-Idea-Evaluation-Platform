package com.innovation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class IdeaRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String domain;
    private String ideaAbstract;
    private String problemStatement;
    private String currentExistingSolution;
    private String proposedSolution;
    private String objectives;
    private String technologyStack;
    private String expectedOutcome;
    private String innovationHighlights;
    private String futureScope;
    private String teamMembers;
    private String githubLink;
    private String demoVideoLink;
    private String estimatedBudget;

    @NotNull(message = "Challenge ID is required")
    private Long challengeId;

    private String status = "DRAFT";

    public String getTitle()                         { return title; }
    public void setTitle(String v)                   { this.title = v; }
    public String getDomain()                        { return domain; }
    public void setDomain(String v)                  { this.domain = v; }
    public String getIdeaAbstract()                  { return ideaAbstract; }
    public void setIdeaAbstract(String v)            { this.ideaAbstract = v; }
    public String getProblemStatement()              { return problemStatement; }
    public void setProblemStatement(String v)        { this.problemStatement = v; }
    public String getCurrentExistingSolution()       { return currentExistingSolution; }
    public void setCurrentExistingSolution(String v) { this.currentExistingSolution = v; }
    public String getProposedSolution()              { return proposedSolution; }
    public void setProposedSolution(String v)        { this.proposedSolution = v; }
    public String getObjectives()                    { return objectives; }
    public void setObjectives(String v)              { this.objectives = v; }
    public String getTechnologyStack()               { return technologyStack; }
    public void setTechnologyStack(String v)         { this.technologyStack = v; }
    public String getExpectedOutcome()               { return expectedOutcome; }
    public void setExpectedOutcome(String v)         { this.expectedOutcome = v; }
    public String getInnovationHighlights()          { return innovationHighlights; }
    public void setInnovationHighlights(String v)    { this.innovationHighlights = v; }
    public String getFutureScope()                   { return futureScope; }
    public void setFutureScope(String v)             { this.futureScope = v; }
    public String getTeamMembers()                   { return teamMembers; }
    public void setTeamMembers(String v)             { this.teamMembers = v; }
    public String getGithubLink()                    { return githubLink; }
    public void setGithubLink(String v)              { this.githubLink = v; }
    public String getDemoVideoLink()                 { return demoVideoLink; }
    public void setDemoVideoLink(String v)           { this.demoVideoLink = v; }
    public String getEstimatedBudget()               { return estimatedBudget; }
    public void setEstimatedBudget(String v)         { this.estimatedBudget = v; }
    public Long getChallengeId()                     { return challengeId; }
    public void setChallengeId(Long v)               { this.challengeId = v; }
    public String getStatus()                        { return status; }
    public void setStatus(String v)                  { this.status = v; }
}
