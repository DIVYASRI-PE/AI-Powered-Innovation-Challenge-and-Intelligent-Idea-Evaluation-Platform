import api from './api';

const reviewService = {
  createReview:      (data)         => api.post('/reviews', data).then(r => r.data),
  submitReview:      (id, data)     => api.put(`/reviews/${id}`, data).then(r => r.data),
  getReviewById:     (id)           => api.get(`/reviews/${id}`).then(r => r.data),
  getMyReviews:      ()             => api.get('/reviews/my-reviews').then(r => r.data),
  getReviewsByIdea:  (ideaId)       => api.get(`/reviews/idea/${ideaId}`).then(r => r.data),
  getPendingReviews: ()             => api.get('/reviews/pending').then(r => r.data),
};

export default reviewService;
