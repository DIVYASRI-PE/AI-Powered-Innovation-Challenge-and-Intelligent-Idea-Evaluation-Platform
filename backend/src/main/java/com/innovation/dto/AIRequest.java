package com.innovation.dto;

public class AIRequest {
    private String title;
    private String ideaAbstract;
    private String problemStatement;
    private String proposedSolution;
    private String objectives;
    private String technologyStack;
    private String expectedOutcome;
    private String innovationHighlights;
    private String futureScope;

    public AIRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIdeaAbstract() { return ideaAbstract; }
    public void setIdeaAbstract(String ideaAbstract) { this.ideaAbstract = ideaAbstract; }

    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String problemStatement) { this.problemStatement = problemStatement; }

    public String getProposedSolution() { return proposedSolution; }
    public void setProposedSolution(String proposedSolution) { this.proposedSolution = proposedSolution; }

    public String getObjectives() { return objectives; }
    public void setObjectives(String objectives) { this.objectives = objectives; }

    public String getTechnologyStack() { return technologyStack; }
    public void setTechnologyStack(String technologyStack) { this.technologyStack = technologyStack; }

    public String getExpectedOutcome() { return expectedOutcome; }
    public void setExpectedOutcome(String expectedOutcome) { this.expectedOutcome = expectedOutcome; }

    public String getInnovationHighlights() { return innovationHighlights; }
    public void setInnovationHighlights(String innovationHighlights) { this.innovationHighlights = innovationHighlights; }

    public String getFutureScope() { return futureScope; }
    public void setFutureScope(String futureScope) { this.futureScope = futureScope; }
}
