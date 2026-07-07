package com.innovation.service;

import com.innovation.dto.AIRequest;
import com.innovation.dto.AIEvaluationResponse;
import com.innovation.entity.AIFeedback;
import com.innovation.entity.Idea;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.AIFeedbackRepository;
import com.innovation.repository.IdeaRepository;
import com.innovation.util.AIServiceClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@Transactional
public class AIFeedbackService {

    private final AIFeedbackRepository aiFeedbackRepository;
    private final IdeaRepository ideaRepository;
    private final AIServiceClient aiServiceClient;

    public AIFeedbackService(AIFeedbackRepository aiFeedbackRepository,
                           IdeaRepository ideaRepository,
                           AIServiceClient aiServiceClient) {
        this.aiFeedbackRepository = aiFeedbackRepository;
        this.ideaRepository = ideaRepository;
        this.aiServiceClient = aiServiceClient;
    }

    public AIEvaluationResponse evaluateIdea(Long ideaId) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", ideaId));

        AIRequest aiRequest = convertToAIRequest(idea);
        AIEvaluationResponse evaluation = aiServiceClient.evaluateIdea(aiRequest);

        saveAIFeedback(idea, evaluation);
        updateIdeaScore(idea, evaluation.getOverallScore());

        return evaluation;
    }

    public AIFeedback getAIFeedbackByIdeaId(Long ideaId) {
        return aiFeedbackRepository.findByIdeaId(ideaId).orElse(null);
    }

    private void saveAIFeedback(Idea idea, AIEvaluationResponse evaluation) {
        // Delete existing feedback for this idea before saving new one
        try {
            aiFeedbackRepository.deleteByIdeaId(idea.getId());
        } catch (Exception ignored) {}

        AIFeedback feedback = new AIFeedback();
        feedback.setIdea(idea);
        feedback.setOriginalityScore(evaluation.getOriginalityScore());
        feedback.setInnovationScore(evaluation.getInnovationScore());
        feedback.setTechnicalFeasibilityScore(evaluation.getTechnicalFeasibilityScore());
        feedback.setTechnicalComplexityScore(evaluation.getTechnicalComplexityScore());
        feedback.setMarketPotentialScore(evaluation.getMarketPotentialScore());
        feedback.setScalabilityScore(evaluation.getScalabilityScore());
        feedback.setSocialImpactScore(evaluation.getSocialImpactScore());
        feedback.setSustainabilityScore(evaluation.getSustainabilityScore());
        feedback.setOverallScore(evaluation.getOverallScore());
        feedback.setStrengths(String.join(", ", evaluation.getStrengths()));
        feedback.setWeaknesses(String.join(", ", evaluation.getWeaknesses()));
        feedback.setSuggestions(String.join(", ", evaluation.getSuggestions()));
        feedback.setFutureScope(evaluation.getFutureScope());

        aiFeedbackRepository.save(feedback);
    }

    private void updateIdeaScore(Idea idea, BigDecimal score) {
        idea.setOverallScore(score);
        ideaRepository.save(idea);
    }

    private AIRequest convertToAIRequest(Idea idea) {
        AIRequest request = new AIRequest();
        request.setTitle(idea.getTitle());
        request.setIdeaAbstract(idea.getIdeaAbstract());
        request.setProblemStatement(idea.getProblemStatement());
        request.setProposedSolution(idea.getProposedSolution());
        request.setObjectives(idea.getObjectives());
        request.setTechnologyStack(idea.getTechnologyStack());
        request.setExpectedOutcome(idea.getExpectedOutcome());
        request.setInnovationHighlights(idea.getInnovationHighlights());
        request.setFutureScope(idea.getFutureScope());
        return request;
    }
}
