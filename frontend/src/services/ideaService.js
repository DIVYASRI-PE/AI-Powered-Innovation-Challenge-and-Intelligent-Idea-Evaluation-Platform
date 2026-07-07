import api from './api';

const ideaService = {
  getAllIdeas:       ()         => api.get('/ideas').then(r => r.data),
  getIdeaById:      (id)       => api.get(`/ideas/${id}`).then(r => r.data),
  getMyIdeas:       ()         => api.get('/ideas/my-ideas').then(r => r.data),
  getIdeasByStatus: (status)   => api.get(`/ideas/status/${status}`).then(r => r.data),
  getTopIdeas:      ()         => api.get('/ideas/top').then(r => r.data),
  createIdea:       (data)     => api.post('/ideas', data).then(r => r.data),
  updateIdea:       (id, data) => api.put(`/ideas/${id}`, data).then(r => r.data),
  updateIdeaStatus: (id, status) =>
    api.put(`/ideas/${id}/status`, null, { params: { status } }).then(r => r.data),
  deleteIdea:       (id)       => api.delete(`/ideas/${id}`).then(r => r.data),
};

export default ideaService;
