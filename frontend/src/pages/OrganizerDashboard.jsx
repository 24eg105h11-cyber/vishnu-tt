import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { clubService } from '../services/clubService';
import QrScannerModal from '../components/common/QrScannerModal';
import { 
  PlusCircle, QrCode, Calendar, Users, BarChart3, Bell, 
  Sparkles, CheckCircle2, Star, TrendingUp, Clock, AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const REGISTRATION_TREND_DATA = [
  { name: 'Mon', registrations: 12 },
  { name: 'Tue', registrations: 24 },
  { name: 'Wed', registrations: 45 },
  { name: 'Thu', registrations: 78 },
  { name: 'Fri', registrations: 110 },
  { name: 'Sat', registrations: 142 },
  { name: 'Sun', registrations: 160 },
];

const CATEGORY_PIE_DATA = [
  { name: 'Hackathon', value: 45, color: '#6366f1' },
  { name: 'Workshop', value: 30, color: '#a855f7' },
  { name: 'Coding Contest', value: 15, color: '#ec4899' },
  { name: 'Cultural', value: 10, color: '#10b981' },
];

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedEventForScanner, setSelectedEventForScanner] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementSuccess, setAnnouncementSuccess] = useState('');

  useEffect(() => {
    async function loadOrgEvents() {
      const all = await eventService.getEvents();
      setEvents(all.filter(e => e.organizerUserId === 'user-organizer' || e.clubId === 'club-1'));
    }
    loadOrgEvents();
  }, []);

  const handlePublishAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) return;

    await clubService.createAnnouncement({
      clubId: 'club-1',
      title: announcementTitle,
      content: announcementContent,
      priority: 'HIGH'
    });

    setAnnouncementSuccess('Announcement published to all followers 🎉');
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setTimeout(() => setAnnouncementSuccess(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block">
              Club Organizer Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
              ByteCraft Coding Club Portal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Manage club events, scan student QR passes, send announcements & analyze engagement
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSelectedEventForScanner(events[0]?.id || 'evt-1');
                setShowScanner(true);
              }}
              className="py-3 px-5 rounded-2xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center gap-2 transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-400" /> Attendance Scanner
            </button>

            <Link
              to="/organizer/create-event"
              className="py-3 px-5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Create New Event
            </Link>
          </div>
        </div>
      </div>

      {/* Organizer Statistics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Club Events</span>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white font-heading block">
            {events.length}
          </span>
          <span className="text-[10px] text-purple-400 font-medium">Published & Pending</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Registrations</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-2xl font-black text-indigo-400 font-heading block">
            220
          </span>
          <span className="text-[10px] text-indigo-300 font-medium">Across all events</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Attendance Rate</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-heading block">
            86.4%
          </span>
          <span className="text-[10px] text-emerald-300 font-medium">Checked-in Verified</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Club Followers</span>
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-heading block">
            524
          </span>
          <span className="text-[10px] text-amber-300 font-medium">Active Students</span>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Trend Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-heading">Registration Velocity Trend</h3>
              <p className="text-xs text-slate-400">Daily signups for flagship events</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Recharts
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REGISTRATION_TREND_DATA}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="registrations" stroke="#6366f1" fillOpacity={1} fill="url(#colorReg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-heading">Category Distribution</h3>
            <p className="text-xs text-slate-400">Events break-up by domain</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                  {CATEGORY_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-t border-white/5 pt-3">
            {CATEGORY_PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Table & Broadcast Announcement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Events Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading">Managed Events</h3>
            <Link to="/organizer/create-event" className="text-xs font-bold text-purple-400 hover:underline">
              + New Event
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-3 rounded-l-xl">Event</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Registrations</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-white max-w-[180px] truncate">
                      {evt.title}
                    </td>
                    <td className="py-3 px-3 text-slate-400">{evt.date}</td>
                    <td className="py-3 px-3 font-bold text-indigo-400">
                      {evt.registeredCount} / {evt.maxCapacity}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        evt.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedEventForScanner(evt.id);
                          setShowScanner(true);
                        }}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1 ml-auto"
                      >
                        <QrCode className="w-3.5 h-3.5" /> Scan QR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Broadcast Announcement Form */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold text-white font-heading">Publish Announcement</h3>
          </div>
          <p className="text-xs text-slate-400">Send an instant alert to all 524 club followers</p>

          {announcementSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs">
              {announcementSuccess}
            </div>
          )}

          <form onSubmit={handlePublishAnnouncement} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Hackathon Problem Statements Live"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Content</label>
              <textarea
                required
                rows={3}
                placeholder="Write message details for followers..."
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
            >
              Broadcast Notification 🔔
            </button>
          </form>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QrScannerModal
          eventId={selectedEventForScanner}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
