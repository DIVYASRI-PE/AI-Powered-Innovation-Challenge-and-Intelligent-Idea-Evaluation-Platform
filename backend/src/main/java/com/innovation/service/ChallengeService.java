package com.innovation.service;

import com.innovation.dto.ChallengeDTO;
import com.innovation.dto.ChallengeRequest;
import com.innovation.entity.Category;
import com.innovation.entity.Challenge;
import com.innovation.entity.User;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.CategoryRepository;
import com.innovation.repository.ChallengeRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ChallengeService(ChallengeRepository challengeRepository,
                           CategoryRepository categoryRepository,
                           UserRepository userRepository) {
        this.challengeRepository = challengeRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public ChallengeDTO createChallenge(ChallengeRequest challengeRequest, Long userId) {
        Category category = categoryRepository.findById(challengeRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", challengeRequest.getCategoryId()));

        User createdBy = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Challenge challenge = new Challenge();
        challenge.setTitle(challengeRequest.getTitle());
        challenge.setDescription(challengeRequest.getDescription());
        challenge.setCategory(category);
        challenge.setRules(challengeRequest.getRules());
        challenge.setDeadline(challengeRequest.getDeadline());
        challenge.setPrizeDetails(challengeRequest.getPrizeDetails());
        challenge.setStatus(challengeRequest.getStatus());
        challenge.setCreatedBy(createdBy);

        Challenge savedChallenge = challengeRepository.save(challenge);
        return convertToDTO(savedChallenge);
    }

    public ChallengeDTO getChallengeById(Long id) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge", "id", id));
        return convertToDTO(challenge);
    }

    public List<ChallengeDTO> getAllChallenges() {
        return challengeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ChallengeDTO> getChallengesByStatus(String status) {
        return challengeRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ChallengeDTO> getActiveChallenges() {
        // Return all PUBLISHED challenges (no deadline filter — some may not have deadlines)
        List<ChallengeDTO> published = challengeRepository.findByStatus("PUBLISHED").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        // Fallback: if no published, return all challenges
        if (published.isEmpty()) {
            return getAllChallenges();
        }
        return published;
    }

    public List<ChallengeDTO> getChallengesByCategory(Long categoryId) {
        return challengeRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ChallengeDTO> getChallengesByUser(Long userId) {
        return challengeRepository.findByCreatedBy(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ChallengeDTO updateChallenge(Long id, ChallengeRequest challengeRequest) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge", "id", id));

        Category category = categoryRepository.findById(challengeRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", challengeRequest.getCategoryId()));

        challenge.setTitle(challengeRequest.getTitle());
        challenge.setDescription(challengeRequest.getDescription());
        challenge.setCategory(category);
        challenge.setRules(challengeRequest.getRules());
        challenge.setDeadline(challengeRequest.getDeadline());
        challenge.setPrizeDetails(challengeRequest.getPrizeDetails());
        challenge.setStatus(challengeRequest.getStatus());

        Challenge updatedChallenge = challengeRepository.save(challenge);
        return convertToDTO(updatedChallenge);
    }

    public void deleteChallenge(Long id) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge", "id", id));
        challengeRepository.delete(challenge);
    }

    private ChallengeDTO convertToDTO(Challenge challenge) {
        ChallengeDTO dto = new ChallengeDTO();
        dto.setId(challenge.getId());
        dto.setTitle(challenge.getTitle());
        dto.setDescription(challenge.getDescription());
        dto.setCategoryId(challenge.getCategory() != null ? challenge.getCategory().getId() : null);
        dto.setCategoryName(challenge.getCategory() != null ? challenge.getCategory().getName() : null);
        dto.setRules(challenge.getRules());
        dto.setDeadline(challenge.getDeadline());
        dto.setPrizeDetails(challenge.getPrizeDetails());
        dto.setStatus(challenge.getStatus());
        dto.setCreatedBy(challenge.getCreatedBy() != null ? challenge.getCreatedBy().getId() : null);
        dto.setCreatedByName(challenge.getCreatedBy() != null ? 
            challenge.getCreatedBy().getFirstName() + " " + challenge.getCreatedBy().getLastName() : null);
        dto.setCreatedAt(challenge.getCreatedAt());
        dto.setUpdatedAt(challenge.getUpdatedAt());
        return dto;
    }
}
