import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUps
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      section: 'Main',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
      ]
    },
    {
      section: 'Management',
      items: [
        { name: 'Challenges', path: '/admin/challenges', icon: Trophy },
        { name: 'Categories', path: '/admin/categories', icon: Target },
        { name: 'Users', path: '/admin/users', icon: Users },
      ]
    },
    {
      section: 'Content',
      items: [
        { name: 'All Ideas', path: '/admin/ideas', icon: FileText },
        { name: 'Reviews', path: '/admin/reviews', icon: TrendingUps },
      ]
    },
    {
      section: 'Settings',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-violet-900 to-indigo-900 text-white transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-bold">InnovateAI</h1>
              <p className="text-xs text-violet-300">Admin Panel</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            {isOpen && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-violet-300 uppercase tracking-wider">
                {section.section}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-r-4 border-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-violet-400'}`} />
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center space-x-3 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          {isOpen && (
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-violet-300">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
