import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../common/EventCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedEvents({ events = [] }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Upcoming Featured Events
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Don't Miss What's Coming Up Next
            </h2>
          </div>

          <Link
            to="/discover"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
