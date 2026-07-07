import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewService from '../../services/reviewService';
import ideaService from '../../services/ideaService';
import Navbar from '../../components/Navbar/Navbar';

const emptyForm = {
  originalityScore: '', innovationScore: '',
  technicalFeasibilityScore: '', presentationScore: '',
  comments: '', feedback: ''
};

const ReviewIdeas = () => {
  const [ideas,        setIdeas]        = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [reviewData,   setReviewData]   = useState(emptyForm);
  const [existingId,   setExistingId]   = useState(null); // existing review id for PUT
  const [loading,      setLoading]      = useState(true);
  const [submitting,   setSubmitting]   = useState(false);
  const [success,      setSuccess]      = useState('');
  const [error,        setError]        = useState('');
  const navigate = useNavigate();

  useEffect(() => { loadSubmittedIdeas(); }, []);

  const loadSubmittedIdeas = async () => {
    setLoading(true);
    try {
      const data = await ideaService.getIdeasByStatus('SUBMITTED');
      setIdeas(data || []);
    } catch (e) {
      setError('Failed to load ideas. Make sure you are logged in as Faculty or Admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIdea = async (idea) => {
    setSelectedIdea(idea);
    setReviewData(emptyForm);
    setExistingId(null);
    setSuccess('');
    setError('');
    try {
      const reviews = await reviewService.getReviewsByIdea(idea.id);
      if (reviews && reviews.length > 0) {
        const r = reviews[0];
        setExistingId(r.id);
        setReviewData({
          originalityScore:          r.originalityScore         ?? '',
          innovationScore:           r.innovationScore          ?? '',
          technicalFeasibilityScore: r.technicalFeasibilityScore ?? '',
          presentationScore:         r.presentationScore        ?? '',
          comments:                  r.comments                 ?? '',
          feedback:                  r.feedback                 ?? '',
        });
      }
    } catch { /* no existing review */ }
  };

  const handleInputChange = e =>
    setReviewData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmitReview = async () => {
    setError(''); setSuccess('');
    const { originalityScore, innovationScore, technicalFeasibilityScore, presentationScore, comments, feedback } = reviewData;
    if (!originalityScore || !innovationScore || !technicalFeasibilityScore || !presentationScore) {
      setError('Please fill in all 4 score fields.');
      return;
    }
    setSubmitting(true);
    try {
      const request = {
        ideaId:                    selectedIdea.id,
        originalityScore:          parseFloat(originalityScore),
        innovationScore:           parseFloat(innovationScore),
        technicalFeasibilityScore: parseFloat(technicalFeasibilityScore),
        presentationScore:         parseFloat(presentationScore),
        comments, feedback,
      };

      if (existingId) {
        // Update existing review → triggers score calculation and COMPLETED status
        await reviewService.submitReview(existingId, request);
        setSuccess('Review updated and submitted successfully!');
      } else {
        // Create new review
        const created = await reviewService.createReview(request);
        // Then submit it to mark COMPLETED and calculate overall score
        await reviewService.submitReview(created.id, request);
        setSuccess('Review submitted successfully!');
      }

      setSelectedIdea(null);
      setReviewData(emptyForm);
      setExistingId(null);
      loadSubmittedIdeas();
    } catch (e) {
      setError(e.response?.data?.message || 'Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        <div className="mb-6">
          <button onClick={() => navigate('/dashboard')} className="text-violet-600 hover:text-violet-800 mb-2 text-sm font-medium">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Review Submitted Ideas</h1>
          <p className="text-gray-600 mt-1">Evaluate and provide quality feedback on student submissions</p>
        </div>

        {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">{success}</div>}
        {error   && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">{error}</div>}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — idea list */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-1">Submitted Ideas</h2>
              <p className="text-gray-500 text-sm mb-4">{ideas.length} idea{ideas.length !== 1 ? 's' : ''} awaiting review</p>

              {ideas.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-lg font-semibold">No submitted ideas</p>
                  <p className="text-sm mt-1">Students need to submit ideas first.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {ideas.map(idea => (
                    <div
                      key={idea.id}
                      onClick={() => handleSelectIdea(idea)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedIdea?.id === idea.id
                          ? 'border-violet-500 bg-violet-50 shadow-md'
                          : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{idea.title}</h3>
                        {idea.overallScore && (
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">
                            Score: {idea.overallScore}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">By: <span className="font-medium text-gray-700">{idea.userName}</span></p>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {idea.ideaAbstract || idea.problemStatement || 'No description'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right — review form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {!selectedIdea ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                  <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-semibold">Select an idea to review</p>
                  <p className="text-sm mt-1">Click an idea from the list</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 text-gray-900">{selectedIdea.title}</h2>

                  {/* Idea details */}
                  <div className="mb-5 p-4 bg-gray-50 rounded-xl space-y-2 text-sm text-gray-700">
                    <p><strong>Student:</strong> {selectedIdea.userName}</p>
                    {selectedIdea.ideaAbstract && <p><strong>Abstract:</strong> {selectedIdea.ideaAbstract}</p>}
                    {selectedIdea.problemStatement && <p><strong>Problem:</strong> {selectedIdea.problemStatement}</p>}
                    {selectedIdea.proposedSolution && <p><strong>Solution:</strong> {selectedIdea.proposedSolution}</p>}
                    {selectedIdea.technologyStack && <p><strong>Tech Stack:</strong> {selectedIdea.technologyStack}</p>}
                  </div>

                  {existingId && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl text-sm">
                      Existing review found — updating it.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { label: 'Originality (1–10)',           name: 'originalityScore' },
                      { label: 'Innovation (1–10)',            name: 'innovationScore' },
                      { label: 'Technical Feasibility (1–10)', name: 'technicalFeasibilityScore' },
                      { label: 'Presentation (1–10)',          name: 'presentationScore' },
                    ].map(({ label, name }) => (
                      <div key={name}>
                        <label className="block text-gray-700 text-xs font-bold mb-1">{label}</label>
                        <input
                          type="number" name={name} min="1" max="10" step="0.1"
                          value={reviewData[name]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                          placeholder="1–10"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Comments</label>
                    <textarea
                      name="comments" rows="3"
                      value={reviewData.comments}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                      placeholder="Overall comments about the idea..."
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Feedback & Suggestions</label>
                    <textarea
                      name="feedback" rows="3"
                      value={reviewData.feedback}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                      placeholder="Specific suggestions for improvement..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReview}
                      disabled={submitting}
                      className="flex-1 bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 font-semibold transition-colors"
                    >
                      {submitting ? 'Submitting...' : existingId ? 'Update Review' : 'Submit Review'}
                    </button>
                    <button
                      onClick={() => { setSelectedIdea(null); setReviewData(emptyForm); setExistingId(null); }}
                      className="px-4 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewIdeas;
