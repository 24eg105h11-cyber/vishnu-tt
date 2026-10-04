import api from './api';
import { MOCK_EVENTS, MOCK_CLUBS, MOCK_USERS, MOCK_REGISTRATIONS } from './mockData';

export const adminService = {
  getStats: async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data || response;
    } catch (err) {
      return {
        totalStudents: 1240,
        totalOrganizers: 34,
        totalClubs: MOCK_CLUBS.length,
        totalEvents: MOCK_EVENTS.length,
        totalRegistrations: 3840,
        pendingEventsCount: MOCK_EVENTS.filter(e => e.status === 'PENDING').length,
        pendingClubsCount: MOCK_CLUBS.filter(c => c.status === 'PENDING').length,
      };
    }
  },

  getPendingEvents: async () => {
    try {
      const response = await api.get('/admin/events/pending');
      return response.data || response;
    } catch (err) {
      return MOCK_EVENTS.filter(e => e.status === 'PENDING');
    }
  },

  approveEvent: async (id) => {
    try {
      const response = await api.put(`/admin/events/${id}/approve`);
      return response.data || response;
    } catch (err) {
      const evt = MOCK_EVENTS.find(e => e.id === id);
      if (evt) evt.status = 'APPROVED';
      return evt;
    }
  },

  rejectEvent: async (id) => {
    try {
      const response = await api.put(`/admin/events/${id}/reject`);
      return response.data || response;
    } catch (err) {
      const evt = MOCK_EVENTS.find(e => e.id === id);
      if (evt) evt.status = 'REJECTED';
      return evt;
    }
  },

  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data || response;
    } catch (err) {
      return MOCK_USERS;
    }
  },

  toggleUserStatus: async (id) => {
    try {
      const response = await api.put(`/admin/users/${id}/toggle-status`);
      return response.data || response;
    } catch (err) {
      const usr = MOCK_USERS.find(u => u.id === id);
      if (usr) usr.active = !usr.active;
      return usr;
    }
  }
};
