import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  },

  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default authService;
