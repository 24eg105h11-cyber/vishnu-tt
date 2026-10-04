import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        set({
          token,
          user: parsedUser,
          role: parsedUser.role || 'ROLE_STUDENT',
          isAuthenticated: true,
          isLoading: false
        });
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        set({ user: null, token: null, role: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const authData = await authService.login(email, password);
      
      const token = authData.token;
      const role = authData.role || 'ROLE_STUDENT';
      const user = {
        id: authData.id,
        name: authData.name,
        email: authData.email,
        collegeId: authData.collegeId,
        role: role,
        points: authData.points || 100,
        badges: authData.badges || ['🏆 Event Explorer'],
        avatarUrl: authData.avatarUrl
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);

      set({
        token,
        user,
        role,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true, user };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const registered = await authService.register(userData);
      // Auto login after registration
      return await get().login(userData.email, userData.password);
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false
    });
  },

  addPoints: (amount, badge) => {
    const { user } = get();
    if (!user) return;
    const newPoints = (user.points || 0) + amount;
    const newBadges = new Set(user.badges || []);
    if (badge) newBadges.add(badge);

    const updatedUser = { ...user, points: newPoints, badges: Array.from(newBadges) };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  }
}));
