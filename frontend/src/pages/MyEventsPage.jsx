import React, { useEffect, useState } from 'react';
import { registrationService } from '../services/registrationService';
import TicketModal from '../components/common/TicketModal';
import { Calendar, QrCode, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyEventsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegs() {
      setLoading(true);
      try {
        const data = await registrationService.getMyRegistrations();
        setRegistrations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRegs();
  }, []);

  const handleCancel = async (regId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      await registrationService.cancelRegistration(regId);
      setRegistrations(registrations.map(r => r.registrationId === regId || r.id === regId ? { ...r, status: 'CANCELLED' } : r));
    }
  };

  const filtered = registrations.filter(r => {
    if (activeTab === 'upcoming') return r.status === 'REGISTERED';
    if (activeTab === 'completed') return r.status === 'ATTENDED';
    if (activeTab === 'cancelled') return r.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-heading">My Registered Events</h1>
        <p className="text-xs text-slate-400">Access your digital QR entry tickets and event history</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'completed', label: 'Completed / Attended' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading registered events...</div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 max-w-md mx-auto my-8 border border-white/10">
          <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No {activeTab} events</h3>
          <p className="text-xs text-slate-400">Browse the discover section to register for upcoming college events!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((reg) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {reg.registrationId}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    reg.status === 'ATTENDED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : reg.status === 'CANCELLED'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {reg.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading">{reg.eventTitle}</h3>
                <p className="text-xs text-slate-400">Attendee: {reg.studentName} ({reg.collegeId})</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                {reg.status === 'REGISTERED' && (
                  <>
                    <button
                      onClick={() => setSelectedTicket(reg)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20"
                    >
                      <QrCode className="w-4 h-4" /> View Ticket Pass
                    </button>
                    <button
                      onClick={() => handleCancel(reg.registrationId)}
                      className="p-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {reg.status === 'ATTENDED' && (
                  <button
                    onClick={() => setSelectedTicket(reg)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Attendance Verified
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <TicketModal
          registration={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
