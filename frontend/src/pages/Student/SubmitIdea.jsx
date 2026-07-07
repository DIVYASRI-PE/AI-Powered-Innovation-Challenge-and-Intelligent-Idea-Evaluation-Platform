import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ideaService from '../../services/ideaService';
import challengeService from '../../services/challengeService';
import Navbar from '../../components/Navbar/Navbar';

const DOMAINS = ['Artificial Intelligence','Web Development','Mobile Applications','IoT & Embedded Systems','Cybersecurity','Healthcare Technology','Education Technology','Sustainability & Green Tech','Data Science','Blockchain','Other'];

const Textarea = ({ label, name, value, onChange, placeholder, required, rows = 3 }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <textarea name={name} value={value} onChange={onChange} rows={rows} required={required}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-none transition-all" />
  </div>
);

const Input = ({ label, name, type = 'text', value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all" />
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
    <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

export default function SubmitIdea() {
  const [challenges, setChallenges] = useState([]);
  const [form, setForm] = useState({
    challengeId: '', title: '', domain: '',
    ideaAbstract: '', problemStatement: '', currentExistingSolution: '',
    proposedSolution: '', objectives: '', technologyStack: '',
    expectedOutcome: '', innovationHighlights: '', futureScope: '',
    teamMembers: '', githubLink: '', demoVideoLink: '', estimatedBudget: '',
    status: 'DRAFT',
  });
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    challengeService.getActiveChallenges()
      .then(d => setChallenges(d || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (isDraft = false) => {
    setError('');
    if (!form.challengeId) { setError('Please select a challenge.'); return; }
    if (!form.title.trim()) { setError('Project title is required.'); return; }
    setSubmitting(true);
    try {
      await ideaService.createIdea({ ...form, status: isDraft ? 'DRAFT' : 'SUBMITTED' });
      navigate('/my-ideas');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting idea. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        <div className="mb-6">
          <button onClick={() => navigate('/dashboard')} className="text-violet-600 hover:text-violet-800 text-sm font-medium mb-3">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Submit Your Idea</h1>
          <p className="text-gray-500 mt-1">Share your innovative project with the community</p>
        </div>

        {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

        <div className="space-y-6">

          {/* Basic Info */}
          <Section title="🏆 Basic Information">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Challenge <span className="text-red-500">*</span></label>
              <select name="challengeId" value={form.challengeId} onChange={set} required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white">
                <option value="">-- Select a Challenge --</option>
                {challenges.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} {c.deadline ? `· Deadline: ${new Date(c.deadline).toLocaleDateString()}` : ''}
                  </option>
                ))}
              </select>
              {challenges.length === 0 && <p className="text-xs text-amber-600 mt-1">No active challenges available yet.</p>}
            </div>

            <Input label="Project Title" name="title" value={form.title} onChange={set} placeholder="Enter your project title" required />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Domain / Category <span className="text-red-500">*</span></label>
              <select name="domain" value={form.domain} onChange={set} required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white">
                <option value="">-- Select Domain --</option>
                {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <Textarea label="Abstract" name="ideaAbstract" value={form.ideaAbstract} onChange={set}
              placeholder="Brief overview of your project (max 200 words)" required rows={4} />
          </Section>

          {/* Problem & Solution */}
          <Section title="💡 Problem & Solution">
            <Textarea label="Problem Statement" name="problemStatement" value={form.problemStatement} onChange={set}
              placeholder="Clearly describe the problem your project addresses" required rows={4} />
            <Textarea label="Current Existing Solutions" name="currentExistingSolution" value={form.currentExistingSolution} onChange={set}
              placeholder="What solutions already exist? What are their limitations?" rows={3} />
            <Textarea label="Proposed Solution" name="proposedSolution" value={form.proposedSolution} onChange={set}
              placeholder="How does your solution solve the problem better?" required rows={4} />
            <Textarea label="Objectives" name="objectives" value={form.objectives} onChange={set}
              placeholder="List the main objectives (one per line)" required rows={3} />
          </Section>

          {/* Technical Details */}
          <Section title="⚙️ Technical Details">
            <Textarea label="Technology Stack" name="technologyStack" value={form.technologyStack} onChange={set}
              placeholder="Languages, frameworks, databases, APIs, tools..." required rows={3} />
            <Textarea label="Expected Outcome" name="expectedOutcome" value={form.expectedOutcome} onChange={set}
              placeholder="What will you deliver? What measurable results do you expect?" required rows={3} />
            <Input label="Estimated Budget (optional)" name="estimatedBudget" value={form.estimatedBudget} onChange={set}
              placeholder="e.g. ₹5000 - ₹10000 or No budget required" />
          </Section>

          {/* Innovation & Future */}
          <Section title="🚀 Innovation & Future Scope">
            <Textarea label="Innovation Highlights" name="innovationHighlights" value={form.innovationHighlights} onChange={set}
              placeholder="What makes your project unique and innovative?" required rows={3} />
            <Textarea label="Future Scope" name="futureScope" value={form.futureScope} onChange={set}
              placeholder="How can this project be extended or scaled in the future?" rows={3} />
          </Section>

          {/* Team & Links */}
          <Section title="👥 Team & References">
            <Textarea label="Team Members (optional)" name="teamMembers" value={form.teamMembers} onChange={set}
              placeholder="List team member names, roll numbers, departments (one per line)" rows={3} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="GitHub Repository Link" name="githubLink" value={form.githubLink} onChange={set}
                placeholder="https://github.com/..." />
              <Input label="Demo Video Link" name="demoVideoLink" value={form.demoVideoLink} onChange={set}
                placeholder="https://youtube.com/... or Google Drive link" />
            </div>
          </Section>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button onClick={() => handleSubmit(true)} disabled={submitting}
              className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50">
              {submitting ? 'Saving...' : '💾 Save as Draft'}
            </button>
            <button onClick={() => handleSubmit(false)} disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50">
              {submitting ? 'Submitting...' : '🚀 Submit Idea'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
