import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../../services/aiService';
import ideaService from '../../services/ideaService';
import Navbar from '../../components/Navbar/Navbar';
import { Brain, ArrowRight, RefreshCw, TrendingUp } from 'lucide-react';

// ── Score ring component ─────────────────────────────
const Ring = ({ value, max = 10, label }) => {
  const pct   = Math.min(100, (value / max) * 100);
  const r     = 28;
  const circ  = 2 * Math.PI * r;
  const dash  = (pct / 100) * circ;
  const color = pct >= 75 ? '#00C896' : pct >= 55 ? '#A3E635' : '#38BDF8';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dasharray 0.8s ease', filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
        <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{value}</text>
      </svg>
      <p className="text-xs text-center font-semibold" style={{ color: '#D6F4F4', maxWidth: '80px' }}>{label}</p>
    </div>
  );
};

// ── List card ────────────────────────────────────────
const ListCard = ({ title, items, accent }) => (
  <div className="rounded-2xl p-5" style={{ background: 'rgba(18,39,56,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: accent }}>{title}</h3>
    <ul className="space-y-2">
      {(items || []).map((item, i) => (
        <li key={i} className="flex gap-2 text-sm" style={{ color: '#D6F4F4' }}>
          <span style={{ color: accent, flexShrink: 0 }}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function AIEvaluation() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [idea,       setIdea]       = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [status,     setStatus]     = useState('loading'); // loading | ready | evaluating | done | error
  const [errMsg,     setErrMsg]     = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [ideaData, existing] = await Promise.all([
          ideaService.getIdeaById(id),
          aiService.getAIFeedback(id).catch(() => null),
        ]);
        if (!mounted) return;
        setIdea(ideaData);
        if (existing && existing.overallScore != null) {
          setEvaluation(mapFeedback(existing));
          setStatus('done');
        } else {
          setStatus('ready');
        }
      } catch (e) {
        if (mounted) { setStatus('error'); setErrMsg('Failed to load idea.'); }
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const mapFeedback = (f) => ({
    originalityScore:          f.originalityScore,
    innovationScore:           f.innovationScore,
    technicalFeasibilityScore: f.technicalFeasibilityScore,
    technicalComplexityScore:  f.technicalComplexityScore,
    marketPotentialScore:      f.marketPotentialScore,
    scalabilityScore:          f.scalabilityScore,
    socialImpactScore:         f.socialImpactScore,
    sustainabilityScore:       f.sustainabilityScore,
    overallScore:              f.overallScore,
    strengths:   typeof f.strengths  === 'string' ? f.strengths.split(',').map(s => s.trim()).filter(Boolean)  : (f.strengths  || []),
    weaknesses:  typeof f.weaknesses === 'string' ? f.weaknesses.split(',').map(s => s.trim()).filter(Boolean) : (f.weaknesses || []),
    suggestions: typeof f.suggestions=== 'string' ? f.suggestions.split(',').map(s => s.trim()).filter(Boolean): (f.suggestions|| []),
    futureScope: f.futureScope,
  });

  const handleEvaluate = async () => {
    setStatus('evaluating');
    setErrMsg('');
    try {
      const data = await aiService.evaluateIdea(id);
      setEvaluation(data);
      setStatus('done');
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Evaluation failed. Please try again.';
      setErrMsg(msg);
      setStatus('error');
    }
  };

  // ── Render helpers ──────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#041C32' }}>
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#00C896', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const scores = evaluation ? [
    { label: 'Originality',          value: evaluation.originalityScore },
    { label: 'Innovation',           value: evaluation.innovationScore },
    { label: 'Tech Feasibility',     value: evaluation.technicalFeasibilityScore },
    { label: 'Tech Complexity',      value: evaluation.technicalComplexityScore },
    { label: 'Market Potential',     value: evaluation.marketPotentialScore },
    { label: 'Scalability',          value: evaluation.scalabilityScore },
    { label: 'Social Impact',        value: evaluation.socialImpactScore },
    { label: 'Sustainability',       value: evaluation.sustainabilityScore },
  ].filter(s => s.value != null) : [];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#041C32 0%,#06283D 100%)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        {/* Back + title */}
        <button onClick={() => navigate('/my-ideas')}
          className="text-sm font-medium mb-6 flex items-center gap-1 transition-colors"
          style={{ color: '#00C896' }}
          onMouseOver={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseOut={e  => e.currentTarget.style.color = '#00C896'}>
          ← Back to My Ideas
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 0 20px rgba(0,200,150,0.4)' }}>
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Evaluation</h1>
            <p className="text-sm" style={{ color: '#D6F4F4' }}>{idea?.title}</p>
          </div>
        </div>

        {/* Error state */}
        {status === 'error' && (
          <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <p className="text-red-400 font-semibold">{errMsg || 'Something went wrong.'}</p>
            <button onClick={handleEvaluate} className="mt-3 px-4 py-2 rounded-xl text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)' }}>
              Try Again
            </button>
          </div>
        )}

        {/* Ready — no evaluation yet */}
        {(status === 'ready' || status === 'evaluating') && (
          <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(18,39,56,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-6xl mb-5">🤖</div>
            <h2 className="text-xl font-bold text-white mb-3">Get AI-Powered Evaluation</h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: '#D6F4F4' }}>
              Our AI evaluates your idea on 8 dimensions — originality, innovation, technical feasibility,
              market potential, scalability, social impact, and more.
            </p>
            <button onClick={handleEvaluate} disabled={status === 'evaluating'}
              className="px-8 py-3 rounded-xl font-bold text-white disabled:opacity-60 flex items-center gap-2 mx-auto"
              style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 4px 20px rgba(0,200,150,0.35)' }}>
              {status === 'evaluating'
                ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Evaluating...</>
                : <><Brain className="w-4 h-4" /> Start AI Evaluation</>}
            </button>
          </div>
        )}

        {/* Done — show results */}
        {status === 'done' && evaluation && (
          <div className="space-y-6">

            {/* Overall score banner */}
            <div className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,rgba(0,200,150,0.15),rgba(56,189,248,0.15))', border: '1px solid rgba(0,200,150,0.3)' }}>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#D6F4F4' }}>Overall AI Score</p>
              <p className="text-7xl font-black text-white" style={{ textShadow: '0 0 30px rgba(0,200,150,0.6)' }}>
                {evaluation.overallScore}
                <span className="text-2xl font-bold" style={{ color: '#D6F4F4' }}>/100</span>
              </p>
            </div>

            {/* Score rings */}
            {scores.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: 'rgba(18,39,56,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-bold text-white mb-5">Detailed Scores</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 justify-items-center">
                  {scores.map(s => <Ring key={s.label} label={s.label} value={s.value} />)}
                </div>
              </div>
            )}

            {/* Strengths / Weaknesses / Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ListCard title="✅ Strengths"   items={evaluation.strengths}   accent="#00C896" />
              <ListCard title="⚠️ Weaknesses"  items={evaluation.weaknesses}  accent="#F97316" />
              <ListCard title="💡 Suggestions" items={evaluation.suggestions} accent="#38BDF8" />
            </div>

            {/* Future scope */}
            {evaluation.futureScope && (
              <div className="rounded-2xl p-5" style={{ background: 'rgba(18,39,56,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-bold text-white mb-3">🔭 Future Scope</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#D6F4F4' }}>{evaluation.futureScope}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button onClick={handleEvaluate} disabled={status === 'evaluating'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-50"
                style={{ border: '1px solid rgba(0,200,150,0.5)', color: '#00C896', background: 'rgba(0,200,150,0.08)' }}>
                <RefreshCw className="w-4 h-4" /> Re-evaluate
              </button>
              <button onClick={() => navigate(`/ai-improvement/${id}`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 4px 16px rgba(0,200,150,0.3)' }}>
                <TrendingUp className="w-4 h-4" /> Get Improvement Suggestions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
