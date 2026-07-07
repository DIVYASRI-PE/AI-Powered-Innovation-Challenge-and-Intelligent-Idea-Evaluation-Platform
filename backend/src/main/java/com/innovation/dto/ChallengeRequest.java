package com.innovation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ChallengeRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private String rules;
    private LocalDateTime deadline;
    private String prizeDetails;
    private String status = "DRAFT";

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public String getRules() { return rules; }
    public void setRules(String rules) { this.rules = rules; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public String getPrizeDetails() { return prizeDetails; }
    public void setPrizeDetails(String prizeDetails) { this.prizeDetails = prizeDetails; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
