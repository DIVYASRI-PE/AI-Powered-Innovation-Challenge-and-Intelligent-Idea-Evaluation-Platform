import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, color = 'violet' }) => {
  const colorClasses = {
    violet: {
      bg: 'from-violet-500 to-indigo-500',
      light: 'bg-violet-100',
      text: 'text-violet-600'
    },
    emerald: {
      bg: 'from-emerald-500 to-green-500',
      light: 'bg-emerald-100',
      text: 'text-emerald-600'
    },
    amber: {
      bg: 'from-amber-500 to-orange-500',
      light: 'bg-amber-100',
      text: 'text-amber-600'
    },
    rose: {
      bg: 'from-rose-500 to-pink-500',
      light: 'bg-rose-100',
      text: 'text-rose-600'
    },
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      light: 'bg-blue-100',
      text: 'text-blue-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.violet;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg flex-shrink-0 ml-4`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
