import api from './api';
import { MOCK_USERS } from './mockData';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      // Fallback for offline demo mode
      const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        return {
          token: `mock-jwt-token-${found.role}`,
          type: 'Bearer',
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          collegeId: found.collegeId,
          points: found.points,
          badges: ['🏆 Event Explorer', '🔥 Active Participant'],
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        };
      }
      // Demo default login matching roles
      if (email.includes('admin')) {
        return {
          token: 'mock-jwt-token-ROLE_ADMIN',
          type: 'Bearer',
          id: 'user-admin',
          name: 'Campus Administrator',
          email: email,
          role: 'ROLE_ADMIN',
          collegeId: 'ADM-001',
          points: 1000,
          badges: ['👑 System Admin'],
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        };
      } else if (email.includes('organizer') || email.includes('club')) {
        return {
          token: 'mock-jwt-token-ROLE_ORGANIZER',
          type: 'Bearer',
          id: 'user-organizer',
          name: 'Alex Rivera (Coding Lead)',
          email: email,
          role: 'ROLE_ORGANIZER',
          collegeId: 'ORG-101',
          points: 500,
          badges: ['🌟 Club Organizer'],
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        };
      }
      return {
        token: 'mock-jwt-token-ROLE_STUDENT',
        type: 'Bearer',
        id: 'user-student',
        name: 'Jane Smith',
        email: email,
        role: 'ROLE_STUDENT',
        collegeId: 'STU-2024-889',
        points: 420,
        badges: ['🏆 Event Explorer', '🔥 Active Participant'],
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      return {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'ROLE_STUDENT',
        collegeId: userData.collegeId || 'STU-NEW',
        department: userData.department,
        points: 50
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      const role = localStorage.getItem('role') || 'ROLE_STUDENT';
      const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
      return user;
    }
  }
};
