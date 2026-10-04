import React from 'react';
import { Award, Trophy, Flame, Star, Crown, Medal } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../../services/mockData';
import { motion } from 'framer-motion';

export default function CampusLeaderboard() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Trophy className="w-3.5 h-3.5" /> Campus Leaderboard & Gamification
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Top Campus Event Participants
              </h2>
              <p className="text-xs text-slate-400 mt-1">Earn participation points by attending events, workshops & hackathons</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider rounded-xl">
                <tr>
                  <th className="py-3.5 px-4 rounded-l-xl">Rank</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4">Attended</th>
                  <th className="py-3.5 px-4 rounded-r-xl text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_LEADERBOARD.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold">
                      {item.rank === 1 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black border border-amber-500/40">
                          <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </span>
                      ) : item.rank === 2 ? (
                        <span className="w-7 h-7 rounded-full bg-slate-300/20 text-slate-200 flex items-center justify-center font-black border border-slate-300/40">
                          <Medal className="w-4 h-4" />
                        </span>
                      ) : item.rank === 3 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-600 flex items-center justify-center font-black border border-amber-700/40">
                          <Medal className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-slate-400 flex items-center justify-center font-bold">
                          #{item.rank}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-bold text-white">
                      <div>
                        <span className="block text-sm font-bold">{item.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">{item.collegeId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{item.department}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.badges.slice(0, 3).map((badge) => (
                          <span key={badge} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-200">{item.eventsAttended} Events</td>
                    <td className="py-4 px-4 text-right font-black text-amber-400 text-sm">
                      {item.points} PTS
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
