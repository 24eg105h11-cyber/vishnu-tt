import api from './api';
import { MOCK_EVENTS, MOCK_CATEGORIES } from './mockData';

export const eventService = {
  getEvents: async (params = {}) => {
    try {
      const response = await api.get('/events', { params });
      return response.data || response;
    } catch (err) {
      let filtered = [...MOCK_EVENTS];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(e => 
          e.title.toLowerCase().includes(q) || 
          e.clubName.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
        );
      }
      if (params.category && params.category !== 'All') {
        filtered = filtered.filter(e => e.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.club) {
        filtered = filtered.filter(e => e.clubId === params.club || e.clubName.toLowerCase().includes(params.club.toLowerCase()));
      }
      if (params.sort === 'popular') {
        filtered.sort((a, b) => b.registeredCount - a.registeredCount);
      } else if (params.sort === 'upcoming') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      return filtered;
    }
  },

  getEventById: async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data || response;
    } catch (err) {
      const event = MOCK_EVENTS.find(e => e.id === id) || MOCK_EVENTS[0];
      return event;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data || response;
    } catch (err) {
      const newEvt = {
        id: `evt-${Date.now()}`,
        ...eventData,
        registeredCount: 0,
        status: 'PENDING',
        clubLogoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
        posterUrl: eventData.posterUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
      };
      MOCK_EVENTS.unshift(newEvt);
      return newEvt;
    }
  },

  uploadPoster: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/events/upload-poster', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      return URL.createObjectURL(file);
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data || response;
    } catch (err) {
      return MOCK_CATEGORIES;
    }
  }
};
