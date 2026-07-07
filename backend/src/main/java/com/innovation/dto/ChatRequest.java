package com.innovation.dto;

import java.util.Map;

public class ChatRequest {
    private String message;
    private Map<String, Object> context;

    public ChatRequest() {}

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Map<String, Object> getContext() { return context; }
    public void setContext(Map<String, Object> context) { this.context = context; }
}
