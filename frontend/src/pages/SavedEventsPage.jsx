import React, { useEffect, useState } from 'react';
import { useEventStore } from '../store/useEventStore';
import { eventService } from '../services/eventService';
import EventCard from '../components/common/EventCard';
import { Bookmark, Sparkles } from 'lucide-react';

export default function SavedEventsPage() {
  const { savedEventIds } = useEventStore();
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      setLoading(true);
      const allEvents = await eventService.getEvents();
      setSavedEvents(allEvents.filter(e => savedEventIds.includes(e.id)));
      setLoading(false);
    }
    loadSaved();
  }, [savedEventIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-heading">Saved Favorite Events</h1>
        <p className="text-xs text-slate-400">Events you bookmarked for later</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading saved events...</div>
      ) : savedEvents.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 max-w-md mx-auto my-8 border border-white/10">
          <Bookmark className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Saved Events</h3>
          <p className="text-xs text-slate-400">Click the heart icon on any event card to save it here for quick access!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
}
