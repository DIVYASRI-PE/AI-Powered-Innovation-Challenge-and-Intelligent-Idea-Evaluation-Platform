import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const notificationService = {
  getUserNotifications: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUnreadNotifications: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/notifications/unread`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUnreadCount: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.get(`${API_BASE_URL}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  markAllAsRead: async () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const response = await axios.put(`${API_BASE_URL}/notifications/mark-all-read`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default notificationService;
