import axios from 'axios';
import api from './api';

const AI_AGENT_URL = import.meta.env.VITE_AI_AGENT_URL || 'http://localhost:3001';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const aiService = {
  evaluateIdea: (ideaId) =>
    api.post(`/ai/evaluate/${ideaId}`).then(r => r.data),

  getAIFeedback: (ideaId) =>
    api.get(`/ai/feedback/${ideaId}`).then(r => r.data),

  improveIdea: (ideaId) =>
    api.post(`/ai/improve/${ideaId}`).then(r => r.data),

  checkSimilarity: (ideaId1, ideaId2) =>
    api.post(`/ai/similarity`, null, { params: { ideaId1, ideaId2 } }).then(r => r.data),

  chat: async (message, sessionId = null, context = {}) => {
    try {
      const response = await axios.post(`${AI_AGENT_URL}/api/ai/chatbot`, {
        message,
        context,
      });
      return response.data;
    } catch (e) {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      const response = await axios.post(`${API_BASE_URL}/ai/chat`, { message, context }, {
        params: sessionId ? { sessionId } : {},
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  },

  getChatHistory: () =>
    api.get('/ai/chat/history').then(r => r.data),
};

export default aiService;
