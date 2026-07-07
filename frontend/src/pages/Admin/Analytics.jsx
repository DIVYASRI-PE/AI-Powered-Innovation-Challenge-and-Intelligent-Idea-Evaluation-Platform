import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import analyticsService from '../../services/analyticsService';
import Navbar from '../../components/Navbar/Navbar';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsService.getPlatformAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!analytics) {
    return <div className="flex items-center justify-center min-h-screen">Unable to load analytics</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Platform Analytics</h1>
          <p className="text-gray-600 mt-2">Overview of platform performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Users" value={analytics.totalUsers} icon="👥" />
          <StatCard label="Total Ideas" value={analytics.totalIdeas} icon="💡" />
          <StatCard label="Total Challenges" value={analytics.totalChallenges} icon="🏆" />
          <StatCard label="Average Score" value={analytics.averageScore?.toFixed(1) || '0'} icon="⭐" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard label="Submitted Ideas" value={analytics.submittedIdeas} icon="📝" />
          <StatCard label="Approved Ideas" value={analytics.approvedIdeas} icon="✅" />
          <StatCard label="Pending Review" value={analytics.totalIdeas - analytics.submittedIdeas - analytics.approvedIdeas} icon="⏳" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Ideas by Category</h2>
            {analytics.ideasByCategory && Object.keys(analytics.ideasByCategory).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(analytics.ideasByCategory).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-700">{category}</span>
                    <span className="font-bold text-blue-600">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Ideas by Status</h2>
            {analytics.ideasByStatus && Object.keys(analytics.ideasByStatus).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(analytics.ideasByStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-700">{status}</span>
                    <span className="font-bold text-blue-600">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Users by Role</h2>
            {analytics.usersByRole && Object.keys(analytics.usersByRole).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(analytics.usersByRole).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center">
                    <span className="text-gray-700">{role}</span>
                    <span className="font-bold text-blue-600">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

export default Analytics;
