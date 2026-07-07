import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import analyticsService from '../../services/analyticsService';

const AdminDashboard = () => {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPlatformAnalytics()
      .then(d => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const menuItems = [
    { title: 'Manage Challenges', path: '/admin/challenges', icon: '🏆', desc: 'Create, edit, publish challenges' },
    { title: 'Manage Categories', path: '/admin/categories', icon: '📂', desc: 'Organise idea categories' },
    { title: 'Platform Analytics', path: '/admin/analytics', icon: '📊', desc: 'Usage stats and insights' },
    { title: 'Review Ideas',      path: '/faculty/review',  icon: '📝', desc: 'Evaluate submitted ideas' },
    { title: 'Leaderboard',       path: '/leaderboard',     icon: '🥇', desc: 'Top innovators by score' },
  ];

  const StatBox = ({ label, value, color }) => (
    <div className={`rounded-xl p-5 ${color}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{loading ? '…' : (value ?? 0)}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        <div className="mb-6">
          <button onClick={() => navigate('/dashboard')} className="text-violet-600 hover:text-violet-800 mb-2 text-sm font-medium">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Welcome, {user?.firstName} {user?.lastName} — full administrative access</p>
        </div>

        {/* Live stats from DB */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Total Users"       value={stats?.totalUsers}       color="bg-violet-50 text-violet-900" />
          <StatBox label="Total Ideas"       value={stats?.totalIdeas}       color="bg-blue-50 text-blue-900" />
          <StatBox label="Submitted Ideas"   value={stats?.submittedIdeas}   color="bg-amber-50 text-amber-900" />
          <StatBox label="Approved Ideas"    value={stats?.approvedIdeas}    color="bg-emerald-50 text-emerald-900" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatBox label="Total Challenges"  value={stats?.totalChallenges}  color="bg-rose-50 text-rose-900" />
          <StatBox label="Avg Score"         value={stats?.averageScore?.toFixed(1)} color="bg-indigo-50 text-indigo-900" />
          <StatBox label="Pending Review"    value={stats ? (stats.totalIdeas - stats.submittedIdeas - stats.approvedIdeas) : null} color="bg-yellow-50 text-yellow-900" />
        </div>

        {/* Navigation cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-left transition-all hover:scale-[1.02] border border-gray-100"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Users by role & ideas by status */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Users by Role</h3>
              <div className="space-y-2">
                {Object.entries(stats.usersByRole || {}).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-700 capitalize">{role.toLowerCase()}</span>
                    <span className="font-bold text-violet-600 bg-violet-50 px-3 py-0.5 rounded-full text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(stats.usersByRole || {}).length === 0 && <p className="text-gray-400 text-sm">No data yet</p>}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ideas by Status</h3>
              <div className="space-y-2">
                {Object.entries(stats.ideasByStatus || {}).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-700">{status}</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(stats.ideasByStatus || {}).length === 0 && <p className="text-gray-400 text-sm">No data yet</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
