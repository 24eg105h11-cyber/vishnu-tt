import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickCategories from '../components/home/QuickCategories';
import FeaturedEvents from '../components/home/FeaturedEvents';
import TopClubs from '../components/home/TopClubs';
import CampusLeaderboard from '../components/home/CampusLeaderboard';
import { useEventStore } from '../store/useEventStore';
import { useClubStore } from '../store/useClubStore';

export default function HomePage() {
  const { events, fetchEvents } = useEventStore();
  const { clubs, fetchClubs } = useClubStore();

  useEffect(() => {
    fetchEvents();
    fetchClubs();
  }, [fetchEvents, fetchClubs]);

  return (
    <div className="space-y-6">
      <HeroSection />
      <QuickCategories />
      <FeaturedEvents events={events} />
      <TopClubs clubs={clubs} />
      <CampusLeaderboard />
    </div>
  );
}
