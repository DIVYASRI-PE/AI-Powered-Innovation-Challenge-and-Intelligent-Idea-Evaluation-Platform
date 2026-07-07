package com.innovation.service;

import com.innovation.dto.AIImprovementResponse;
import com.innovation.dto.AIRequest;
import com.innovation.entity.Idea;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.IdeaRepository;
import com.innovation.util.AIServiceClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AIImprovementService {

    private final IdeaRepository ideaRepository;
    private final AIServiceClient aiServiceClient;

    public AIImprovementService(IdeaRepository ideaRepository,
                               AIServiceClient aiServiceClient) {
        this.ideaRepository = ideaRepository;
        this.aiServiceClient = aiServiceClient;
    }

    public AIImprovementResponse improveIdea(Long ideaId) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", ideaId));

        AIRequest aiRequest = convertToAIRequest(idea);
        return aiServiceClient.improveIdea(aiRequest);
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
