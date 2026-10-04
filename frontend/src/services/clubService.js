import api from './api';
import { MOCK_CLUBS, MOCK_ANNOUNCEMENTS } from './mockData';

export const clubService = {
  getClubs: async () => {
    try {
      const response = await api.get('/clubs');
      return response.data || response;
    } catch (err) {
      return MOCK_CLUBS;
    }
  },

  getClubById: async (id) => {
    try {
      const response = await api.get(`/clubs/${id}`);
      return response.data || response;
    } catch (err) {
      return MOCK_CLUBS.find(c => c.id === id) || MOCK_CLUBS[0];
    }
  },

  createClub: async (clubData) => {
    try {
      const response = await api.post('/clubs', clubData);
      return response.data || response;
    } catch (err) {
      const newClub = { id: `club-${Date.now()}`, ...clubData, followersCount: 1, status: 'APPROVED' };
      MOCK_CLUBS.push(newClub);
      return newClub;
    }
  },

  followClub: async (clubId) => {
    try {
      await api.post(`/clubs/${clubId}/follow`);
    } catch (err) {
      const club = MOCK_CLUBS.find(c => c.id === clubId);
      if (club) club.followersCount += 1;
    }
  },

  unfollowClub: async (clubId) => {
    try {
      await api.delete(`/clubs/${clubId}/follow`);
    } catch (err) {
      const club = MOCK_CLUBS.find(c => c.id === clubId);
      if (club && club.followersCount > 0) club.followersCount -= 1;
    }
  },

  getAnnouncements: async () => {
    try {
      const response = await api.get('/announcements');
      return response.data || response;
    } catch (err) {
      return MOCK_ANNOUNCEMENTS;
    }
  },

  createAnnouncement: async (announcementData) => {
    try {
      const response = await api.post('/announcements', announcementData);
      return response.data || response;
    } catch (err) {
      const newAnn = {
        id: `ann-${Date.now()}`,
        ...announcementData,
        clubName: 'ByteCraft Coding Club',
        createdAt: new Date().toISOString()
      };
      MOCK_ANNOUNCEMENTS.unshift(newAnn);
      return newAnn;
    }
  }
};
