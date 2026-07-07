import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ideaService from '../../services/ideaService';
import aiService from '../../services/aiService';
import Navbar from '../../components/Navbar/Navbar';
import { TrendingUp, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';

// ── Card component ───────────────────────────────
const ImpCard = ({ emoji, title, accent, children }) => (
  <div className="rounded-2xl p-5"
    style={{ background: 'rgba(18,39,56,0.9)', border: `1px solid ${accent}33` }}>
    <h3 className="font-bold text-base mb-3 flex items-center gap-2"
      style={{ color: accent }}>
      <span>{emoji}</span> {title}
    </h3>
    {children}
  </div>
);

// ── List items ───────────────────────────────────
const ImpList = ({ items, accent }) => (
  <ul className="space-y-2">
    {(items || []).filter(Boolean).map((item, i) => (
      <li key={i} className="flex gap-2 text-sm" style={{ color: '#D6F4F4' }}>
        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function AIImprovement() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [idea,       setIdea]       = useState(null);
  const [imp,        setImp]        = useState(null);  // improvements data
  const [status,     setStatus]     = useState('loading'); // loading|ready|generating|done|error
  const [errMsg,     setErrMsg]     = useState('');

  useEffect(() => {
    ideaService.getIdeaById(id)
      .then(d => { setIdea(d); setStatus('ready'); })
      .catch(() => { setStatus('error'); setErrMsg('Failed to load idea.'); });
  }, [id]);

  const generate = async () => {
    setStatus('generating');
    setErrMsg('');
    try {
      const data = await aiService.improveIdea(id);
      // Normalize keys — handle both snake_case (from AI agent) and camelCase (from backend DTO)
      const norm = {
        betterTitle:              data.betterTitle              || data.better_title              || '',
        betterAbstract:           data.betterAbstract           || data.better_abstract           || '',
        betterProblemStatement:   data.betterProblemStatement   || data.better_problem_statement  || '',
        betterSolution:           data.betterSolution           || data.better_solution           || '',
        betterTechStack:          data.betterTechStack          || data.better_tech_stack          || '',
        betterFeatures:           data.betterFeatures           || data.better_features           || [],
        futureEnhancements:       data.futureEnhancements       || data.future_enhancements       || [],
      };
      setImp(norm);
      setStatus('done');
    } catch (e) {
      setErrMsg(e?.response?.data?.message || e?.message || 'Failed to generate improvements.');
      setStatus('error');
    }
  };

  // ── Render ───────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#041C32' }}>
        <div className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{ borderColor: '#00C896', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#041C32 0%,#06283D 100%)' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        {/* Back */}
        <button onClick={() => navigate(`/ai-evaluation/${id}`)}
          className="text-sm font-medium mb-6 transition-colors"
          style={{ color: '#00C896' }}
          onMouseOver={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseOut={e  => e.currentTarget.style.color = '#00C896'}>
          ← Back to AI Evaluation
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#A3E635,#00C896)', boxShadow: '0 0 20px rgba(163,230,53,0.35)' }}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Improvement Suggestions</h1>
            <p className="text-sm" style={{ color: '#D6F4F4' }}>{idea?.title}</p>
          </div>
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="rounded-2xl p-5 mb-6"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <p className="text-red-400 font-semibold mb-3">{errMsg}</p>
            <button onClick={generate}
              className="px-5 py-2 rounded-xl text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)' }}>
              Try Again
            </button>
          </div>
        )}

        {/* Ready — no improvements yet */}
        {(status === 'ready' || status === 'generating') && (
          <div className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(18,39,56,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-6xl mb-5">💡</div>
            <h2 className="text-xl font-bold text-white mb-3">Generate AI Improvement Suggestions</h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: '#D6F4F4' }}>
              Our AI will suggest a better title, enhanced abstract, refined problem statement,
              improved solution, tech stack recommendations, new features, and future roadmap.
            </p>
            <button onClick={generate} disabled={status === 'generating'}
              className="px-8 py-3 rounded-xl font-bold text-white disabled:opacity-60 flex items-center gap-2 mx-auto"
              style={{ background: 'linear-gradient(135deg,#A3E635,#00C896)', boxShadow: '0 4px 20px rgba(163,230,53,0.3)' }}>
              {status === 'generating'
                ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Generating...</>
                : <><TrendingUp className="w-4 h-4" />Generate Suggestions</>}
            </button>
          </div>
        )}

        {/* Done — show results */}
        {status === 'done' && imp && (
          <div className="space-y-4">

            {/* Better Title */}
            {imp.betterTitle && (
              <ImpCard emoji="✏️" title="Improved Title" accent="#A3E635">
                <p className="text-white font-semibold text-lg">{imp.betterTitle}</p>
              </ImpCard>
            )}

            {/* Better Abstract */}
            {imp.betterAbstract && (
              <ImpCard emoji="📝" title="Enhanced Abstract" accent="#00C896">
                <p className="text-sm leading-relaxed" style={{ color: '#D6F4F4' }}>{imp.betterAbstract}</p>
              </ImpCard>
            )}

            {/* Better Problem Statement */}
            {imp.betterProblemStatement && (
              <ImpCard emoji="🎯" title="Refined Problem Statement" accent="#38BDF8">
                <p className="text-sm leading-relaxed" style={{ color: '#D6F4F4' }}>{imp.betterProblemStatement}</p>
              </ImpCard>
            )}

            {/* Better Solution */}
            {imp.betterSolution && (
              <ImpCard emoji="💡" title="Improved Proposed Solution" accent="#00C896">
                <p className="text-sm leading-relaxed" style={{ color: '#D6F4F4' }}>{imp.betterSolution}</p>
              </ImpCard>
            )}

            {/* Better Tech Stack */}
            {imp.betterTechStack && (
              <ImpCard emoji="⚙️" title="Recommended Technology Stack" accent="#38BDF8">
                <p className="text-sm" style={{ color: '#D6F4F4' }}>{imp.betterTechStack}</p>
              </ImpCard>
            )}

            {/* Better Features */}
            {imp.betterFeatures?.length > 0 && (
              <ImpCard emoji="✨" title="Suggested New Features" accent="#A3E635">
                <ImpList items={imp.betterFeatures} accent="#A3E635" />
              </ImpCard>
            )}

            {/* Future Enhancements */}
            {imp.futureEnhancements?.length > 0 && (
              <ImpCard emoji="🔭" title="Future Enhancements & Roadmap" accent="#00C896">
                <ImpList items={imp.futureEnhancements} accent="#00C896" />
              </ImpCard>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={generate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{ border: '1px solid rgba(163,230,53,0.4)', color: '#A3E635', background: 'rgba(163,230,53,0.08)' }}>
                <RefreshCw className="w-4 h-4" /> Regenerate
              </button>
              <button onClick={() => navigate('/my-ideas')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#00C896,#38BDF8)', boxShadow: '0 4px 16px rgba(0,200,150,0.3)' }}>
                Back to My Ideas <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
