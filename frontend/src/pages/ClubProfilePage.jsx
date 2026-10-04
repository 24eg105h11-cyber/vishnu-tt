import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { clubService } from '../services/clubService';
import { eventService } from '../services/eventService';
import EventCard from '../components/common/EventCard';
import { 
  Users, UserPlus, Check, ShieldCheck, Calendar, Bell, 
  Globe, Share2, Sparkles, MessageSquare, ExternalLink
} from 'lucide-react';
import { useClubStore } from '../store/useClubStore';
import { motion } from 'framer-motion';

export default function ClubProfilePage() {
  const { id } = useParams();
  const { followedClubIds, toggleFollowClub } = useClubStore();

  const [club, setClub] = useState(null);
  const [clubEvents, setClubEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  const isFollowing = followedClubIds.includes(id);

  useEffect(() => {
    async function loadClubData() {
      setLoading(true);
      try {
        const cData = await clubService.getClubById(id);
        setClub(cData);

        const events = await eventService.getEvents({ club: id });
        setClubEvents(events);

        const ann = await clubService.getAnnouncements();
        setAnnouncements(ann.filter(a => a.clubId === id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadClubData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Loading Club Profile...</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white mb-2">Club Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Cover Banner & Header Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="h-60 sm:h-72 w-full bg-slate-900 relative">
          <img
            src={club.bannerUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'}
            alt={club.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={club.logoUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80'}
              alt={club.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-slate-950 shadow-2xl bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {club.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">[{club.code}]</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
                {club.name}
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <strong className="text-white">{club.followersCount}</strong> Student Followers
              </p>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => toggleFollowClub(club.id)}
            className={`py-3 px-6 rounded-2xl text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-2 ${
              isFollowing
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:opacity-90 shadow-indigo-500/25'
            }`}
          >
            {isFollowing ? (
              <>
                <Check className="w-4 h-4" /> Following Club
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Follow Club
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        {['upcoming', 'overview', 'announcements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white font-heading">Events Organized by {club.name}</h2>
          {clubEvents.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              No active upcoming events scheduled right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">Club Overview</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {club.description}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white font-heading">Coordinators</h3>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Faculty In-Charge</span>
              <span className="block text-slate-200 font-bold mt-0.5">{club.facultyCoordinator || 'Dr. Robert Vance'}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Student Leads</span>
              <ul className="mt-1 space-y-1 text-slate-300">
                {(club.studentCoordinators || ['Alex Rivera', 'Samantha Wu']).map((st) => (
                  <li key={st} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {st}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-xl font-bold text-white font-heading">Club Announcements</h2>
          {announcements.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              No recent announcements published by this club.
            </div>
          ) : (
            announcements.map((ann) => (
              <div key={ann.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                  <span className="text-[10px] text-indigo-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
