import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { 
  Shield, CheckCircle2, XCircle, Users, Calendar, Award, 
  BarChart3, AlertTriangle, Building2, UserX, UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending-events');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const s = await adminService.getStats();
        setStats(s);

        const pe = await adminService.getPendingEvents();
        setPendingEvents(pe);

        const u = await adminService.getUsers();
        setUsers(u);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleApproveEvent = async (id) => {
    if (window.confirm('Approve this club event for campus publishing?')) {
      await adminService.approveEvent(id);
      setPendingEvents(pendingEvents.filter(e => e.id !== id));
      if (stats) setStats({ ...stats, pendingEventsCount: Math.max(0, stats.pendingEventsCount - 1) });
    }
  };

  const handleRejectEvent = async (id) => {
    if (window.confirm('Reject this event submission?')) {
      await adminService.rejectEvent(id);
      setPendingEvents(pendingEvents.filter(e => e.id !== id));
    }
  };

  const handleToggleUser = async (id) => {
    await adminService.toggleUserStatus(id);
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/50 via-slate-950 to-indigo-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Shield className="w-3.5 h-3.5" /> Campus Platform Administration
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Admin Governance Console
            </h1>
            <p className="text-xs text-slate-300">
              Manage clubs, review pending event approvals, monitor user activity & platform metrics
            </p>
          </div>
        </div>
      </div>

      {/* Platform Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Registered Students</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-2xl font-black text-white font-heading block">
            {stats?.totalStudents || 1240}
          </span>
          <span className="text-[10px] text-indigo-400 font-medium">Verified Campus Accounts</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Active Campus Clubs</span>
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-purple-400 font-heading block">
            {stats?.totalClubs || 24}
          </span>
          <span className="text-[10px] text-purple-300 font-medium">Approved Organizations</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Event Signups</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-heading block">
            {stats?.totalRegistrations || 3840}
          </span>
          <span className="text-[10px] text-emerald-300 font-medium">All Time Registrations</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Pending Event Approvals</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-heading block">
            {stats?.pendingEventsCount || pendingEvents.length}
          </span>
          <span className="text-[10px] text-amber-300 font-medium">Action Required</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        {[
          { id: 'pending-events', label: `Pending Events (${pendingEvents.length})` },
          { id: 'users', label: 'User Management' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pending Events Tab */}
      {activeTab === 'pending-events' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white font-heading">Event Approval Queue</h2>

          {pendingEvents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No pending event submissions requiring review right now 🎉
            </div>
          ) : (
            <div className="space-y-4">
              {pendingEvents.map((evt) => (
                <div key={evt.id} className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {evt.category}
                      </span>
                      <span className="text-xs text-slate-400">By {evt.clubName}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{evt.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{evt.description}</p>
                    <p className="text-[11px] text-slate-400">Date: {evt.date} • Venue: {evt.venue}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApproveEvent(evt.id)}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                    </button>
                    <button
                      onClick={() => handleRejectEvent(evt.id)}
                      className="py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white font-heading">Registered Platform Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3.5 px-4 rounded-l-xl">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">College ID</th>
                  <th className="py-3.5 px-4">Points</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      <div>
                        <span className="block text-sm">{u.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">{u.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{u.collegeId}</td>
                    <td className="py-4 px-4 font-bold text-amber-400">{u.points} PTS</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.active !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {u.active !== false ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleToggleUser(u.id)}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all ${
                          u.active !== false
                            ? 'text-rose-400 hover:bg-rose-500/10 border border-rose-500/30'
                            : 'text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30'
                        }`}
                      >
                        {u.active !== false ? 'Suspend User' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
