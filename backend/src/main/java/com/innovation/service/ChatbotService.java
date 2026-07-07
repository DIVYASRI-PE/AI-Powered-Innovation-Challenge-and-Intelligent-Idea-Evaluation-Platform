package com.innovation.service;

import com.innovation.dto.ChatRequest;
import com.innovation.dto.ChatResponse;
import com.innovation.entity.ChatHistory;
import com.innovation.entity.User;
import com.innovation.repository.ChatHistoryRepository;
import com.innovation.repository.UserRepository;
import com.innovation.util.AIServiceClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class ChatbotService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;
    private final AIServiceClient aiServiceClient;

    public ChatbotService(ChatHistoryRepository chatHistoryRepository,
                         UserRepository userRepository,
                         AIServiceClient aiServiceClient) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
    }

    public ChatResponse chat(Long userId, String message, String sessionId, Map<String, Object> context) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChatRequest chatRequest = new ChatRequest();
        chatRequest.setMessage(message);
        
        Map<String, Object> fullContext = new HashMap<>();
        fullContext.put("userRole", user.getRole());
        if (context != null) {
            fullContext.putAll(context);
        }
        chatRequest.setContext(fullContext);

        ChatResponse response = aiServiceClient.chat(chatRequest);

        ChatHistory chatHistory = new ChatHistory();
        chatHistory.setUser(user);
        chatHistory.setMessage(message);
        chatHistory.setResponse(response.getResponse());
        chatHistory.setSessionId(sessionId != null ? sessionId : UUID.randomUUID().toString());

        chatHistoryRepository.save(chatHistory);

        return response;
    }

    public java.util.List<ChatHistory> getChatHistory(Long userId) {
        return chatHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public java.util.List<ChatHistory> getChatHistoryBySession(Long userId, String sessionId) {
        return chatHistoryRepository.findByUserIdAndSessionIdOrderByCreatedAtAsc(userId, sessionId);
    }
}
