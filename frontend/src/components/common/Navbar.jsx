import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { 
  Sparkles, Calendar, Compass, Shield, Award, 
  Bell, User, LogOut, ChevronDown, PlusCircle, CheckCircle2,
  Bookmark, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, role } = useAuthStore();
  const { notifications, markAsRead } = useNotificationStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Campus Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                Campus<span className="text-gradient">Pulse</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-indigo-400 uppercase">
                College Club Platform
              </span>
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/5">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isLinkActive('/') 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isLinkActive('/discover') 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              Discover Events
            </Link>
            <Link
              to="/leaderboard"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isLinkActive('/leaderboard') 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              Leaderboard
            </Link>

            {isAuthenticated && role === 'ROLE_STUDENT' && (
              <Link
                to="/my-events"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isLinkActive('/my-events') 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-4 h-4" />
                My Events
              </Link>
            )}

            {isAuthenticated && (role === 'ROLE_ORGANIZER' || role === 'ROLE_ADMIN') && (
              <Link
                to="/organizer"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isLinkActive('/organizer') 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                    : 'text-purple-300 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-purple-400" />
                Organizer Portal
              </Link>
            )}

            {isAuthenticated && role === 'ROLE_ADMIN' && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isLinkActive('/admin') 
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md' 
                    : 'text-rose-300 hover:text-white hover:bg-rose-500/10'
                }`}
              >
                <Shield className="w-4 h-4 text-rose-400" />
                Admin
              </Link>
            )}
          </div>

          {/* Right Section: Notifications & User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950 animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-white/10"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Bell className="w-4 h-4 text-indigo-400" /> Notifications
                          </h4>
                          <span className="text-xs text-slate-400">{notifications.length} total</span>
                        </div>

                        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                          {notifications.length === 0 ? (
                            <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                onClick={() => markAsRead(n.id)}
                                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                                  n.isRead
                                    ? 'bg-slate-900/40 border-white/5 opacity-70'
                                    : 'bg-indigo-950/40 border-indigo-500/30'
                                }`}
                              >
                                <div className="font-semibold text-white mb-1 flex items-center justify-between">
                                  <span>{n.title}</span>
                                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                                </div>
                                <p className="text-slate-300 leading-relaxed">{n.message}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all"
                  >
                    <img
                      src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={user?.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30"
                    />
                    <div className="text-left">
                      <span className="block text-xs font-bold text-white line-clamp-1">{user?.name}</span>
                      <span className="block text-[10px] text-indigo-400 font-medium">
                        {user?.points || 0} PTS
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-white/10"
                      >
                        <div className="p-3 border-b border-white/10 mb-2">
                          <p className="text-xs font-bold text-white">{user?.name}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{user?.email}</p>
                          <div className="mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {role === 'ROLE_ADMIN' ? '👑 Admin' : role === 'ROLE_ORGANIZER' ? '🌟 Club Organizer' : '🎓 Student'}
                          </div>
                        </div>

                        {role === 'ROLE_STUDENT' && (
                          <>
                            <Link
                              to="/student/dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                            >
                              <User className="w-4 h-4 text-indigo-400" /> Dashboard
                            </Link>
                            <Link
                              to="/my-events"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                            >
                              <Calendar className="w-4 h-4 text-purple-400" /> My Registered Events
                            </Link>
                            <Link
                              to="/saved-events"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                            >
                              <Bookmark className="w-4 h-4 text-pink-400" /> Saved Events
                            </Link>
                            <Link
                              to="/certificates"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certificates
                            </Link>
                          </>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 mt-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  Join Platform
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-panel border-t border-white/10 px-4 py-6 space-y-3"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              to="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Discover Events
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Leaderboard
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10"
                >
                  My Events & Tickets
                </Link>
                {role === 'ROLE_ORGANIZER' && (
                  <Link
                    to="/organizer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-purple-300 hover:bg-purple-500/10"
                  >
                    Organizer Dashboard
                  </Link>
                )}
                {role === 'ROLE_ADMIN' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-500/10"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-semibold text-slate-200 bg-slate-900 border border-white/10"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  Join Platform
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
