import React from 'react';
import { Calendar, Trophy, Users, Clock, ArrowRight, Flame } from 'lucide-react';

const ChallengeCard = ({ challenge, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'from-emerald-500 to-green-500';
      case 'UPCOMING': return 'from-blue-500 to-cyan-500';
      case 'CLOSED': return 'from-gray-500 to-slate-500';
      default: return 'from-violet-500 to-indigo-500';
    }
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysRemaining = getDaysRemaining(challenge.deadline);
  const isUrgent = daysRemaining !== null && daysRemaining <= 7 && daysRemaining > 0;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* Gradient Header */}
      <div className={`h-1 bg-gradient-to-r ${getStatusColor(challenge.status)}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r ${getStatusColor(challenge.status)} text-white`}>
                {challenge.status}
              </span>
              {isUrgent && (
                <span className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-bold bg-red-100 text-red-600">
                  <Flame className="w-3 h-3" />
                  <span>Urgent</span>
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
              {challenge.title}
            </h3>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {challenge.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Users className="w-5 h-5 mx-auto text-violet-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{challenge.participantCount || 0}</p>
            <p className="text-xs text-gray-500">Participants</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Calendar className="w-5 h-5 mx-auto text-violet-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">
              {daysRemaining !== null ? (daysRemaining > 0 ? `${daysRemaining}d` : 'Closed') : 'N/A'}
            </p>
            <p className="text-xs text-gray-500">Remaining</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Trophy className="w-5 h-5 mx-auto text-violet-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{challenge.prizeCount || 0}</p>
            <p className="text-xs text-gray-500">Prizes</p>
          </div>
        </div>

        {/* Deadline */}
        {challenge.deadline && (
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <Clock className="w-4 h-4 mr-1" />
            <span>Deadline: {new Date(challenge.deadline).toLocaleDateString()}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            {challenge.categoryName || 'General Challenge'}
          </div>
          <div className="flex items-center text-violet-600 group-hover:text-violet-700 transition-colors">
            <span className="text-sm font-medium mr-1">View Challenge</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default ChallengeCard;
