import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import {
  User, Mail, Phone, Building, BookOpen, Hash,
  Camera, Edit3, Save, X, Shield, Award, Clock
} from 'lucide-react';

const BG      = '#041C32';
const BG2     = '#06283D';
const PRIMARY = '#00C896';
const ACCENT  = '#38BDF8';
const SOFT    = '#D6F4F4';
const BORDER  = 'rgba(255,255,255,0.10)';
const CARD    = 'rgba(18,39,56,0.9)';

const Field = ({ icon: Icon, label, value, color = SOFT }) => (
  <div className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: 'rgba(0,200,150,0.12)' }}>
      <Icon className="w-4 h-4" style={{ color: PRIMARY }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(214,244,244,0.5)' }}>{label}</p>
      <p className="text-sm font-medium break-words" style={{ color }}>{value || '—'}</p>
    </div>
  </div>
);

export default function Profile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const fileRef  = useRef();

  const [photoUrl, setPhotoUrl] = useState(() => localStorage.getItem(`photo_${user?.id}`) || null);
  const [editing,  setEditing]  = useState(false);
  const [form,     setForm]     = useState({
    firstName:  user?.firstName  || '',
    lastName:   user?.lastName   || '',
    phoneNumber:user?.phoneNumber|| '',
    department: user?.department || '',
  });
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  /* ── Photo upload (stored locally for demo) ─────── */
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      setPhotoUrl(url);
      localStorage.setItem(`photo_${user.id}`, url);
    };
    reader.readAsDataURL(file);
  };

  /* ── Save profile ────────────────────────────────── */
  const handleSave = async () => {
    setSaving(true);
    try {
      // Update local storage with new name
      const updated = { ...user, ...form };
      localStorage.setItem('user', JSON.stringify(updated));
      // Update AuthContext — re-trigger state
      window.dispatchEvent(new Event('storage'));
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const isStudent = user.role?.toLowerCase() === 'student';
  const isFaculty = user.role?.toLowerCase() === 'faculty';
  const isAdmin   = user.role?.toLowerCase() === 'admin';

  const roleColor  = isAdmin ? '#F97316' : isFaculty ? ACCENT : PRIMARY;
  const roleLabel  = user.role?.toUpperCase();
  const initials   = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U';

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        <button onClick={() => navigate(-1)}
          className="text-sm font-medium mb-6 transition-colors"
          style={{ color: PRIMARY }}
          onMouseOver={e => e.currentTarget.style.color = ACCENT}
          onMouseOut={e  => e.currentTarget.style.color = PRIMARY}>
          ← Back
        </button>

        {saved && (
          <div className="mb-4 p-4 rounded-2xl text-sm font-semibold" style={{ background: 'rgba(0,200,150,0.15)', border: `1px solid ${PRIMARY}44`, color: PRIMARY }}>
            ✅ Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Left: Avatar + quick info ──────────────── */}
          <div className="md:col-span-1">
            <div className="rounded-2xl p-6 text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>

              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center mx-auto"
                  style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})`, border: `3px solid ${PRIMARY}` }}>
                  {photoUrl
                    ? <img src={photoUrl} alt="profile" className="w-full h-full object-cover" />
                    : <span className="text-3xl font-black text-white">{initials}</span>
                  }
                </div>
                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
                  style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})` }}
                  title="Upload photo">
                  <Camera className="w-4 h-4" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>

              <h2 className="text-xl font-black text-white mb-1">{user.firstName} {user.lastName}</h2>
              <p className="text-sm mb-3" style={{ color: SOFT }}>@{user.username}</p>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg,${roleColor},${roleColor}99)` }}>
                {roleLabel}
              </span>

              <div className="mt-5 pt-5 space-y-2 text-left" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: SOFT }}>
                  <Mail className="w-4 h-4" style={{ color: PRIMARY }} /> {user.email}
                </div>
                {user.department && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: SOFT }}>
                    <Building className="w-4 h-4" style={{ color: ACCENT }} /> {user.department}
                  </div>
                )}
              </div>

              <button onClick={() => navigate('/ai-chatbot')}
                className="w-full mt-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})` }}>
                💬 Open AI Assistant
              </button>
            </div>
          </div>

          {/* ── Right: Details + edit ──────────────────── */}
          <div className="md:col-span-2 space-y-5">

            {/* Profile details card */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-lg">Profile Details</h3>
                {!editing
                  ? <button onClick={() => setEditing(true)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: 'rgba(0,200,150,0.15)', border: `1px solid ${PRIMARY}44`, color: PRIMARY }}>
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                  : <div className="flex gap-2">
                      <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: `linear-gradient(135deg,${PRIMARY},${ACCENT})` }}>
                        <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditing(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold"
                        style={{ border: `1px solid ${BORDER}`, color: SOFT }}>
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                }
              </div>

              {editing ? (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', key: 'firstName' },
                    { label: 'Last Name',  key: 'lastName' },
                    { label: 'Phone Number', key: 'phoneNumber' },
                    { label: 'Department', key: 'department' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1" style={{ color: SOFT }}>{label}</label>
                      <input
                        value={form[key]}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        style={{
                          background: 'rgba(6,40,61,0.8)', border: `1px solid ${BORDER}`,
                          color: '#fff', borderRadius: '0.75rem', padding: '0.6rem 1rem',
                          width: '100%', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'
                        }}
                        onFocus={e => e.target.style.borderColor = PRIMARY}
                        onBlur={e  => e.target.style.borderColor = BORDER}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <Field icon={User}     label="Full Name"    value={`${user.firstName} ${user.lastName}`} />
                  <Field icon={Mail}     label="Email"        value={user.email} />
                  <Field icon={Phone}    label="Phone"        value={user.phoneNumber} />
                  <Field icon={Building} label="Department"   value={user.department} />
                  {isStudent && (
                    <>
                      <Field icon={Hash}     label="Register Number" value={user.registerNumber} />
                      <Field icon={BookOpen} label="Year"            value={user.year} />
                      <Field icon={BookOpen} label="Section"         value={user.section} />
                    </>
                  )}
                  {isFaculty && (
                    <>
                      <Field icon={Hash}   label="Employee ID"  value={user.employeeId} />
                      <Field icon={Shield} label="Designation"  value={user.designation} />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Account info card */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <h3 className="font-bold text-white text-lg mb-4">Account Information</h3>
              <Field icon={User}   label="Username"   value={user.username} />
              <Field icon={Shield} label="Role"       value={user.role} color={roleColor} />
              <Field icon={Clock}  label="Member Since" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }) : 'N/A'} />
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <h3 className="font-bold text-white text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'My Ideas',     path: '/my-ideas',      icon: '💡', show: isStudent },
                  { label: 'Submit Idea',  path: '/submit-idea',   icon: '🚀', show: isStudent },
                  { label: 'AI Evaluate',  path: '/ai-evaluation', icon: '🤖', show: isStudent },
                  { label: 'Review Ideas', path: '/faculty/review',icon: '📝', show: isFaculty },
                  { label: 'Analytics',    path: '/admin/analytics',icon:'📊', show: isAdmin },
                  { label: 'Dashboard',    path: '/dashboard',      icon: '🏠', show: true },
                ].filter(a => a.show).map(a => (
                  <button key={a.path} onClick={() => navigate(a.path)}
                    className="rounded-xl p-3 text-sm font-semibold text-left transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(0,200,150,0.08)', border: `1px solid rgba(0,200,150,0.2)`, color: SOFT }}>
                    <span className="text-xl block mb-1">{a.icon}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
