package com.innovation.service;

import com.innovation.dto.AIRequest;
import com.innovation.dto.SimilarityRequest;
import com.innovation.dto.SimilarityResponse;
import com.innovation.entity.Idea;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.IdeaRepository;
import com.innovation.util.AIServiceClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SimilarityService {

    private final IdeaRepository ideaRepository;
    private final AIServiceClient aiServiceClient;

    public SimilarityService(IdeaRepository ideaRepository,
                           AIServiceClient aiServiceClient) {
        this.ideaRepository = ideaRepository;
        this.aiServiceClient = aiServiceClient;
    }

    public SimilarityResponse checkSimilarity(Long ideaId1, Long ideaId2) {
        Idea idea1 = ideaRepository.findById(ideaId1)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", ideaId1));

        Idea idea2 = ideaRepository.findById(ideaId2)
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", ideaId2));

        SimilarityRequest request = new SimilarityRequest();
        request.setIdea1(convertToAIRequest(idea1));
        request.setIdea2(convertToAIRequest(idea2));

        return aiServiceClient.checkSimilarity(request);
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
