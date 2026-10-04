import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClubStore } from '../../store/useClubStore';

export default function TopClubs({ clubs = [] }) {
  const { followedClubIds, toggleFollowClub } = useClubStore();

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Active College Clubs
            </h2>
            <p className="text-xs text-slate-400 mt-1">Follow clubs to receive instant notifications when new events publish</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club) => {
            const isFollowing = followedClubIds.includes(club.id);
            return (
              <motion.div
                key={club.id}
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                {/* Banner */}
                <div className="relative h-28 w-full bg-slate-900">
                  <img
                    src={club.bannerUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />

                  {/* Club Logo Floating */}
                  <div className="absolute -bottom-5 left-5">
                    <img
                      src={club.logoUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80'}
                      alt={club.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-950 shadow-lg"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 pt-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white font-heading line-clamp-1">
                        {club.name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {club.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {club.followersCount} Followers
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-indigo-300 border border-indigo-500/20">
                      {club.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/clubs/${club.id}`}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-center text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => toggleFollowClub(club.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isFollowing
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" /> Follow
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
