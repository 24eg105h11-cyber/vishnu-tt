import { create } from 'zustand';
import { clubService } from '../services/clubService';

export const useClubStore = create((set, get) => ({
  clubs: [],
  followedClubIds: JSON.parse(localStorage.getItem('followedClubs') || '[]'),
  isLoading: false,

  fetchClubs: async () => {
    set({ isLoading: true });
    try {
      const data = await clubService.getClubs();
      set({ clubs: data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  toggleFollowClub: async (clubId) => {
    const { followedClubIds, clubs } = get();
    let updatedIds;
    let updatedClubs = [...clubs];

    if (followedClubIds.includes(clubId)) {
      updatedIds = followedClubIds.filter(id => id !== clubId);
      await clubService.unfollowClub(clubId);
      updatedClubs = updatedClubs.map(c => c.id === clubId ? { ...c, followersCount: Math.max(0, c.followersCount - 1) } : c);
    } else {
      updatedIds = [...followedClubIds, clubId];
      await clubService.followClub(clubId);
      updatedClubs = updatedClubs.map(c => c.id === clubId ? { ...c, followersCount: c.followersCount + 1 } : c);
    }

    localStorage.setItem('followedClubs', JSON.stringify(updatedIds));
    set({ followedClubIds: updatedIds, clubs: updatedClubs });
  }
}));
