import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Music, Trophy, Code, BookOpen, Terminal, TrendingUp, Palette, Radio, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Technical', icon: Cpu, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
  { name: 'Cultural', icon: Music, color: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/20' },
  { name: 'Sports', icon: Trophy, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
  { name: 'Hackathon', icon: Code, color: 'from-orange-500 to-amber-600', shadow: 'shadow-orange-500/20' },
  { name: 'Workshop', icon: BookOpen, color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/20' },
  { name: 'Coding', icon: Terminal, color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/20' },
  { name: 'Entrepreneurship', icon: TrendingUp, color: 'from-rose-500 to-red-600', shadow: 'shadow-rose-500/20' },
  { name: 'Arts', icon: Palette, color: 'from-fuchsia-500 to-pink-600', shadow: 'shadow-fuchsia-500/20' },
  { name: 'Music', icon: Radio, color: 'from-amber-500 to-yellow-600', shadow: 'shadow-amber-500/20' },
  { name: 'Other', icon: Grid, color: 'from-slate-600 to-slate-700', shadow: 'shadow-slate-500/20' },
];

export default function QuickCategories() {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Quick Categories
            </h2>
            <p className="text-xs text-slate-400 mt-1">Explore events by domain & student interest</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/discover?category=${encodeURIComponent(cat.name)}`)}
                className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-white/20 text-left transition-all group flex flex-col justify-between h-32 relative overflow-hidden"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} ${cat.shadow} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <div>
                  <span className="block text-sm font-bold text-white group-hover:text-indigo-300 transition-colors font-heading">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400">Explore Events →</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
