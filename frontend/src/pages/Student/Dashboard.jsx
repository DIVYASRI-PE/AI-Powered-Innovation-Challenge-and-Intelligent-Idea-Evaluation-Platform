import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import StatCard from '../../components/Cards/StatCard';
import { Sparkles, FileText, Brain, TrendingUp, Shield, MessageSquare, ArrowRight, Trophy, Clock } from 'lucide-react';
import ideaService from '../../services/ideaService';
import challengeService from '../../services/challengeService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ideaCount, setIdeaCount]         = useState(0);
  const [avgScore,  setAvgScore]           = useState('—');
  const [challenges, setChallenges]        = useState(0);
  const [recentIdeas, setRecentIdeas]      = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ideas, active] = await Promise.all([
          ideaService.getMyIdeas(),
          challengeService.getActiveChallenges(),
        ]);
        const list = ideas || [];
        setIdeaCount(list.length);
        setChallenges((active || []).length);

        // average score from scored ideas
        const scored = list.filter(i => i.overallScore);
        if (scored.length > 0) {
          const avg = scored.reduce((s, i) => s + Number(i.overallScore), 0) / scored.length;
          setAvgScore(avg.toFixed(1));
        }

        // 5 most recent
        setRecentIdeas(list.slice(0, 5));
      } catch {
        // silently ignore — stats stay at defaults
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const actions = [
    { title: 'Submit New Idea',   description: 'Capture your innovation with AI-powered guidance.',             route: '/submit-idea',        icon: FileText,      color: 'from-violet-500 to-violet-600' },
    { title: 'My Ideas',          description: 'Track drafts, submissions, and AI scores all in one place.',    route: '/my-ideas',           icon: Trophy,        color: 'from-emerald-500 to-emerald-600' },
    { title: 'AI Evaluation',     description: 'Get comprehensive feedback on originality and feasibility.',    route: '/ai-evaluation',      icon: Brain,         color: 'from-amber-500 to-amber-600' },
    { title: 'AI Improvement',    description: 'Upgrade titles, abstracts and features with AI suggestions.',   route: '/ai-improvement',     icon: TrendingUp,    color: 'from-rose-500 to-rose-600' },
    { title: 'Similarity Checker',description: 'Compare your concept against other projects.',                  route: '/similarity-checker', icon: Shield,        color: 'from-blue-500 to-blue-600' },
    { title: 'AI Chatbot',        description: 'Ask questions and receive intelligent project guidance.',       route: '/ai-chatbot',         icon: MessageSquare, color: 'from-indigo-500 to-indigo-600' },
  ];

  const statusColor = s => s === 'SUBMITTED' ? 'bg-emerald-100 text-emerald-700'
                        : s === 'APPROVED'   ? 'bg-blue-100 text-blue-700'
                        : s === 'DRAFT'      ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Welcome banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-violet-200" />
                <span className="text-violet-200 font-medium">Welcome back</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{user?.firstName || 'Innovator'}</h1>
              <p className="text-lg text-violet-100 max-w-2xl mb-6">
                Your innovation workspace is ready. Submit ideas, get AI-powered feedback, and compete on the leaderboard.
              </p>
              <button
                onClick={() => navigate('/submit-idea')}
                className="inline-flex items-center gap-2 bg-white text-violet-900 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-all hover:scale-105 shadow-xl"
              >
                Start New Project <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Ideas Submitted"  value={loading ? '...' : ideaCount}  icon={FileText}  color="violet" />
          <StatCard title="Average Score"    value={loading ? '...' : avgScore}   icon={Trophy}    color="emerald" />
          <StatCard title="Active Challenges" value={loading ? '...' : challenges} icon={Clock}     color="amber" />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map(({ title, description, route, icon: Icon, color }) => (
              <button
                key={title}
                onClick={() => navigate(route)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Ideas (live from DB) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Recent Ideas</h2>
            <button onClick={() => navigate('/my-ideas')} className="text-violet-600 hover:text-violet-700 text-sm font-semibold">
              View All →
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentIdeas.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No ideas yet. <button onClick={() => navigate('/submit-idea')} className="text-violet-600 font-semibold hover:underline">Submit your first idea!</button></p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentIdeas.map(idea => (
                <div key={idea.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/my-ideas')}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                      <p className="text-sm text-gray-500">
                        {idea.challengeTitle || 'No challenge'} · {new Date(idea.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {idea.overallScore && (
                      <span className="text-sm font-bold text-violet-600">Score: {idea.overallScore}</span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(idea.status)}`}>
                      {idea.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
