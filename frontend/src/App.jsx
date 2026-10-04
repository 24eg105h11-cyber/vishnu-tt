import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import DiscoverEventsPage from './pages/DiscoverEventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import ClubProfilePage from './pages/ClubProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import MyEventsPage from './pages/MyEventsPage';
import SavedEventsPage from './pages/SavedEventsPage';
import CertificatesPage from './pages/CertificatesPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEventPage from './pages/CreateEventPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverEventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/clubs/:id" element={<ClubProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ORGANIZER', 'ROLE_ADMIN']} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/saved-events" element={<SavedEventsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Route>

        {/* Organizer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ORGANIZER', 'ROLE_ADMIN']} />}>
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/organizer/create-event" element={<CreateEventPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
