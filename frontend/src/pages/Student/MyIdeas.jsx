import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ideaService from '../../services/ideaService';
import reviewService from '../../services/reviewService';
import aiService from '../../services/aiService';
import Navbar from '../../components/Navbar/Navbar';
import { FileText, Brain, TrendingUp, Trash2, Send, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const STATUS_STYLES = {
  DRAFT:             'bg-yellow-100 text-yellow-800',
  SUBMITTED:         'bg-blue-100 text-blue-800',
  UNDER_REVIEW:      'bg-purple-100 text-purple-800',
  AI_EVALUATED:      'bg-indigo-100 text-indigo-800',
  FACULTY_REVIEWED:  'bg-orange-100 text-orange-800',
  APPROVED:          'bg-green-100 text-green-800',
  REJECTED:          'bg-red-100 text-red-800',
  NEEDS_IMPROVEMENT: 'bg-amber-100 text-amber-800',
  WINNER:            'bg-yellow-200 text-yellow-900',
};

const ScoreBar = ({ label, value, max = 10, color = 'violet' }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs font-medium mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={`text-${color}-600 font-bold`}>{value}/{max}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const IdeaCard = ({ idea, onDelete, onSubmit }) => {
  const navigate = useNavigate();
  const [expanded,  setExpanded]  = useState(false);
  const [aiReport,  setAiReport]  = useState(null);
  const [reviews,   setReviews]   = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingRv, setLoadingRv] = useState(false);
  const [aiError,   setAiError]   = useState('');

  const loadDetails = async () => {
    if (expanded) { setExpanded(false); return; }
    setExpanded(true);
    // Load AI feedback
    if (!aiReport) {
      setLoadingAI(true);
      try {
        const r = await aiService.getAIFeedback(idea.id);
        setAiReport(r);
      } catch { setAiError('No AI evaluation yet.'); }
      finally { setLoadingAI(false); }
    }
    // Load faculty reviews
    if (reviews.length === 0) {
      setLoadingRv(true);
      try {
        const r = await reviewService.getReviewsByIdea(idea.id);
        setReviews(r || []);
      } catch {}
      finally { setLoadingRv(false); }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1">{idea.title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${STATUS_STYLES[idea.status] || 'bg-gray-100 text-gray-700'}`}>
            {idea.status?.replace('_', ' ')}
          </span>
        </div>

        {idea.challengeTitle && (
          <p className="text-xs text-violet-600 font-medium mb-2">🏆 {idea.challengeTitle}</p>
        )}
        {idea.domain && (
          <p className="text-xs text-gray-500 mb-2">📂 {idea.domain}</p>
        )}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {idea.ideaAbstract || idea.problemStatement || 'No description'}
        </p>

        {idea.overallScore && (
          <div className="mb-3 p-3 bg-violet-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Overall Score</p>
            <p className="text-2xl font-bold text-violet-600">{idea.overallScore}<span className="text-sm text-gray-400">/100</span></p>
          </div>
        )}

        <p className="text-xs text-gray-400 mb-4">{new Date(idea.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {idea.status === 'DRAFT' && (
            <button onClick={() => onSubmit(idea.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors">
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
          )}
          <button onClick={() => navigate(`/ai-evaluation/${idea.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold hover:bg-violet-700 transition-colors">
            <Brain className="w-3.5 h-3.5" /> AI Evaluate
          </button>
          <button onClick={() => navigate(`/ai-improvement/${idea.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors">
            <TrendingUp className="w-3.5 h-3.5" /> Improve
          </button>
          {idea.status === 'DRAFT' && (
            <button onClick={() => onDelete(idea.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}
          <button onClick={loadDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors ml-auto">
            {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Hide Report</> : <><ChevronDown className="w-3.5 h-3.5" /> View Report</>}
          </button>
        </div>
      </div>

      {/* Expanded Report */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-5">

          {/* Extra fields */}
          {(idea.githubLink || idea.demoVideoLink) && (
            <div className="flex flex-wrap gap-3">
              {idea.githubLink && (
                <a href={idea.githubLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium">
                  <ExternalLink className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {idea.demoVideoLink && (
                <a href={idea.demoVideoLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium">
                  <ExternalLink className="w-3.5 h-3.5" /> Demo Video
                </a>
              )}
            </div>
          )}

          {/* AI Report */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Brain className="w-4 h-4 text-violet-600" /> AI Evaluation Report</h4>
            {loadingAI ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /> Loading AI report...
              </div>
            ) : aiError ? (
              <div className="text-sm text-gray-400 italic p-3 bg-white rounded-xl border border-gray-100">
                {aiError} <button onClick={() => navigate(`/ai-evaluation/${idea.id}`)} className="text-violet-600 font-semibold hover:underline ml-1">Run evaluation →</button>
              </div>
            ) : aiReport ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {aiReport.originalityScore           != null && <ScoreBar label="Originality"           value={aiReport.originalityScore} color="violet" />}
                  {aiReport.innovationScore             != null && <ScoreBar label="Innovation"             value={aiReport.innovationScore} color="indigo" />}
                  {aiReport.technicalFeasibilityScore   != null && <ScoreBar label="Technical Feasibility"  value={aiReport.technicalFeasibilityScore} color="blue" />}
                  {aiReport.technicalComplexityScore    != null && <ScoreBar label="Technical Complexity"   value={aiReport.technicalComplexityScore} color="cyan" />}
                  {aiReport.marketPotentialScore        != null && <ScoreBar label="Market Potential"       value={aiReport.marketPotentialScore} color="emerald" />}
                  {aiReport.scalabilityScore            != null && <ScoreBar label="Scalability"            value={aiReport.scalabilityScore} color="teal" />}
                  {aiReport.socialImpactScore           != null && <ScoreBar label="Social Impact"          value={aiReport.socialImpactScore} color="green" />}
                  {aiReport.sustainabilityScore         != null && <ScoreBar label="Sustainability"         value={aiReport.sustainabilityScore} color="lime" />}
                </div>
                {aiReport.overallScore != null && (
                  <div className="p-3 bg-violet-50 rounded-xl text-center">
                    <p className="text-xs text-gray-500">AI Overall Score</p>
                    <p className="text-3xl font-bold text-violet-600">{aiReport.overallScore}<span className="text-sm text-gray-400">/100</span></p>
                  </div>
                )}
                {aiReport.strengths?.length > 0 && (
                  <div><p className="text-xs font-bold text-green-700 mb-1">✅ Strengths</p>
                    <ul className="space-y-1">{aiReport.strengths.map((s, i) => <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-green-500">•</span>{s}</li>)}</ul>
                  </div>
                )}
                {aiReport.weaknesses?.length > 0 && (
                  <div><p className="text-xs font-bold text-red-700 mb-1">⚠️ Weaknesses</p>
                    <ul className="space-y-1">{aiReport.weaknesses.map((w, i) => <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-red-400">•</span>{w}</li>)}</ul>
                  </div>
                )}
                {aiReport.suggestions?.length > 0 && (
                  <div><p className="text-xs font-bold text-blue-700 mb-1">💡 Suggestions</p>
                    <ul className="space-y-1">{aiReport.suggestions.map((s, i) => <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-blue-400">•</span>{s}</li>)}</ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Faculty Review */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">👩‍🏫 Faculty Review</h4>
            {loadingRv ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /> Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-gray-400 italic p-3 bg-white rounded-xl border border-gray-100">No faculty review yet.</p>
            ) : reviews.map(rv => (
              <div key={rv.id} className="p-4 bg-white rounded-xl border border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-800">{rv.reviewerName}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${rv.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{rv.status}</span>
                </div>
                {rv.overallScore != null && (
                  <div className="p-2 bg-orange-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Faculty Score</p>
                    <p className="text-2xl font-bold text-orange-600">{rv.overallScore}<span className="text-sm text-gray-400">/10</span></p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {rv.originalityScore != null           && <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-500">Originality</p><p className="font-bold text-gray-800">{rv.originalityScore}/10</p></div>}
                  {rv.innovationScore != null             && <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-500">Innovation</p><p className="font-bold text-gray-800">{rv.innovationScore}/10</p></div>}
                  {rv.technicalFeasibilityScore != null   && <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-500">Technical</p><p className="font-bold text-gray-800">{rv.technicalFeasibilityScore}/10</p></div>}
                  {rv.presentationScore != null           && <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-500">Presentation</p><p className="font-bold text-gray-800">{rv.presentationScore}/10</p></div>}
                </div>
                {rv.comments && <div><p className="text-xs font-semibold text-gray-500 mb-1">Comments</p><p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">{rv.comments}</p></div>}
                {rv.feedback  && <div><p className="text-xs font-semibold text-gray-500 mb-1">Feedback & Suggestions</p><p className="text-sm text-gray-700 bg-blue-50 p-2 rounded-lg">{rv.feedback}</p></div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function MyIdeas() {
  const [ideas,   setIdeas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try { setIdeas((await ideaService.getMyIdeas()) || []); }
    catch { setIdeas([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this idea?')) return;
    await ideaService.deleteIdea(id);
    load();
  };

  const handleSubmit = async id => {
    await ideaService.updateIdeaStatus(id, 'SUBMITTED');
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={() => navigate('/dashboard')} className="text-violet-600 hover:text-violet-800 text-sm font-medium mb-2">← Back to Dashboard</button>
            <h1 className="text-3xl font-bold text-gray-900">My Ideas</h1>
            <p className="text-gray-500 text-sm mt-1">{ideas.length} idea{ideas.length !== 1 ? 's' : ''} total</p>
          </div>
          <button onClick={() => navigate('/submit-idea')}
            className="bg-violet-600 text-white px-5 py-2.5 rounded-xl hover:bg-violet-700 font-semibold text-sm shadow-md transition-all">
            + New Idea
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : ideas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <FileText className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">No ideas yet</h2>
            <p className="text-gray-400 mb-6">Start by submitting your first innovation idea!</p>
            <button onClick={() => navigate('/submit-idea')}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 font-semibold">
              Submit Your First Idea
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {ideas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} onDelete={handleDelete} onSubmit={handleSubmit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
