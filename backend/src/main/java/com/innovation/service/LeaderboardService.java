package com.innovation.service;

import com.innovation.dto.LeaderboardDTO;
import com.innovation.entity.Idea;
import com.innovation.entity.Leaderboard;
import com.innovation.entity.User;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.IdeaRepository;
import com.innovation.repository.LeaderboardRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;
    private final UserRepository userRepository;
    private final IdeaRepository ideaRepository;

    public LeaderboardService(LeaderboardRepository leaderboardRepository,
                             UserRepository userRepository,
                             IdeaRepository ideaRepository) {
        this.leaderboardRepository = leaderboardRepository;
        this.userRepository = userRepository;
        this.ideaRepository = ideaRepository;
    }

    public List<LeaderboardDTO> getLeaderboard() {
        updateRanks();
        return leaderboardRepository.findAllOrderByScoreDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LeaderboardDTO getUserRanking(Long userId) {
        Leaderboard leaderboard = leaderboardRepository.findByUserId(userId)
                .orElse(createLeaderboardEntry(userId));
        updateRanks();
        leaderboard = leaderboardRepository.findByUserId(userId).orElse(leaderboard);
        return convertToDTO(leaderboard);
    }

    public void updateLeaderboardForIdea(Long ideaId) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", ideaId));

        Leaderboard leaderboard = leaderboardRepository.findByUserId(idea.getUser().getId())
                .orElse(createLeaderboardEntry(idea.getUser().getId()));

        leaderboard.setIdea(idea);
        leaderboard.setTotalScore(idea.getOverallScore() != null ? idea.getOverallScore() : BigDecimal.ZERO);
        leaderboard.setIdeasSubmitted(leaderboard.getIdeasSubmitted() + 1);
        
        if ("SUBMITTED".equals(idea.getStatus()) || "APPROVED".equals(idea.getStatus())) {
            leaderboard.setIdeasApproved(leaderboard.getIdeasApproved() + 1);
        }

        leaderboard.setUpdatedAt(LocalDateTime.now());
        leaderboardRepository.save(leaderboard);
        
        updateRanks();
    }

    private Leaderboard createLeaderboardEntry(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setUser(user);
        leaderboard.setTotalScore(BigDecimal.ZERO);
        leaderboard.setIdeasSubmitted(0);
        leaderboard.setIdeasApproved(0);
        leaderboard.setRank(0);
        
        return leaderboardRepository.save(leaderboard);
    }

    private void updateRanks() {
        List<Leaderboard> entries = leaderboardRepository.findAllOrderByScoreDesc();
        for (int i = 0; i < entries.size(); i++) {
            entries.get(i).setRank(i + 1);
            leaderboardRepository.save(entries.get(i));
        }
    }

    private LeaderboardDTO convertToDTO(Leaderboard leaderboard) {
        LeaderboardDTO dto = new LeaderboardDTO();
        dto.setId(leaderboard.getId());
        dto.setUserId(leaderboard.getUser().getId());
        dto.setUserName(leaderboard.getUser().getFirstName() + " " + leaderboard.getUser().getLastName());
        dto.setUserDepartment(leaderboard.getUser().getDepartment());
        dto.setIdeaId(leaderboard.getIdea() != null ? leaderboard.getIdea().getId() : null);
        dto.setIdeaTitle(leaderboard.getIdea() != null ? leaderboard.getIdea().getTitle() : null);
        dto.setRank(leaderboard.getRank());
        dto.setTotalScore(leaderboard.getTotalScore());
        dto.setIdeasSubmitted(leaderboard.getIdeasSubmitted());
        dto.setIdeasApproved(leaderboard.getIdeasApproved());
        dto.setUpdatedAt(leaderboard.getUpdatedAt());
        return dto;
    }
}
