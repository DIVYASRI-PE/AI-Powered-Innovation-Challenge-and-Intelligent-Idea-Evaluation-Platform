import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import { Sparkles, UserPlus, ArrowLeft } from 'lucide-react';

const DEPARTMENTS = ['Computer Science','Information Technology','Electronics','Mechanical','Civil','Electrical','Biotechnology','MBA','MCA','Other'];
const YEARS       = ['1st Year','2nd Year','3rd Year','4th Year'];
const SECTIONS    = ['A','B','C','D','E'];

const Field = ({ label, name, type = 'text', value, onChange, placeholder, required, children }) => (
  <div>
    <label className="block text-sm font-semibold mb-1" style={{ color: '#D6F4F4' }}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
    {children || (
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        style={{
          background: 'rgba(6,40,61,0.85)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#FFFFFF',
          borderRadius: '0.75rem',
          padding: '0.65rem 1rem',
          width: '100%',
          outline: 'none',
          fontSize: '0.875rem',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => { e.target.style.borderColor = '#00C896'; e.target.style.boxShadow = '0 0 0 3px rgba(0,200,150,0.15)'; }}
        onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
      />
    )}
  </div>
);

const Select = ({ label, name, value, onChange, options, required }) => (
  <div>
    <label className="block text-sm font-semibold mb-1" style={{ color: '#D6F4F4' }}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
    <select name={name} value={value} onChange={onChange} required={required}
      style={{
        background: 'rgba(6,40,61,0.85)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#FFFFFF',
        borderRadius: '0.75rem',
        padding: '0.65rem 1rem',
        width: '100%',
        outline: 'none',
        fontSize: '0.875rem',
        boxSizing: 'border-box',
      }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', username: '', email: '',
    password: '', confirmPassword: '', department: '', phoneNumber: '',
    role: 'STUDENT',
    // student
    registerNumber: '', year: '1st Year', section: 'A',
    // faculty
    employeeId: '', designation: '',
  });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (form.phoneNumber && !/^\d{10}$/.test(form.phoneNumber)) { setError('Phone number must be 10 digits.'); return; }
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50">
      <Navbar />
      <div className="min-h-screen flex items-start justify-center py-20 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-xl mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Join the innovation community</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Role selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">I am a <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  {['STUDENT','FACULTY'].map(r => (
                    <button key={r} type="button" onClick={() => setForm(p => ({ ...p, role: r }))}
                      className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${form.role === r ? 'border-violet-600 bg-violet-600 text-white' : 'border-gray-200 text-gray-600 hover:border-violet-300'}`}>
                      {r === 'STUDENT' ? '🎓 Student' : '👩‍🏫 Faculty'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal info */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" name="firstName" value={form.firstName} onChange={set} placeholder="First name" required />
                  <Field label="Last Name"  name="lastName"  value={form.lastName}  onChange={set} placeholder="Last name"  required />
                </div>
              </div>

              {/* Account info */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Account Information</h3>
                <div className="space-y-3">
                  <Field label="College Email" name="email" type="email" value={form.email} onChange={set} placeholder="you@college.edu" required />
                  <Field label="Username" name="username" value={form.username} onChange={set} placeholder="Choose a unique username" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Password (min 8 chars)" name="password" type="password" value={form.password} onChange={set} placeholder="••••••••" required />
                    <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={set} placeholder="••••••••" required />
                  </div>
                </div>
              </div>

              {/* Academic / Professional info */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {form.role === 'STUDENT' ? 'Academic Information' : 'Professional Information'}
                </h3>
                {form.role === 'STUDENT' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Register Number" name="registerNumber" value={form.registerNumber} onChange={set} placeholder="e.g. 22CS001" required />
                      <Field label="Phone Number (10 digits)" name="phoneNumber" value={form.phoneNumber} onChange={set} placeholder="9876543210" required />
                    </div>
                    <Select label="Department" name="department" value={form.department} onChange={set} options={DEPARTMENTS.map(d => ({ value: d, label: d }))} required />
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Year" name="year" value={form.year} onChange={set} options={YEARS.map(y => ({ value: y, label: y }))} required />
                      <Select label="Section" name="section" value={form.section} onChange={set} options={SECTIONS.map(s => ({ value: s, label: `Section ${s}` }))} required />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Employee ID" name="employeeId" value={form.employeeId} onChange={set} placeholder="EMP001" required />
                      <Field label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={set} placeholder="9876543210" required />
                    </div>
                    <Select label="Department" name="department" value={form.department} onChange={set} options={DEPARTMENTS.map(d => ({ value: d, label: d }))} required />
                    <Field label="Designation" name="designation" value={form.designation} onChange={set} placeholder="e.g. Assistant Professor" required />
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating account...</>
                ) : (
                  <><UserPlus className="w-5 h-5" />Create Account</>
                )}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-600 font-semibold hover:underline inline-flex items-center gap-1">
                Sign in <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
