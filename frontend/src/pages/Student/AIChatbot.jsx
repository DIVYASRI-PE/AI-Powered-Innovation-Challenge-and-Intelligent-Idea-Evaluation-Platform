import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import aiService from '../../services/aiService';
import Navbar from '../../components/Navbar/Navbar';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

const BG      = '#041C32';
const BG2     = '#06283D';
const PRIMARY = '#00C896';
const ACCENT  = '#38BDF8';
const SOFT    = '#D6F4F4';
const BORDER  = 'rgba(255,255,255,0.10)';
const CARD    = 'rgba(18,39,56,0.9)';

/* Role-based welcome messages and quick prompts */
const ROLE_CONFIG = {
  STUDENT: {
    welcome: `👋 Hello! I'm your **AI Innovation Assistant**.

I can help you with:
• 💡 Developing and refining your project ideas
• 📊 Explaining your AI evaluation scores
• 🔧 Recommending technologies for your project
• ✍️ Writing better abstracts and problem statements
• 🚀 Planning future scope and improvements

Ask me anything about your innovation project!`,
    prompts: [
      'How can I improve my project idea?',
      'What technology stack should I use for my AI project?',
      'Explain my evaluation score',
      'How to write a good problem statement?',
      'What makes an idea innovative?',
      'Give me ideas for an IoT project',
    ]
  },
  FACULTY: {
    welcome: `👋 Hello, Faculty Member! I'm your **AI Evaluation Assistant**.

I can help you with:
• 📝 Evaluating student project ideas
• 🎯 Suggesting scores and feedback criteria
• 📊 Understanding AI evaluation metrics
• 💬 Writing constructive feedback
• 🔍 Identifying duplicate or similar ideas
• 📋 Creating challenge guidelines

How can I assist you today?`,
    prompts: [
      'How should I score originality?',
      'What feedback should I give for a weak project?',
      'How to identify duplicate ideas?',
      'What makes a project technically feasible?',
      'Suggest evaluation criteria for IoT projects',
      'How to write constructive feedback?',
    ]
  },
  ADMIN: {
    welcome: `👋 Hello, Admin! I'm your **Platform Intelligence Assistant**.

I can help you with:
• 📊 Analyzing platform statistics and trends
• 🏆 Setting up effective challenges
• 👥 Understanding user engagement patterns
• 📈 Improving evaluation criteria
• 🔧 Platform optimization suggestions

What would you like to explore?`,
    prompts: [
      'How to create an engaging challenge?',
      'What are the best evaluation criteria?',
      'How to increase student participation?',
      'Analyze innovation trends',
      'Suggest prize structures for challenges',
      'How to rank ideas fairly?',
    ]
  }
};

const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'mt-1' : 'mt-1'}`}
        style={{ background: isUser ? `linear-gradient(135deg,${PRIMARY},${ACCENT})` : 'rgba(0,200,150,0.2)', border: `1px solid ${isUser ? 'transparent' : 'rgba(0,200,150,0.3)'}` }}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4" style={{ color: PRIMARY }} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
        style={isUser
          ? { background: `linear-gradient(135deg,${PRIMARY}cc,${ACCENT}cc)`, color: '#fff' }
          : { background: CARD, color: SOFT, border: `1px solid ${BORDER}` }}>
        {msg.content}
        {msg.typing && <span className="inline-block ml-1 animate-pulse">▋</span>}
      </div>
    </div>
  );
};

export default function AIChatbot() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const bottomRef = useRef();
  const inputRef  = useRef();

  const role   = user?.role?.toUpperCase() || 'STUDENT';
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.STUDENT;

  const [messages, setMessages] = useState([
    { role: 'assistant', content: config.welcome }
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;

    setMessages(p => [...p, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    // Add typing indicator
    setMessages(p => [...p, { role: 'assistant', content: '', typing: true }]);

    try {
      const ctx = {
        role,
        userName: `${user?.firstName} ${user?.lastName}`,
        department: user?.department || '',
      };
      const response = await aiService.chat(msg, null, ctx);
      setMessages(p => [
        ...p.filter(m => !m.typing),
        { role: 'assistant', content: response.response || response.message || 'I received your message.' }
      ]);
    } catch {
      setMessages(p => [
        ...p.filter(m => !m.typing),
        { role: 'assistant', content: '⚠️ I\'m temporarily unavailable. Please try again in a moment.' }
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: config.welcome }]);
  };

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">

        <button onClick={() => navigate('/dashboard')}
          className="text-sm font-medium mb-4 transition-colors"
          style={{ color: PRIMARY }}
          onMouseOver={e => e.currentTarget.style.color = ACCENT}
          onMouseOut={e  => e.currentTarget.style.color = PRIMARY}>
          ← Back to Dashboard
        </button>

        {/* Chat window */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ background: `linear-gradient(135deg,rgba(0,200,150,0.15),rgba(56,189,248,0.15))`, borderBottom: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})`, boxShadow: `0 0 16px rgba(0,200,150,0.35)` }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white">AI Innovation Assistant</h2>
                <p className="text-xs" style={{ color: SOFT }}>
                  {role === 'STUDENT' ? '🎓 Student Mode' : role === 'FACULTY' ? '👩‍🏫 Faculty Mode' : '⚙️ Admin Mode'}
                  {' · '}Online
                </p>
              </div>
            </div>
            <button onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
              style={{ border: `1px solid ${BORDER}`, color: SOFT }}>
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          {/* Messages */}
          <div className="h-[420px] overflow-y-auto p-5 space-y-4" style={{ background: BG2 }}>
            {messages.map((m, i) => <Bubble key={i} msg={m} />)}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 py-3 flex gap-2 flex-wrap" style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
            {config.prompts.slice(0, 4).map(p => (
              <button key={p} onClick={() => send(p)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(0,200,150,0.1)', border: `1px solid rgba(0,200,150,0.25)`, color: PRIMARY }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-4 flex gap-3" style={{ background: '#041C32', borderTop: `1px solid ${BORDER}` }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Type your message... (Press Enter to send)"
              disabled={loading}
              style={{
                flex: 1,
                background: 'rgba(6,40,61,0.8)',
                border: `1px solid ${BORDER}`,
                color: '#fff',
                borderRadius: '999px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = PRIMARY}
              onBlur={e  => e.target.style.borderColor = BORDER}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})`, boxShadow: `0 4px 16px rgba(0,200,150,0.3)` }}>
              {loading
                ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                : <Send className="w-4 h-4" />
              }
            </button>
          </div>
        </div>

        {/* More quick prompts */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(214,244,244,0.4)' }}>More Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {config.prompts.slice(4).map(p => (
              <button key={p} onClick={() => send(p)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(56,189,248,0.08)', border: `1px solid rgba(56,189,248,0.2)`, color: ACCENT }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
