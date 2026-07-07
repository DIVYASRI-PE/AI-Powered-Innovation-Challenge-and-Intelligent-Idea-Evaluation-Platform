package com.innovation.service;

import com.innovation.dto.AnalyticsDTO;
import com.innovation.repository.ChallengeRepository;
import com.innovation.repository.IdeaRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnalyticsService {

    private final UserRepository userRepository;
    private final IdeaRepository ideaRepository;
    private final ChallengeRepository challengeRepository;

    public AnalyticsService(UserRepository userRepository,
                           IdeaRepository ideaRepository,
                           ChallengeRepository challengeRepository) {
        this.userRepository = userRepository;
        this.ideaRepository = ideaRepository;
        this.challengeRepository = challengeRepository;
    }

    public AnalyticsDTO getPlatformAnalytics() {
        AnalyticsDTO analytics = new AnalyticsDTO();
        
        analytics.setTotalUsers(userRepository.count());
        analytics.setTotalIdeas(ideaRepository.count());
        analytics.setTotalChallenges(challengeRepository.count());
        analytics.setSubmittedIdeas((long) ideaRepository.findByStatus("SUBMITTED").size());
        analytics.setApprovedIdeas((long) ideaRepository.findByStatus("APPROVED").size());
        
        analytics.setIdeasByCategory(getIdeasByCategory());
        analytics.setIdeasByStatus(getIdeasByStatus());
        analytics.setUsersByRole(getUsersByRole());
        analytics.setAverageScore(calculateAverageScore());
        
        return analytics;
    }

    private Map<String, Long> getIdeasByCategory() {
        List<Object[]> results = ideaRepository.findIdeasByCategory();
        return results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    private Map<String, Long> getIdeasByStatus() {
        List<Object[]> results = ideaRepository.findIdeasByStatusGrouped();
        return results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    private Map<String, Long> getUsersByRole() {
        List<Object[]> results = userRepository.findUsersByRole();
        return results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    private Double calculateAverageScore() {
        List<BigDecimal> scores = ideaRepository.findAll().stream()
                .filter(idea -> idea.getOverallScore() != null)
                .map(idea -> idea.getOverallScore())
                .collect(Collectors.toList());
        
        if (scores.isEmpty()) return 0.0;
        
        double sum = scores.stream().mapToDouble(BigDecimal::doubleValue).sum();
        return sum / scores.size();
    }
}
