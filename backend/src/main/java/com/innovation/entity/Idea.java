package com.innovation.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ideas")
public class Idea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Column(nullable = false)
    private String title;

    private String domain;

    @Column(name = "idea_abstract", columnDefinition = "TEXT")
    private String ideaAbstract;

    @Column(columnDefinition = "TEXT")
    private String problemStatement;

    @Column(name = "current_existing_solution", columnDefinition = "TEXT")
    private String currentExistingSolution;

    @Column(columnDefinition = "TEXT")
    private String proposedSolution;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    @Column(name = "technology_stack", columnDefinition = "TEXT")
    private String technologyStack;

    @Column(name = "expected_outcome", columnDefinition = "TEXT")
    private String expectedOutcome;

    @Column(name = "innovation_highlights", columnDefinition = "TEXT")
    private String innovationHighlights;

    @Column(name = "future_scope", columnDefinition = "TEXT")
    private String futureScope;

    @Column(name = "team_members", columnDefinition = "TEXT")
    private String teamMembers;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "demo_video_link")
    private String demoVideoLink;

    @Column(name = "estimated_budget")
    private String estimatedBudget;

    @Column(nullable = false)
    private String status = "DRAFT";

    @Column(name = "overall_score", precision = 5, scale = 2)
    private BigDecimal overallScore;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Idea() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId()                              { return id; }
    public void setId(Long id)                       { this.id = id; }
    public User getUser()                            { return user; }
    public void setUser(User user)                   { this.user = user; }
    public Challenge getChallenge()                  { return challenge; }
    public void setChallenge(Challenge challenge)    { this.challenge = challenge; }
    public String getTitle()                         { return title; }
    public void setTitle(String title)               { this.title = title; }
    public String getDomain()                        { return domain; }
    public void setDomain(String domain)             { this.domain = domain; }
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
    public String getStatus()                        { return status; }
    public void setStatus(String status)             { this.status = status; }
    public BigDecimal getOverallScore()              { return overallScore; }
    public void setOverallScore(BigDecimal v)        { this.overallScore = v; }
    public LocalDateTime getCreatedAt()              { return createdAt; }
    public void setCreatedAt(LocalDateTime v)        { this.createdAt = v; }
    public LocalDateTime getUpdatedAt()              { return updatedAt; }
    public void setUpdatedAt(LocalDateTime v)        { this.updatedAt = v; }
}
