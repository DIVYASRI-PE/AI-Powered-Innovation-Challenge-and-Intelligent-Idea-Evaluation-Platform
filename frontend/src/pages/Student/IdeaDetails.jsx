import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ideaService from '../../services/ideaService';
import reviewService from '../../services/reviewService';
import Navbar from '../../components/Navbar/Navbar';

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadIdeaDetails();
  }, [id]);

  const loadIdeaDetails = async () => {
    try {
      const data = await ideaService.getIdeaById(id);
      setIdea(data);
    } catch (error) {
      console.error('Error loading idea details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!idea) {
    return <div className="flex items-center justify-center min-h-screen">Idea not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <button
          onClick={() => navigate('/my-ideas')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to My Ideas
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{idea.title}</h1>
              <p className="text-gray-600">
                Submitted by: {idea.userName} | {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              idea.status === 'SUBMITTED' ? 'bg-green-100 text-green-800' :
              idea.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {idea.status}
            </span>
          </div>

          {idea.challengeTitle && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900">Challenge</h3>
              <p className="text-blue-800">{idea.challengeTitle}</p>
            </div>
          )}

          {idea.overallScore && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Overall Score</h3>
              <p className="text-3xl font-bold text-green-800">{idea.overallScore}/100</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Abstract</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.abstract || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Problem Statement</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.problemStatement || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Proposed Solution</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.proposedSolution || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Objectives</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.objectives || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Technology Stack</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.technologyStack || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Expected Outcome</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.expectedOutcome || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Innovation Highlights</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.innovationHighlights || 'Not provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Future Scope</h3>
              <p className="text-gray-700 whitespace-pre-line">{idea.futureScope || 'Not provided'}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(idea.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;
