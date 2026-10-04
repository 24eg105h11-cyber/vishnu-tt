import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEventStore } from '../store/useEventStore';
import EventCard from '../components/common/EventCard';
import { Search, Filter, SlidersHorizontal, Sparkles, Calendar, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Technical', 'Cultural', 'Sports', 'Hackathon', 'Workshop', 'Coding', 'Entrepreneurship', 'Arts', 'Music'];
const SORTS = [
  { label: 'Recently Added', value: 'recent' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Upcoming Date', value: 'upcoming' }
];

export default function DiscoverEventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, fetchEvents, isLoading } = useEventStore();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedSort, setSelectedSort] = useState('recent');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    setSearchQuery(search);
    setSelectedCategory(category);
    fetchEvents({ search, category, sort: selectedSort });
  }, [searchParams, selectedSort, fetchEvents]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    if (searchQuery.trim()) newParams.search = searchQuery.trim();
    if (selectedCategory !== 'All') newParams.category = selectedCategory;
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = {};
    if (searchQuery.trim()) newParams.search = searchQuery.trim();
    if (cat !== 'All') newParams.category = cat;
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" /> Discover Campus Events
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          Find Your Next <span className="text-gradient">Experience</span>
        </h1>
        <p className="text-sm text-slate-400">
          Filter by category, search by keywords, or browse popular college club activities
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/10 space-y-4">
        
        {/* Search & Sort Row */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, coding contests, workshops, venues..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Events Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 glass-card rounded-3xl animate-pulse bg-slate-900/60" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 my-12 border border-white/10">
          <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white font-heading">No Events Found</h3>
          <p className="text-xs text-slate-400">
            No events match your current search terms or category. Try clearing filters or searching for different terms.
          </p>
          <button
            onClick={clearFilters}
            className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
