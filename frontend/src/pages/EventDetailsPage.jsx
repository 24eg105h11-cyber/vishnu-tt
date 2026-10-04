import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import RegistrationModal from '../components/modals/RegistrationModal';
import EventCard from '../components/common/EventCard';
import { 
  Calendar, Clock, MapPin, Users, Heart, Share2, ShieldCheck, 
  Sparkles, CheckCircle2, AlertTriangle, Mail, Phone, ChevronLeft, Award
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useEventStore } from '../store/useEventStore';
import { motion } from 'framer-motion';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, role } = useAuthStore();
  const { savedEventIds, toggleSaveEvent } = useEventStore();
  
  const [event, setEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegModal, setShowRegModal] = useState(false);

  const isSaved = savedEventIds.includes(id);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);

        const allEvents = await eventService.getEvents();
        const similar = allEvents.filter(e => e.id !== id && e.category === data.category);
        setSimilarEvents(similar);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Loading Event Details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white mb-2">Event Not Found</h2>
        <Link to="/discover" className="text-indigo-400 hover:underline text-xs">Back to Discover Events</Link>
      </div>
    );
  }

  const capacityPercent = Math.min(100, Math.round((event.registeredCount / (event.maxCapacity || 100)) * 100));
  const isFull = event.registeredCount >= event.maxCapacity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Button */}
      <Link
        to="/discover"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Discover Events
      </Link>

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full bg-slate-950">
          <img
            src={event.posterUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top Overlays */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 shadow-lg">
              {event.category}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSaveEvent(event.id)}
                className="p-3 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-rose-400 transition-all border border-white/10"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-3 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-white transition-all border border-white/10"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Banner Info */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <Link to={`/clubs/${event.clubId}`} className="inline-flex items-center gap-2 group">
              <img
                src={event.clubLogoUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=100&q=80'}
                alt={event.clubName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50"
              />
              <span className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                Organized by {event.clubName}
              </span>
            </Link>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Description, Rules, Eligibility */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Quick Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-semibold">Date & Time</span>
                <span className="block text-xs font-bold text-white">{event.date}</span>
                <span className="block text-[11px] text-slate-400">{event.startTime}</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-semibold">Venue</span>
                <span className="block text-xs font-bold text-white truncate max-w-[150px]">{event.venue}</span>
                <span className="block text-[11px] text-slate-400">On Campus</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-semibold">Perks & Points</span>
                <span className="block text-xs font-bold text-white">+20 Points & Certificate</span>
                <span className="block text-[11px] text-slate-400">QR Check-in</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> About This Event
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Rules & Eligibility */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-heading mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" /> Event Guidelines & Rules
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {(event.rules || [
                  'Bring college student ID card for entry',
                  'Maintain campus code of conduct',
                  'Check-in at QR attendance desk before start'
                ]).map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {event.eligibility && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Eligibility Criteria</h4>
                <p className="text-xs text-slate-300">{event.eligibility}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Registration Card & Capacity */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6 sticky top-24">
            
            {/* Registration Deadline Countdown */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                Registration Closes In
              </span>
              <span className="text-xl font-black text-white font-mono block">
                2d 14h 32m
              </span>
            </div>

            {/* Capacity Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" /> Capacity
                </span>
                <span className={isFull ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                  {event.registeredCount} / {event.maxCapacity} seats
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    capacityPercent >= 90
                      ? 'bg-rose-500'
                      : capacityPercent >= 70
                      ? 'bg-amber-500'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={() => setShowRegModal(true)}
              className={`w-full py-4 rounded-2xl font-bold text-sm text-white transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
                isFull
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-indigo-500/30'
              }`}
            >
              {isFull ? 'Join Event Waitlist' : 'Register Now 🎉'}
            </button>

            {/* Contact Organizer */}
            <div className="pt-4 border-t border-white/10 text-xs space-y-2 text-slate-400">
              <span className="block font-bold text-slate-200">Contact Event Coordinator</span>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{event.contactEmail || 'events@campus.edu'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>{event.contactPhone || '+1 555-8822'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Events */}
      {similarEvents.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading">Similar Campus Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarEvents.slice(0, 3).map((sev) => (
              <EventCard key={sev.id} event={sev} />
            ))}
          </div>
        </div>
      )}

      {/* Registration Modal Popup */}
      {showRegModal && (
        <RegistrationModal
          event={event}
          onClose={() => setShowRegModal(false)}
        />
      )}
    </div>
  );
}
