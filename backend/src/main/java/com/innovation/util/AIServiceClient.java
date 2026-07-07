package com.innovation.util;

import com.innovation.dto.AIEvaluationResponse;
import com.innovation.dto.AIImprovementResponse;
import com.innovation.dto.AIRequest;
import com.innovation.dto.ChatRequest;
import com.innovation.dto.ChatResponse;
import com.innovation.dto.SimilarityRequest;
import com.innovation.dto.SimilarityResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AIServiceClient {

    @Value("${ai.agent.url:http://localhost:3001}")
    private String aiAgentUrl;

    private final RestTemplate restTemplate;

    public AIServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public AIEvaluationResponse evaluateIdea(AIRequest aiRequest) {
        try {
            String url = aiAgentUrl + "/api/ai/evaluate";
            return restTemplate.postForObject(url, aiRequest, AIEvaluationResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get AI evaluation: " + e.getMessage());
        }
    }

    public AIImprovementResponse improveIdea(AIRequest aiRequest) {
        try {
            String url = aiAgentUrl + "/api/ai/improve";
            return restTemplate.postForObject(url, aiRequest, AIImprovementResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get AI improvement: " + e.getMessage());
        }
    }

    public SimilarityResponse checkSimilarity(SimilarityRequest similarityRequest) {
        try {
            String url = aiAgentUrl + "/api/ai/similarity";
            return restTemplate.postForObject(url, similarityRequest, SimilarityResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to check similarity: " + e.getMessage());
        }
    }

    public ChatResponse chat(ChatRequest chatRequest) {
        try {
            String url = aiAgentUrl + "/api/ai/chatbot";
            return restTemplate.postForObject(url, chatRequest, ChatResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get chat response: " + e.getMessage());
        }
    }
}
