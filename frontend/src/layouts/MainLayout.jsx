import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuthStore } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';

export default function MainLayout() {
  const { initializeAuth } = useAuthStore();
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    initializeAuth();
    fetchNotifications();
  }, [initializeAuth, fetchNotifications]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
