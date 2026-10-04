import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Calendar, ArrowRight, Zap, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/discover?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/discover');
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Campus Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>The #1 Campus Event & Club Management Platform</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto font-heading"
        >
          Discover What's Happening on <span className="text-gradient">Campus</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Find events, workshops, hackathons, competitions and activities organized by your college clubs. Earn participation points & instant digital tickets!
        </motion.p>

        {/* Large Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSearch}
          className="mt-10 max-w-2xl mx-auto relative group"
        >
          <div className="relative glass-panel rounded-2xl p-2 sm:p-2.5 border border-white/15 focus-within:border-indigo-500 shadow-2xl transition-all flex items-center gap-2">
            <Search className="w-6 h-6 text-slate-400 ml-3 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, clubs, workshops, hackathons..."
              className="w-full bg-transparent border-none text-white text-sm sm:text-base placeholder-slate-400 focus:outline-none px-2"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>

        {/* Campus Live Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-black text-indigo-400 font-heading">24+</span>
            <span className="text-xs text-slate-400 font-medium">Active College Clubs</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-black text-purple-400 font-heading">150+</span>
            <span className="text-xs text-slate-400 font-medium">Events Organized</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-black text-pink-400 font-heading">3,800+</span>
            <span className="text-xs text-slate-400 font-medium">Student Registrations</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-heading">100%</span>
            <span className="text-xs text-slate-400 font-medium">Verified Certificates</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
