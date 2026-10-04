import { create } from 'zustand';
import { eventService } from '../services/eventService';

export const useEventStore = create((set, get) => ({
  events: [],
  categories: [],
  savedEventIds: JSON.parse(localStorage.getItem('savedEvents') || '[]'),
  searchQuery: '',
  selectedCategory: 'All',
  selectedSort: 'recent',
  isLoading: false,

  fetchEvents: async (params = {}) => {
    set({ isLoading: true });
    try {
      const data = await eventService.getEvents(params);
      set({ events: data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const cats = await eventService.getCategories();
      set({ categories: cats });
    } catch (err) {}
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchEvents({ search: query, category: get().selectedCategory, sort: get().selectedSort });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchEvents({ search: get().searchQuery, category, sort: get().selectedSort });
  },

  setSelectedSort: (sort) => {
    set({ selectedSort: sort });
    get().fetchEvents({ search: get().searchQuery, category: get().selectedCategory, sort });
  },

  toggleSaveEvent: (eventId) => {
    const { savedEventIds } = get();
    let updated;
    if (savedEventIds.includes(eventId)) {
      updated = savedEventIds.filter(id => id !== eventId);
    } else {
      updated = [...savedEventIds, eventId];
    }
    localStorage.setItem('savedEvents', JSON.stringify(updated));
    set({ savedEventIds: updated });
  }
}));
