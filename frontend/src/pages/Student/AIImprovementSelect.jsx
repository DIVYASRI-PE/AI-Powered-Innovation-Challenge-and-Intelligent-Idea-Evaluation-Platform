import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, FileText } from 'lucide-react';
import ideaService from '../../services/ideaService';
import Navbar from '../../components/Navbar/Navbar';

const AIImprovementSelect = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    ideaService.getMyIdeas()
      .then(data => setIdeas(data || []))
      .catch(() => setIdeas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
        <button onClick={() => navigate('/dashboard')} className="text-violet-600 hover:text-violet-800 mb-6 flex items-center gap-1 text-sm font-medium">
          ← Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Improvement</h1>
            <p className="text-gray-500 text-sm">Select an idea to improve</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : ideas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No ideas yet</h2>
            <p className="text-gray-500 mb-6">Submit an idea first to get improvement suggestions.</p>
            <button
              onClick={() => navigate('/submit-idea')}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 font-medium"
            >
              Submit Your First Idea
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <button
                key={idea.id}
                onClick={() => navigate(`/ai-improvement/${idea.id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 text-left transition-all duration-200 hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors text-lg">
                    {idea.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ml-2 shrink-0 ${
                    idea.status === 'SUBMITTED' ? 'bg-green-100 text-green-700' :
                    idea.status === 'APPROVED'  ? 'bg-blue-100 text-blue-700'  :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{idea.status}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {idea.ideaAbstract || 'No abstract provided'}
                </p>
                <div className="flex items-center text-rose-600 text-sm font-medium">
                  Improve this idea <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIImprovementSelect;
