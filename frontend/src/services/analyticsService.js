import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const analyticsService = {
  getPlatformAnalytics: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/analytics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default analyticsService;
