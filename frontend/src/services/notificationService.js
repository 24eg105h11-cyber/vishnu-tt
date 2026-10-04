import api from './api';
import { MOCK_NOTIFICATIONS } from './mockData';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data || response;
    } catch (err) {
      return MOCK_NOTIFICATIONS;
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await api.put(`/notifications/${id}/read`);
      return response.data || response;
    } catch (err) {
      const notif = MOCK_NOTIFICATIONS.find(n => n.id === id);
      if (notif) notif.isRead = true;
      return notif;
    }
  }
};
