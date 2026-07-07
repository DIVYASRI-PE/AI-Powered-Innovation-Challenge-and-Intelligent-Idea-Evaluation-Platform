package com.innovation.service;

import com.innovation.dto.IdeaDTO;
import com.innovation.dto.IdeaRequest;
import com.innovation.entity.Challenge;
import com.innovation.entity.Idea;
import com.innovation.entity.User;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.ChallengeRepository;
import com.innovation.repository.IdeaRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    public IdeaService(IdeaRepository ideaRepository,
                       UserRepository userRepository,
                       ChallengeRepository challengeRepository) {
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.challengeRepository = challengeRepository;
    }

    public IdeaDTO createIdea(IdeaRequest ideaRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Challenge challenge = challengeRepository.findById(ideaRequest.getChallengeId())
                .orElseThrow(() -> new ResourceNotFoundException("Challenge", "id", ideaRequest.getChallengeId()));

        Idea idea = new Idea();
        idea.setUser(user);
        idea.setChallenge(challenge);
        idea.setTitle(ideaRequest.getTitle());
        idea.setDomain(ideaRequest.getDomain());
        idea.setIdeaAbstract(ideaRequest.getIdeaAbstract());
        idea.setProblemStatement(ideaRequest.getProblemStatement());
        idea.setCurrentExistingSolution(ideaRequest.getCurrentExistingSolution());
        idea.setProposedSolution(ideaRequest.getProposedSolution());
        idea.setObjectives(ideaRequest.getObjectives());
        idea.setTechnologyStack(ideaRequest.getTechnologyStack());
        idea.setExpectedOutcome(ideaRequest.getExpectedOutcome());
        idea.setInnovationHighlights(ideaRequest.getInnovationHighlights());
        idea.setFutureScope(ideaRequest.getFutureScope());
        idea.setTeamMembers(ideaRequest.getTeamMembers());
        idea.setGithubLink(ideaRequest.getGithubLink());
        idea.setDemoVideoLink(ideaRequest.getDemoVideoLink());
        idea.setEstimatedBudget(ideaRequest.getEstimatedBudget());
        idea.setStatus(ideaRequest.getStatus());

        Idea savedIdea = ideaRepository.save(idea);
        return convertToDTO(savedIdea);
    }

    public IdeaDTO getIdeaById(Long id) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", id));
        return convertToDTO(idea);
    }

    public List<IdeaDTO> getAllIdeas() {
        return ideaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<IdeaDTO> getIdeasByUser(Long userId) {
        return ideaRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<IdeaDTO> getIdeasByChallenge(Long challengeId) {
        return ideaRepository.findByChallengeId(challengeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<IdeaDTO> getIdeasByStatus(String status) {
        return ideaRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<IdeaDTO> getTopIdeas() {
        return ideaRepository.findTopIdeasByScore("SUBMITTED").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public IdeaDTO updateIdea(Long id, IdeaRequest ideaRequest, Long userId) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", id));

        if (!idea.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this idea");
        }

        Challenge challenge = challengeRepository.findById(ideaRequest.getChallengeId())
                .orElseThrow(() -> new ResourceNotFoundException("Challenge", "id", ideaRequest.getChallengeId()));

        idea.setTitle(ideaRequest.getTitle());
        idea.setDomain(ideaRequest.getDomain());
        idea.setIdeaAbstract(ideaRequest.getIdeaAbstract());
        idea.setProblemStatement(ideaRequest.getProblemStatement());
        idea.setCurrentExistingSolution(ideaRequest.getCurrentExistingSolution());
        idea.setProposedSolution(ideaRequest.getProposedSolution());
        idea.setObjectives(ideaRequest.getObjectives());
        idea.setTechnologyStack(ideaRequest.getTechnologyStack());
        idea.setExpectedOutcome(ideaRequest.getExpectedOutcome());
        idea.setInnovationHighlights(ideaRequest.getInnovationHighlights());
        idea.setFutureScope(ideaRequest.getFutureScope());
        idea.setTeamMembers(ideaRequest.getTeamMembers());
        idea.setGithubLink(ideaRequest.getGithubLink());
        idea.setDemoVideoLink(ideaRequest.getDemoVideoLink());
        idea.setEstimatedBudget(ideaRequest.getEstimatedBudget());
        idea.setChallenge(challenge);
        idea.setStatus(ideaRequest.getStatus());

        Idea updatedIdea = ideaRepository.save(idea);
        return convertToDTO(updatedIdea);
    }

    public IdeaDTO updateIdeaStatus(Long id, String status) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", id));
        idea.setStatus(status);
        Idea updatedIdea = ideaRepository.save(idea);
        return convertToDTO(updatedIdea);
    }

    public IdeaDTO updateIdeaScore(Long id, BigDecimal score) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", id));
        idea.setOverallScore(score);
        Idea updatedIdea = ideaRepository.save(idea);
        return convertToDTO(updatedIdea);
    }

    public void deleteIdea(Long id, Long userId) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", id));

        if (!idea.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this idea");
        }

        ideaRepository.delete(idea);
    }

    private IdeaDTO convertToDTO(Idea idea) {
        IdeaDTO dto = new IdeaDTO();
        dto.setId(idea.getId());
        dto.setUserId(idea.getUser().getId());
        dto.setUserName(idea.getUser().getFirstName() + " " + idea.getUser().getLastName());
        dto.setUserDepartment(idea.getUser().getDepartment());
        dto.setUserRegisterNumber(idea.getUser().getRegisterNumber());
        dto.setChallengeId(idea.getChallenge() != null ? idea.getChallenge().getId() : null);
        dto.setChallengeTitle(idea.getChallenge() != null ? idea.getChallenge().getTitle() : null);
        dto.setTitle(idea.getTitle());
        dto.setDomain(idea.getDomain());
        dto.setIdeaAbstract(idea.getIdeaAbstract());
        dto.setProblemStatement(idea.getProblemStatement());
        dto.setCurrentExistingSolution(idea.getCurrentExistingSolution());
        dto.setProposedSolution(idea.getProposedSolution());
        dto.setObjectives(idea.getObjectives());
        dto.setTechnologyStack(idea.getTechnologyStack());
        dto.setExpectedOutcome(idea.getExpectedOutcome());
        dto.setInnovationHighlights(idea.getInnovationHighlights());
        dto.setFutureScope(idea.getFutureScope());
        dto.setTeamMembers(idea.getTeamMembers());
        dto.setGithubLink(idea.getGithubLink());
        dto.setDemoVideoLink(idea.getDemoVideoLink());
        dto.setEstimatedBudget(idea.getEstimatedBudget());
        dto.setStatus(idea.getStatus());
        dto.setOverallScore(idea.getOverallScore());
        dto.setCreatedAt(idea.getCreatedAt());
        dto.setUpdatedAt(idea.getUpdatedAt());
        return dto;
    }
}
