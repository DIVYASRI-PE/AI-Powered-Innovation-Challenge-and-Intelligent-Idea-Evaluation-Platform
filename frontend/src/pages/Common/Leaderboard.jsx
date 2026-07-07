import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Crown } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../services/api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/leaderboard')
      .then(r => setEntries(r.data || []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const rankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-gray-500 font-bold text-sm">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-gray-500 text-sm">Top innovators ranked by score</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-500">No entries yet</h2>
              <p className="text-gray-400 mt-2">Submit and evaluate ideas to appear here.</p>
              <button
                onClick={() => navigate('/submit-idea')}
                className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 font-medium"
              >
                Submit an Idea
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Innovator</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Best Idea</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ideas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {entries.map((entry, idx) => (
                  <tr key={entry.id} className={`hover:bg-gray-50 transition-colors ${idx < 3 ? 'bg-gradient-to-r from-yellow-50 to-white' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-8">{rankIcon(idx + 1)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {entry.userName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{entry.userName}</p>
                          {entry.userDepartment && <p className="text-xs text-gray-400">{entry.userDepartment}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.ideaTitle || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-violet-600 text-lg">{entry.totalScore ?? '—'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.ideasSubmitted ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
