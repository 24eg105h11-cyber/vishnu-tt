import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { registrationService } from '../services/registrationService';
import { eventService } from '../services/eventService';
import EventCard from '../components/common/EventCard';
import TicketModal from '../components/common/TicketModal';
import { 
  Calendar, Award, CheckCircle2, Flame, Star, QrCode, 
  Sparkles, Compass, Bookmark, Bell, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const [registrations, setRegistrations] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);

  useEffect(() => {
    async function loadStudentData() {
      const regs = await registrationService.getMyRegistrations();
      setRegistrations(regs);

      const certs = await registrationService.getCertificates();
      setCertificates(certs);

      const evts = await eventService.getEvents();
      setRecommended(evts.slice(0, 3));
    }
    loadStudentData();
  }, []);

  const upcomingReg = registrations.find(r => r.status === 'REGISTERED');
  const attendedCount = registrations.filter(r => r.status === 'ATTENDED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
              Student Dashboard
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Welcome back, {user?.name || 'Jane'} 👋
            </h1>
            <p className="text-xs text-slate-300">
              Department of {user?.department || 'Information Technology'} • {user?.collegeId || 'STU-2024-889'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/discover"
              className="py-3 px-5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> Discover Events
            </Link>
          </div>
        </div>
      </div>

      {/* Gamification Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Joined Events</span>
            <Calendar className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-2xl font-black text-white font-heading block">
            {registrations.length}
          </span>
          <span className="text-[10px] text-indigo-400 font-medium">Registrations</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Events Attended</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white font-heading block">
            {attendedCount}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">Verified QR Checks</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Certificates</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white font-heading block">
            {certificates.length}
          </span>
          <span className="text-[10px] text-purple-400 font-medium">Download Available</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Campus Points</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-heading block">
            {user?.points || 420} PTS
          </span>
          <span className="text-[10px] text-amber-300 font-medium">Leaderboard Rank #2</span>
        </div>
      </div>

      {/* Next Upcoming Registered Event Card */}
      {upcomingReg && (
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ⚡ Next Upcoming Event Ticket
            </span>
            <span className="text-xs font-mono text-slate-400">{upcomingReg.registrationId}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-heading">{upcomingReg.eventTitle}</h3>
              <p className="text-xs text-slate-300 mt-1">Status: Registered • Ticket Pass Ready</p>
            </div>

            <button
              onClick={() => setActiveTicket(upcomingReg)}
              className="py-3 px-6 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 shrink-0"
            >
              <QrCode className="w-4 h-4" /> View Ticket & QR Code
            </button>
          </div>
        </div>
      )}

      {/* Recommended Events */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-heading">Recommended For You</h2>
          <Link to="/discover" className="text-xs font-bold text-indigo-400 hover:underline">Explore All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>

      {/* Ticket Modal */}
      {activeTicket && (
        <TicketModal
          registration={activeTicket}
          onClose={() => setActiveTicket(null)}
        />
      )}
    </div>
  );
}
