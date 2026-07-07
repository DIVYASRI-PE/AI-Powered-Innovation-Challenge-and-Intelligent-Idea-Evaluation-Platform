import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch (_) {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If 401 — clear session and go to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
