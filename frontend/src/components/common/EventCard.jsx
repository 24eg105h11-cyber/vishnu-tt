import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Heart, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEventStore } from '../../store/useEventStore';

export default function EventCard({ event }) {
  const { savedEventIds, toggleSaveEvent } = useEventStore();
  const isSaved = savedEventIds.includes(event.id);

  const capacityPercent = Math.min(100, Math.round((event.registeredCount / (event.maxCapacity || 100)) * 100));
  const isFull = event.registeredCount >= event.maxCapacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-card overflow-hidden flex flex-col h-full border border-white/10 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all rounded-3xl"
    >
      {/* Poster Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={event.posterUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
            {event.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveEvent(event.id);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-rose-400 hover:scale-110 transition-all border border-white/10"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Club Badge overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
          <img
            src={event.clubLogoUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=100&q=80'}
            alt={event.clubName}
            className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-500/50"
          />
          <span className="text-xs font-semibold text-slate-200 truncate drop-shadow-md">
            {event.clubName}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug font-heading">
            {event.title}
          </h3>

          {/* Date, Time & Venue info */}
          <div className="mt-3 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{event.date}</span>
              <span className="text-slate-600">•</span>
              <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{event.startTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Capacity Meter Bar */}
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-indigo-400" />
              {event.registeredCount} registered
            </span>
            <span className={isFull ? 'text-rose-400 font-bold' : 'text-slate-400'}>
              {isFull ? 'Full (Waitlist)' : `${event.maxCapacity - event.registeredCount} spots left`}
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
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

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all flex items-center justify-center gap-1.5 group/btn"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-indigo-400" />
          </Link>
          <Link
            to={`/events/${event.id}`}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white transition-all shadow-md ${
              isFull
                ? 'bg-amber-600/80 hover:bg-amber-600 text-amber-100'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-indigo-500/20'
            }`}
          >
            {isFull ? 'Waitlist' : 'Register'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
