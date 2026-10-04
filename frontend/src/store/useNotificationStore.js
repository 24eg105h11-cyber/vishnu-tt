import { create } from 'zustand';
import { notificationService } from '../services/notificationService';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const list = await notificationService.getNotifications();
      set({ notifications: list, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    const { notifications } = get();
    await notificationService.markAsRead(id);
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    set({ notifications: updated });
  }
}));
