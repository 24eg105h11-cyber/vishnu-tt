import React from 'react';
import CampusLeaderboard from '../components/home/CampusLeaderboard';
import { Trophy, Award, Flame, Star } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-4 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-950">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 mx-auto">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
          Campus <span className="text-gradient">Leaderboard</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Participate in club events, workshops, hackathons & volunteering to earn points, unlock badges, and top the campus charts!
        </p>

        {/* Point Scoring Key */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4 border-t border-white/10 text-xs">
          <div className="glass-panel p-3 rounded-xl border border-white/5">
            <span className="block text-amber-400 font-bold">+5 PTS</span>
            <span className="text-[10px] text-slate-400">Event Registration</span>
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/5">
            <span className="block text-amber-400 font-bold">+20 PTS</span>
            <span className="text-[10px] text-slate-400">Event Attendance</span>
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/5">
            <span className="block text-amber-400 font-bold">+30 PTS</span>
            <span className="text-[10px] text-slate-400">Workshop Completion</span>
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/5">
            <span className="block text-amber-400 font-bold">+50 PTS</span>
            <span className="text-[10px] text-slate-400">Volunteering</span>
          </div>
        </div>
      </div>

      <CampusLeaderboard />
    </div>
  );
}
