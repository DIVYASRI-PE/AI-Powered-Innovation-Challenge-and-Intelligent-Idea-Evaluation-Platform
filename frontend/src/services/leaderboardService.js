import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const leaderboardService = {
  getLeaderboard: async () => {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  },

  getMyRanking: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/leaderboard/my-ranking`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default leaderboardService;
