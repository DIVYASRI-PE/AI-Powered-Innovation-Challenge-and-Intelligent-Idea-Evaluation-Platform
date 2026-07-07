import api from './api';

const challengeService = {
  // Challenges
  getAllChallenges:        ()         => api.get('/challenges').then(r => r.data),
  getChallengeById:       (id)       => api.get(`/challenges/${id}`).then(r => r.data),
  getActiveChallenges:    ()         => api.get('/challenges/active').then(r => r.data),
  getChallengesByCategory:(catId)    => api.get(`/challenges/category/${catId}`).then(r => r.data),
  getMyChallenges:        ()         => api.get('/challenges/my-challenges').then(r => r.data),
  createChallenge:        (data)     => api.post('/challenges', data).then(r => r.data),
  updateChallenge:        (id, data) => api.put(`/challenges/${id}`, data).then(r => r.data),
  deleteChallenge:        (id)       => api.delete(`/challenges/${id}`).then(r => r.data),

  // Categories
  getAllCategories:        ()         => api.get('/categories').then(r => r.data),
  getCategoryById:        (id)       => api.get(`/categories/${id}`).then(r => r.data),
  createCategory:         (data)     => api.post('/categories', data).then(r => r.data),
  updateCategory:         (id, data) => api.put(`/categories/${id}`, data).then(r => r.data),
  deleteCategory:         (id)       => api.delete(`/categories/${id}`).then(r => r.data),
};

export default challengeService;
