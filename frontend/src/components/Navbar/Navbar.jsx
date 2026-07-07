import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import notificationService from '../../services/notificationService';
import { Menu, X, Bell, LogOut, Settings, Sparkles, Trophy, Home, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [notifs,       setNotifs]       = useState([]);
  const [unread,       setUnread]       = useState(0);
  const [scrolled,     setScrolled]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!user) return;
    notificationService.getUserNotifications?.()
      .then(d => { setNotifs(d || []); setUnread((d || []).filter(n => !n.read).length); })
      .catch(() => {});
  }, [user]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];
  const studentItems = [
    { name: 'Dashboard',   path: '/dashboard' },
    { name: 'Submit Idea', path: '/submit-idea' },
    { name: 'My Ideas',    path: '/my-ideas' },
    { name: 'AI Evaluate', path: '/ai-evaluation' },
    { name: 'AI Improve',  path: '/ai-improvement' },
    { name: 'Similarity',  path: '/similarity-checker' },
    { name: 'AI Chat',     path: '/ai-chatbot' },
  ];
  const adminItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: Settings },
    { name: 'Challenges',      path: '/admin/challenges' },
    { name: 'Categories',      path: '/admin/categories' },
    { name: 'Analytics',       path: '/admin/analytics' },
    { name: 'Review Ideas',    path: '/faculty/review' },
  ];
  const facultyItems = [
    { name: 'Faculty Dashboard', path: '/faculty/dashboard' },
    { name: 'Review Ideas',      path: '/faculty/review' },
  ];

  const getItems = () => {
    if (!user) return navItems;
    const r = user.role?.toLowerCase();
    if (r === 'admin')   return [...navItems, ...adminItems];
    if (r === 'faculty') return [...navItems, ...facultyItems];
    return [...navItems, ...studentItems];
  };

  const isActive = p => location.pathname === p;
  const items = getItems();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
      style={{ background: 'rgba(4,28,50,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-primary transition-all group-hover:scale-110"
              style={{ background: 'var(--btn)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-bold gradient-text leading-none">InnovateAI</p>
              <p className="text-[10px] text-brand-soft opacity-60">Innovation Platform</p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {items.slice(0, 7).map(item => {
              const Icon = item.icon;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-brand-soft hover:text-white hover:bg-white/5'
                  }`}
                  style={isActive(item.path) ? { background: 'var(--btn)', boxShadow: '0 2px 12px rgba(0,200,150,0.3)' } : {}}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className="relative p-2 rounded-lg text-brand-soft hover:text-white hover:bg-white/5 transition-colors">
                    <Bell className="w-5 h-5" />
                    {unread > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                        style={{ background: 'var(--primary)' }}>{unread}</span>
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto card-brand">
                      <p className="px-4 py-2 text-xs font-bold text-brand-soft uppercase tracking-wider border-b border-white/10">Notifications</p>
                      {notifs.length === 0
                        ? <p className="px-4 py-4 text-sm text-brand-soft opacity-50 text-center">No notifications</p>
                        : notifs.slice(0, 8).map(n => (
                          <div key={n.id} className={`px-4 py-3 text-sm border-b border-white/5 hover:bg-white/5 transition-colors ${!n.read ? 'bg-white/5' : ''}`}>
                            <p className="text-white font-medium">{n.message}</p>
                            {n.createdAt && <p className="text-brand-soft opacity-50 text-xs mt-0.5">{new Date(n.createdAt).toLocaleString()}</p>}
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: 'var(--btn)' }}>
                      {user.firstName?.[0] || 'U'}
                    </div>
                    <span className="hidden sm:block text-sm font-semibold text-white">{user.firstName || user.username}</span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-2xl py-2 z-50 card-brand">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-bold text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-brand-soft opacity-60">{user.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ background: 'var(--btn)' }}>{user.role}</span>
                      </div>
                      <button onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-brand-soft hover:text-white hover:bg-white/5 transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </button>
                      <button onClick={() => { setProfileOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold text-brand-soft hover:text-white transition-colors">Login</button>
                <button onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-bold text-white rounded-xl btn-brand"
                  style={{ background: 'var(--btn)' }}>Get Started</button>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-brand-soft hover:text-white">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 pb-3" style={{ background: 'rgba(4,28,50,0.98)' }}>
          {items.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.path} onClick={() => { navigate(item.path); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-brand-soft hover:text-white'
                }`}
                style={isActive(item.path) ? { color: 'var(--primary)' } : {}}>
                {Icon && <Icon className="w-4 h-4" />}
                {item.name}
              </button>
            );
          })}
          {user && (
            <button onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-400">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
