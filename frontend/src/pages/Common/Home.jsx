import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Sparkles, Brain, TrendingUp, Shield, Zap, Users, ArrowRight, MessageSquare } from 'lucide-react';

const BG  = '#041C32';
const BG2 = '#06283D';
const BG3 = '#0B3B4A';
const PRIMARY   = '#00C896';
const SECONDARY = '#14B8A6';
const ACCENT    = '#38BDF8';
const HIGHLIGHT = '#A3E635';
const TEXT_SOFT = '#D6F4F4';
const BORDER    = 'rgba(255,255,255,0.10)';

const features = [
  { icon: Brain,        title: 'AI-Powered Evaluation',    accent: PRIMARY,    desc: 'Advanced ML algorithms evaluate your ideas across 8 dimensions — originality, feasibility, market potential, scalability and more.' },
  { icon: TrendingUp,   title: 'Smart Improvement',        accent: ACCENT,     desc: 'Get AI-driven suggestions to enhance your title, abstract, solution, technology stack, and future roadmap.' },
  { icon: Shield,       title: 'Similarity Detection',     accent: SECONDARY,  desc: 'Semantic analysis compares your concept against existing projects to ensure uniqueness and prevent duplication.' },
  { icon: Zap,          title: 'Real-time Feedback',       accent: HIGHLIGHT,  desc: 'Receive instant AI evaluations and chat with our intelligent assistant for live innovation guidance.' },
  { icon: Users,        title: 'Collaborative Challenges', accent: '#F97316',  desc: 'Participate in structured challenges with clear objectives, deadlines, prizes, and faculty mentorship.' },
  { icon: MessageSquare,title: 'Smart AI Chatbot',         accent: ACCENT,     desc: 'Role-aware assistant for students and faculty — answers questions, explains scores, and suggests improvements.' },
];

const stats = [
  { value: '10K+', label: 'Active Innovators' },
  { value: '5K+',  label: 'Ideas Submitted' },
  { value: '500+', label: 'Challenges' },
  { value: '95%',  label: 'Satisfaction Rate' },
];

const steps = [
  { n: '01', title: 'Register & Login',      desc: 'Create your account as Student or Faculty and access the innovation workspace.' },
  { n: '02', title: 'Submit Your Idea',      desc: 'Fill in your project details, problem statement, solution, tech stack, and team members.' },
  { n: '03', title: 'AI Evaluation',         desc: 'Get instant 8-dimensional AI feedback on originality, feasibility, and market potential.' },
  { n: '04', title: 'Faculty Review',        desc: 'Faculty give manual scores, comments, and improvement recommendations.' },
  { n: '05', title: 'Improve & Resubmit',    desc: 'Use AI and faculty feedback to refine your idea and resubmit for a better score.' },
  { n: '06', title: 'Win & Get Published',   desc: 'Top-ranked ideas appear on the leaderboard and winners are announced by Admin.' },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: `linear-gradient(135deg, ${BG} 0%, ${BG2} 50%, ${BG3} 100%)` }}>
        {/* glow blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: PRIMARY }} />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: ACCENT }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            style={{ background: 'rgba(0,200,150,0.12)', border: `1px solid rgba(0,200,150,0.35)`, color: PRIMARY }}>
            <Sparkles className="w-4 h-4" /> AI-Powered Innovation Platform
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            Transform Ideas Into
            <span className="block" style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>Reality</span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: TEXT_SOFT }}>
            Submit your innovative projects, get AI-powered evaluations, receive faculty feedback,
            and compete on the leaderboard to transform your concepts into award-winning solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate(user ? '/dashboard' : '/register')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 8px 32px rgba(0,200,150,0.35)' }}>
              {user ? 'Go to Dashboard' : 'Start Innovating'} <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/leaderboard')}
              className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{ border: `1px solid ${BORDER}`, color: TEXT_SOFT, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
              View Leaderboard
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative max-w-5xl mx-auto px-4 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(18,39,56,0.8)', border: `1px solid ${BORDER}`, backdropFilter: 'blur(12px)' }}>
              <p className="text-3xl font-black" style={{ color: PRIMARY }}>{s.value}</p>
              <p className="text-sm mt-1" style={{ color: TEXT_SOFT }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="py-24" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Powerful Features for Innovators</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT_SOFT }}>
              Everything you need to submit, evaluate, and improve your innovative ideas with cutting-edge AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, accent, desc }) => (
              <div key={title}
                className="group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default"
                style={{ background: 'rgba(18,39,56,0.85)', border: `1px solid ${BORDER}` }}
                onMouseOver={e => e.currentTarget.style.borderColor = accent + '55'}
                onMouseOut={e  => e.currentTarget.style.borderColor = BORDER}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: accent + '20', border: `1px solid ${accent}44` }}>
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_SOFT }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────── */}
      <section className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">How It Works</h2>
            <p className="text-lg" style={{ color: TEXT_SOFT }}>Six steps from idea to winner</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: 'rgba(18,39,56,0.85)', border: `1px solid ${BORDER}` }}>
                <span className="absolute -top-2 -right-2 text-7xl font-black opacity-[0.07] select-none"
                  style={{ color: i % 2 === 0 ? PRIMARY : ACCENT }}>{n}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mb-4"
                  style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})` }}>{n}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_SOFT }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="py-24 text-center" style={{ background: BG2 }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-6">Ready to Innovate?</h2>
          <p className="text-lg mb-10" style={{ color: TEXT_SOFT }}>
            Join thousands of students and faculty already transforming ideas into reality.
          </p>
          <button onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 8px 32px rgba(0,200,150,0.35)' }}>
            {user ? 'Access Your Dashboard' : 'Create Free Account'}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
