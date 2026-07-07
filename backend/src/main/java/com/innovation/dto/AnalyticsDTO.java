package com.innovation.dto;

import java.util.Map;

public class AnalyticsDTO {
    private Long totalUsers;
    private Long totalIdeas;
    private Long totalChallenges;
    private Long submittedIdeas;
    private Long approvedIdeas;
    private Map<String, Long> ideasByCategory;
    private Map<String, Long> ideasByStatus;
    private Map<String, Long> usersByRole;
    private Double averageScore;

    public AnalyticsDTO() {}

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getTotalIdeas() { return totalIdeas; }
    public void setTotalIdeas(Long totalIdeas) { this.totalIdeas = totalIdeas; }

    public Long getTotalChallenges() { return totalChallenges; }
    public void setTotalChallenges(Long totalChallenges) { this.totalChallenges = totalChallenges; }

    public Long getSubmittedIdeas() { return submittedIdeas; }
    public void setSubmittedIdeas(Long submittedIdeas) { this.submittedIdeas = submittedIdeas; }

    public Long getApprovedIdeas() { return approvedIdeas; }
    public void setApprovedIdeas(Long approvedIdeas) { this.approvedIdeas = approvedIdeas; }

    public Map<String, Long> getIdeasByCategory() { return ideasByCategory; }
    public void setIdeasByCategory(Map<String, Long> ideasByCategory) { this.ideasByCategory = ideasByCategory; }

    public Map<String, Long> getIdeasByStatus() { return ideasByStatus; }
    public void setIdeasByStatus(Map<String, Long> ideasByStatus) { this.ideasByStatus = ideasByStatus; }

    public Map<String, Long> getUsersByRole() { return usersByRole; }
    public void setUsersByRole(Map<String, Long> usersByRole) { this.usersByRole = usersByRole; }

    public Double getAverageScore() { return averageScore; }
    public void setAverageScore(Double averageScore) { this.averageScore = averageScore; }
}
