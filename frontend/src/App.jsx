import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicOnlyRoute from './components/ProtectedRoute/PublicOnlyRoute';

// Common pages
import Home        from './pages/Common/Home';
import Leaderboard from './pages/Common/Leaderboard';
import Profile     from './pages/Common/Profile';

// Auth pages
import Login    from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';

// Student pages
import Dashboard           from './pages/Student/Dashboard';
import SubmitIdea          from './pages/Student/SubmitIdea';
import MyIdeas             from './pages/Student/MyIdeas';
import AIEvaluationSelect  from './pages/Student/AIEvaluationSelect';
import AIEvaluation        from './pages/Student/AIEvaluation';
import AIImprovementSelect from './pages/Student/AIImprovementSelect';
import AIImprovement       from './pages/Student/AIImprovement';
import SimilarityChecker   from './pages/Student/SimilarityChecker';
import AIChatbot           from './pages/Student/AIChatbot';

// Admin pages
import AdminDashboard    from './pages/Admin/AdminDashboard';
import ManageChallenges  from './pages/Admin/ManageChallenges';
import Categories        from './pages/Admin/Categories';
import Analytics         from './pages/Admin/Analytics';

// Faculty pages
import ReviewIdeas      from './pages/Faculty/ReviewIdeas';
import FacultyDashboard from './pages/Faculty/FacultyDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ── Public ─────────────────────────────────── */}
          <Route path="/"            element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* ── Auth (redirect to dashboard if logged in) */}
          <Route path="/login"    element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

          {/* ── Student Protected ──────────────────────── */}
          <Route path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/submit-idea"
            element={<ProtectedRoute><SubmitIdea /></ProtectedRoute>} />
          <Route path="/my-ideas"
            element={<ProtectedRoute><MyIdeas /></ProtectedRoute>} />
          <Route path="/ai-evaluation"
            element={<ProtectedRoute><AIEvaluationSelect /></ProtectedRoute>} />
          <Route path="/ai-evaluation/:id"
            element={<ProtectedRoute><AIEvaluation /></ProtectedRoute>} />
          <Route path="/ai-improvement"
            element={<ProtectedRoute><AIImprovementSelect /></ProtectedRoute>} />
          <Route path="/ai-improvement/:id"
            element={<ProtectedRoute><AIImprovement /></ProtectedRoute>} />
          <Route path="/similarity-checker"
            element={<ProtectedRoute><SimilarityChecker /></ProtectedRoute>} />
          <Route path="/ai-chatbot"
            element={<ProtectedRoute><AIChatbot /></ProtectedRoute>} />

          {/* ── Admin Protected ────────────────────────── */}
          <Route path="/admin/dashboard"
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/challenges"
            element={<ProtectedRoute><ManageChallenges /></ProtectedRoute>} />
          <Route path="/admin/categories"
            element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/admin/analytics"
            element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

          {/* ── Profile ────────────────────────────────── */}
          <Route path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* ── Faculty Protected ──────────────────────── */}
          <Route path="/faculty/dashboard"
            element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} />
          <Route path="/faculty/review"
            element={<ProtectedRoute><ReviewIdeas /></ProtectedRoute>} />

          {/* ── Catch-all ──────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
