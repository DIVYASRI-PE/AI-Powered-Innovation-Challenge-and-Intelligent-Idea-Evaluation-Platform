package com.innovation.controller;

import com.innovation.dto.AIEvaluationResponse;
import com.innovation.dto.AIImprovementResponse;
import com.innovation.dto.ChatRequest;
import com.innovation.dto.ChatResponse;
import com.innovation.dto.SimilarityResponse;
import com.innovation.entity.AIFeedback;
import com.innovation.entity.ChatHistory;
import com.innovation.security.UserPrincipal;
import com.innovation.service.AIFeedbackService;
import com.innovation.service.AIImprovementService;
import com.innovation.service.ChatbotService;
import com.innovation.service.SimilarityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIFeedbackService aiFeedbackService;
    private final AIImprovementService aiImprovementService;
    private final SimilarityService similarityService;
    private final ChatbotService chatbotService;

    public AIController(AIFeedbackService aiFeedbackService,
                       AIImprovementService aiImprovementService,
                       SimilarityService similarityService,
                       ChatbotService chatbotService) {
        this.aiFeedbackService = aiFeedbackService;
        this.aiImprovementService = aiImprovementService;
        this.similarityService = similarityService;
        this.chatbotService = chatbotService;
    }

    @PostMapping("/evaluate/{ideaId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<AIEvaluationResponse> evaluateIdea(@PathVariable Long ideaId,
                                                              @AuthenticationPrincipal UserPrincipal userPrincipal) {
        AIEvaluationResponse evaluation = aiFeedbackService.evaluateIdea(ideaId);
        return ResponseEntity.ok(evaluation);
    }

    @GetMapping("/feedback/{ideaId}")
    public ResponseEntity<?> getAIFeedback(@PathVariable Long ideaId) {
        AIFeedback feedback = aiFeedbackService.getAIFeedbackByIdeaId(ideaId);
        if (feedback == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(feedback);
    }

    @PostMapping("/improve/{ideaId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<AIImprovementResponse> improveIdea(@PathVariable Long ideaId,
                                                              @AuthenticationPrincipal UserPrincipal userPrincipal) {
        AIImprovementResponse improvements = aiImprovementService.improveIdea(ideaId);
        return ResponseEntity.ok(improvements);
    }

    @PostMapping("/similarity")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY')")
    public ResponseEntity<SimilarityResponse> checkSimilarity(@RequestParam Long ideaId1,
                                                              @RequestParam Long ideaId2) {
        SimilarityResponse similarity = similarityService.checkSimilarity(ideaId1, ideaId2);
        return ResponseEntity.ok(similarity);
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest chatRequest,
                                             @RequestParam(required = false) String sessionId,
                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ChatResponse response = chatbotService.chat(userPrincipal.getId(), chatRequest.getMessage(), sessionId, chatRequest.getContext());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/chat/history")
    public ResponseEntity<List<ChatHistory>> getChatHistory(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ChatHistory> history = chatbotService.getChatHistory(userPrincipal.getId());
        return ResponseEntity.ok(history);
    }
}
