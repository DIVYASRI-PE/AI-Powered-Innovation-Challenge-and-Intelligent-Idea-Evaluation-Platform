import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ideaService from '../../services/ideaService';
import aiService from '../../services/aiService';
import Navbar from '../../components/Navbar/Navbar';
import { Shield, ArrowRight, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const BG      = '#041C32';
const BG2     = '#06283D';
const PRIMARY = '#00C896';
const ACCENT  = '#38BDF8';
const SOFT    = '#D6F4F4';
const BORDER  = 'rgba(255,255,255,0.10)';
const CARD    = 'rgba(18,39,56,0.9)';

const selectStyle = {
  background: 'rgba(6,40,61,0.85)',
  border: `1px solid ${BORDER}`,
  color: '#fff',
  borderRadius: '0.75rem',
  padding: '0.65rem 1rem',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
};

export default function SimilarityChecker() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  const [ideas,   setIdeas]   = useState([]);
  const [id1,     setId1]     = useState('');
  const [id2,     setId2]     = useState('');
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking,setChecking]= useState(false);
  const [error,   setError]   = useState('');

  const isStudent = user?.role?.toLowerCase() === 'student';

  useEffect(() => {
    // Students see only their own ideas; Faculty/Admin see all submitted ideas
    const fetchFn = isStudent
      ? ideaService.getMyIdeas()
      : ideaService.getAllIdeas ? ideaService.getAllIdeas() : ideaService.getIdeasByStatus?.('SUBMITTED');

    Promise.resolve(fetchFn)
      .then(d => setIdeas(d || []))
      .catch(() => setIdeas([]))
      .finally(() => setLoading(false));
  }, []);

  const checkSimilarity = async () => {
    if (!id1 || !id2)       { setError('Please select two ideas to compare.'); return; }
    if (id1 === id2)         { setError('Please select two different ideas.');  return; }
    setError('');
    setChecking(true);
    try {
      const data = await aiService.checkSimilarity(id1, id2);
      // Normalize snake_case / camelCase from AI agent
      const norm = {
        similarityPercentage: data.similarityPercentage ?? data.similarity_percentage ?? 0,
        isDuplicate:          data.isDuplicate          ?? data.is_duplicate           ?? false,
        semanticSimilarity:   data.semanticSimilarity   ?? data.semantic_similarity    ?? '',
        technicalSimilarity:  data.technicalSimilarity  ?? data.technical_similarity   ?? '',
        marketOverlap:        data.marketOverlap        ?? data.market_overlap         ?? '',
        relatedAspects:       data.relatedAspects       ?? data.related_aspects        ?? [],
        uniqueAspectsIdea1:   data.uniqueAspectsIdea1   ?? data.unique_aspects_idea1   ?? [],
        uniqueAspectsIdea2:   data.uniqueAspectsIdea2   ?? data.unique_aspects_idea2   ?? [],
      };
      setResult(norm);
    } catch (e) {
      setError(e?.response?.data?.message || 'Error checking similarity. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  const pct      = result?.similarityPercentage ?? 0;
  const pctNum   = typeof pct === 'number' ? pct : parseFloat(pct) || 0;
  const pctColor = pctNum >= 70 ? '#EF4444' : pctNum >= 40 ? '#F97316' : PRIMARY;

  const idea1 = ideas.find(i => String(i.id) === String(id1));
  const idea2 = ideas.find(i => String(i.id) === String(id2));

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        {/* Back */}
        <button onClick={() => navigate('/dashboard')}
          className="text-sm font-medium mb-6 transition-colors"
          style={{ color: PRIMARY }}
          onMouseOver={e => e.currentTarget.style.color = ACCENT}
          onMouseOut={e  => e.currentTarget.style.color = PRIMARY}>
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})`, boxShadow: `0 0 20px rgba(0,200,150,0.35)` }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Similarity Checker</h1>
            <p className="text-sm" style={{ color: SOFT }}>
              Check semantic similarity between {isStudent ? 'your' : 'submitted'} ideas
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Selector card */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <h2 className="font-bold text-white text-lg mb-5">Select Two Ideas to Compare</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 rounded-full border-4 animate-spin"
                style={{ borderColor: PRIMARY, borderTopColor: 'transparent' }} />
            </div>
          ) : ideas.length < 2 ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-30 text-white" />
              <p className="font-semibold text-white mb-1">Not enough ideas to compare</p>
              <p className="text-sm mb-4" style={{ color: SOFT }}>
                {isStudent ? 'You need at least 2 submitted ideas.' : 'No submitted ideas available yet.'}
              </p>
              {isStudent && (
                <button onClick={() => navigate('/submit-idea')}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})` }}>
                  Submit an Idea
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* First idea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: SOFT }}>First Idea</label>
                  <select value={id1} onChange={e => setId1(e.target.value)} style={selectStyle}
                    onFocus={e => e.target.style.borderColor = PRIMARY}
                    onBlur={e  => e.target.style.borderColor = BORDER}>
                    <option value="">-- Select first idea --</option>
                    {ideas.map(idea => (
                      <option key={idea.id} value={idea.id}>
                        {idea.title}{idea.userName ? ` — ${idea.userName}` : ''}
                      </option>
                    ))}
                  </select>
                  {idea1 && (
                    <div className="mt-2 p-3 rounded-xl text-xs" style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', color: SOFT }}>
                      <p className="font-semibold text-white">{idea1.title}</p>
                      {idea1.domain && <p className="opacity-70">{idea1.domain}</p>}
                      {idea1.ideaAbstract && <p className="line-clamp-2 mt-1">{idea1.ideaAbstract}</p>}
                    </div>
                  )}
                </div>

                {/* Second idea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: SOFT }}>Second Idea</label>
                  <select value={id2} onChange={e => setId2(e.target.value)} style={selectStyle}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e  => e.target.style.borderColor = BORDER}>
                    <option value="">-- Select second idea --</option>
                    {ideas.filter(i => String(i.id) !== String(id1)).map(idea => (
                      <option key={idea.id} value={idea.id}>
                        {idea.title}{idea.userName ? ` — ${idea.userName}` : ''}
                      </option>
                    ))}
                  </select>
                  {idea2 && (
                    <div className="mt-2 p-3 rounded-xl text-xs" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', color: SOFT }}>
                      <p className="font-semibold text-white">{idea2.title}</p>
                      {idea2.domain && <p className="opacity-70">{idea2.domain}</p>}
                      {idea2.ideaAbstract && <p className="line-clamp-2 mt-1">{idea2.ideaAbstract}</p>}
                    </div>
                  )}
                </div>
              </div>

              <button onClick={checkSimilarity} disabled={checking || !id1 || !id2}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})`, boxShadow: `0 4px 20px rgba(0,200,150,0.3)` }}>
                {checking
                  ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Checking...</>
                  : <><Shield className="w-4 h-4" />Check Similarity<ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">

            {/* Big percentage */}
            <div className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: CARD, border: `1px solid ${pctColor}44` }}>
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: SOFT }}>Similarity Score</p>
              <p className="text-7xl font-black" style={{ color: pctColor, textShadow: `0 0 30px ${pctColor}66` }}>
                {pctNum.toFixed(1)}<span className="text-2xl">%</span>
              </p>
              {result.isDuplicate && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171' }}>
                  <AlertTriangle className="w-4 h-4" /> WARNING: These ideas appear to be duplicates!
                </div>
              )}
              {!result.isDuplicate && pctNum < 40 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(0,200,150,0.12)', border: `1px solid ${PRIMARY}44`, color: PRIMARY }}>
                  <CheckCircle className="w-4 h-4" /> Ideas are sufficiently unique!
                </div>
              )}
            </div>

            {/* Analysis cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.semanticSimilarity && (
                <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: PRIMARY }}>🧠 Semantic Similarity</p>
                  <p className="text-sm" style={{ color: SOFT }}>{result.semanticSimilarity}</p>
                </div>
              )}
              {result.technicalSimilarity && (
                <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>⚙️ Technical Similarity</p>
                  <p className="text-sm" style={{ color: SOFT }}>{result.technicalSimilarity}</p>
                </div>
              )}
              {result.marketOverlap && (
                <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#A3E635' }}>📈 Market Overlap</p>
                  <p className="text-sm" style={{ color: SOFT }}>{result.marketOverlap}</p>
                </div>
              )}
            </div>

            {/* Lists */}
            {(result.relatedAspects?.length > 0 || result.uniqueAspectsIdea1?.length > 0 || result.uniqueAspectsIdea2?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.relatedAspects?.length > 0 && (
                  <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>🔗 Common Aspects</p>
                    <ul className="space-y-1.5">
                      {result.relatedAspects.map((a, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: SOFT }}>
                          <span style={{ color: '#F97316' }}>•</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.uniqueAspectsIdea1?.length > 0 && (
                  <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: PRIMARY }}>
                      ✨ Unique — {idea1?.title?.substring(0,20) || 'Idea 1'}
                    </p>
                    <ul className="space-y-1.5">
                      {result.uniqueAspectsIdea1.map((a, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: SOFT }}>
                          <span style={{ color: PRIMARY }}>•</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.uniqueAspectsIdea2?.length > 0 && (
                  <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>
                      ✨ Unique — {idea2?.title?.substring(0,20) || 'Idea 2'}
                    </p>
                    <ul className="space-y-1.5">
                      {result.uniqueAspectsIdea2.map((a, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: SOFT }}>
                          <span style={{ color: ACCENT }}>•</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Re-check */}
            <button onClick={checkSimilarity} disabled={checking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ border: `1px solid rgba(0,200,150,0.4)`, color: PRIMARY, background: 'rgba(0,200,150,0.08)' }}>
              <RefreshCw className="w-4 h-4" /> Re-check
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
