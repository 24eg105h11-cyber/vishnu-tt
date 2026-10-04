import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Sparkles, Mail, Lock, ArrowRight, Shield, User, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState(
    roleParam === 'admin' 
      ? 'admin@college.edu' 
      : roleParam === 'organizer' 
      ? 'organizer@codingclub.edu' 
      : 'student@college.edu'
  );
  const [password, setPassword] = useState('student123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = await login(email, password);
    if (result.success) {
      if (result.user.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (result.user.role === 'ROLE_ORGANIZER') {
        navigate('/organizer');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      setErrorMessage(result.message || 'Login failed');
    }
  };

  const setPreset = (emailPreset, passPreset) => {
    setEmail(emailPreset);
    setPassword(passPreset);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-white font-heading">
              Campus<span className="text-gradient">Pulse</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white font-heading">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to manage registrations, access tickets & points</p>
        </div>

        {/* Quick Demo Role Selector */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2 text-xs">
          <span className="block font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
            Quick Demo Login Profiles:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPreset('student@college.edu', 'student123')}
              className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                email.includes('student')
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-950 text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setPreset('organizer@codingclub.edu', 'org123')}
              className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                email.includes('organizer')
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-slate-950 text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              🌟 Club Lead
            </button>
            <button
              type="button"
              onClick={() => setPreset('admin@college.edu', 'admin123')}
              className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                email.includes('admin')
                  ? 'bg-rose-600 text-white border-rose-400'
                  : 'bg-slate-950 text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              👑 Admin
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2">
          New on campus?{' '}
          <Link to="/register" className="text-indigo-400 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
