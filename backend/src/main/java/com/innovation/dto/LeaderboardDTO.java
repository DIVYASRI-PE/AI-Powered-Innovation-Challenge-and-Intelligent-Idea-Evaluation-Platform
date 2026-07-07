package com.innovation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LeaderboardDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userDepartment;
    private Long ideaId;
    private String ideaTitle;
    private Integer rank;
    private BigDecimal totalScore;
    private Integer ideasSubmitted;
    private Integer ideasApproved;
    private LocalDateTime updatedAt;

    public LeaderboardDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserDepartment() { return userDepartment; }
    public void setUserDepartment(String userDepartment) { this.userDepartment = userDepartment; }

    public Long getIdeaId() { return ideaId; }
    public void setIdeaId(Long ideaId) { this.ideaId = ideaId; }

    public String getIdeaTitle() { return ideaTitle; }
    public void setIdeaTitle(String ideaTitle) { this.ideaTitle = ideaTitle; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public BigDecimal getTotalScore() { return totalScore; }
    public void setTotalScore(BigDecimal totalScore) { this.totalScore = totalScore; }

    public Integer getIdeasSubmitted() { return ideasSubmitted; }
    public void setIdeasSubmitted(Integer ideasSubmitted) { this.ideasSubmitted = ideasSubmitted; }

    public Integer getIdeasApproved() { return ideasApproved; }
    public void setIdeasApproved(Integer ideasApproved) { this.ideasApproved = ideasApproved; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
