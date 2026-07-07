import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const aiService = {
  evaluateIdea: async (ideaId) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.post(`${API_BASE_URL}/ai/evaluate/${ideaId}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAIFeedback: async (ideaId) => {
    const response = await axios.get(`${API_BASE_URL}/ai/feedback/${ideaId}`);
    return response.data;
  },

  improveIdea: async (ideaId) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.post(`${API_BASE_URL}/ai/improve/${ideaId}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  checkSimilarity: async (ideaId1, ideaId2) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.post(`${API_BASE_URL}/ai/similarity`, null, {
      params: { ideaId1, ideaId2 },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  chat: async (message, sessionId = null, context = {}) => {
    // Call AI agent directly — faster and no auth issues
    try {
      const response = await axios.post('http://localhost:3001/api/ai/chatbot', {
        message,
        context,
      });
      return response.data;
    } catch (e) {
      // fallback to backend if agent is down
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      const response = await axios.post(`${API_BASE_URL}/ai/chat`, { message, context }, {
        params: sessionId ? { sessionId } : {},
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  },

  getChatHistory: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/ai/chat/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default aiService;
