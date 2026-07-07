import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#041C32', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">InnovateAI</span>
            </div>
            <p className="text-sm" style={{ color: '#D6F4F4', opacity: 0.6 }}>
              AI-Powered Innovation Challenge and Intelligent Idea Evaluation Platform for students and faculty.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Leaderboard', path: '/leaderboard' },
                { label: 'Register', path: '/register' },
                { label: 'Login', path: '/login' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button onClick={() => navigate(path)}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#D6F4F4', opacity: 0.6 }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              {['AI Evaluation', 'AI Improvement', 'Similarity Checker', 'AI Chatbot', 'Faculty Review'].map(f => (
                <li key={f}>
                  <span className="text-sm" style={{ color: '#D6F4F4', opacity: 0.6 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs mb-2 sm:mb-0" style={{ color: '#D6F4F4', opacity: 0.4 }}>
            © {year} InnovateAI Platform. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#00C896', opacity: 0.7 }}>
            Built with AI · React · Spring Boot · MySQL
          </p>
        </div>
      </div>
    </footer>
  );
}
