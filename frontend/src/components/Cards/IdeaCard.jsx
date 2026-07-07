import React from 'react';
import { ArrowRight, TrendingUp, Clock, Users, Star } from 'lucide-react';

const IdeaCard = ({ idea, onClick, showScore = true }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-500';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    if (score >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-emerald-100 text-emerald-700';
      case 'DRAFT': return 'bg-amber-100 text-amber-700';
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-700';
      case 'APPROVED': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${getScoreColor(idea.overallScore || 0)}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
              {idea.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {idea.userName}
            </p>
          </div>
          {showScore && idea.overallScore && (
            <div className="flex-shrink-0 ml-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getScoreColor(idea.overallScore)} flex items-center justify-center shadow-lg`}>
                <span className="text-xl font-bold text-white">{idea.overallScore}</span>
              </div>
            </div>
          )}
        </div>

        {/* Abstract */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {idea.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
            {idea.status}
          </span>
          {idea.challengeTitle && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
              {idea.challengeTitle}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : 'N/A'}
          </div>
          <div className="flex items-center text-violet-600 group-hover:text-violet-700 transition-colors">
            <span className="text-sm font-medium mr-1">View Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default IdeaCard;
