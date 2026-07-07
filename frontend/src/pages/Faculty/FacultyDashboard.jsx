import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import ideaService from '../../services/ideaService';
import reviewService from '../../services/reviewService';
import { ClipboardList, CheckCircle, Clock, Star } from 'lucide-react';

const BG = '#041C32'; const BG2 = '#06283D';
const PRIMARY = '#00C896'; const ACCENT = '#38BDF8';
const SOFT = '#D6F4F4'; const BORDER = 'rgba(255,255,255,0.10)';
const CARD = 'rgba(18,39,56,0.9)';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ submitted: 0, reviewed: 0, pending: 0 });
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ideaService.getIdeasByStatus('SUBMITTED').catch(() => []),
      reviewService.getMyReviews().catch(() => []),
    ]).then(([submitted, reviewed]) => {
      setStats({
        submitted: submitted?.length || 0,
        reviewed:  reviewed?.length  || 0,
        pending:   Math.max(0, (submitted?.length || 0) - (reviewed?.length || 0)),
      });
      setRecentIdeas((submitted || []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Ideas to Review', value: stats.submitted, icon: ClipboardList, color: ACCENT },
    { label: 'Reviewed by Me',  value: stats.reviewed,  icon: CheckCircle,   color: PRIMARY },
    { label: 'Pending Review',  value: stats.pending,   icon: Clock,         color: '#F97316' },
  ];

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Header */}
        <div className="rounded-2xl p-7 mb-8 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg,${BG2},#0B3B4A)`, border: `1px solid ${BORDER}` }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: PRIMARY, filter: 'blur(40px)' }} />
          <div className="relative">
            <p className="text-sm font-semibold mb-1" style={{ color: PRIMARY }}>Welcome back, Faculty</p>
            <h1 className="text-3xl font-black text-white mb-2">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm" style={{ color: SOFT }}>
              {user?.designation || 'Faculty'} · {user?.department || 'Department'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: color + '20' }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{loading ? '…' : value}</p>
                <p className="text-xs font-medium" style={{ color: SOFT }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <button onClick={() => navigate('/faculty/review')}
            className="rounded-2xl p-6 text-left transition-all hover:scale-[1.02] group"
            style={{ background: `linear-gradient(135deg,rgba(0,200,150,0.15),rgba(56,189,248,0.08))`, border: `1px solid rgba(0,200,150,0.3)` }}>
            <ClipboardList className="w-8 h-8 mb-3" style={{ color: PRIMARY }} />
            <h3 className="text-lg font-bold text-white mb-1">Review Ideas</h3>
            <p className="text-sm" style={{ color: SOFT }}>Evaluate and score student submissions</p>
          </button>

          <button onClick={() => navigate('/ai-chatbot')}
            className="rounded-2xl p-6 text-left transition-all hover:scale-[1.02] group"
            style={{ background: `linear-gradient(135deg,rgba(56,189,248,0.12),rgba(0,200,150,0.06))`, border: `1px solid rgba(56,189,248,0.3)` }}>
            <Star className="w-8 h-8 mb-3" style={{ color: ACCENT }} />
            <h3 className="text-lg font-bold text-white mb-1">AI Assistant</h3>
            <p className="text-sm" style={{ color: SOFT }}>Get help with evaluation criteria and feedback</p>
          </button>
        </div>

        {/* Recent submitted ideas */}
        <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-white text-lg">Recently Submitted Ideas</h2>
            <button onClick={() => navigate('/faculty/review')}
              className="text-xs font-semibold transition-colors"
              style={{ color: PRIMARY }}>
              Review All →
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 rounded-full border-4 animate-spin"
                style={{ borderColor: PRIMARY, borderTopColor: 'transparent' }} />
            </div>
          ) : recentIdeas.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: SOFT }}>
              No submitted ideas yet. Students need to submit ideas first.
            </p>
          ) : (
            <div className="space-y-3">
              {recentIdeas.map(idea => (
                <div key={idea.id}
                  onClick={() => navigate('/faculty/review')}
                  className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                  <div>
                    <p className="font-semibold text-white text-sm">{idea.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: SOFT }}>
                      By: {idea.userName} · {idea.challengeTitle || 'No challenge'}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-bold"
                    style={{ background: 'rgba(0,200,150,0.15)', color: PRIMARY }}>
                    {idea.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
