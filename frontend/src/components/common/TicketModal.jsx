import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Calendar, MapPin, CheckCircle2, Sparkles, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TicketModal({ registration, onClose }) {
  if (!registration) return null;

  const handleDownloadTicket = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 text-white overflow-hidden"
        >
          {/* Top Decorative Header */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ticket Header */}
          <div className="text-center mt-2 mb-6 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Event Ticket
            </div>
            <h3 className="text-xl font-extrabold text-white font-heading mt-2">
              {registration.eventTitle}
            </h3>
            <p className="text-xs text-indigo-400 font-mono">
              Ticket ID: {registration.registrationId}
            </p>
          </div>

          {/* Ticket Body Card */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-white/10 space-y-6 relative overflow-hidden">
            
            {/* Cutout punch holes */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-white/10" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-white/10" />

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner">
              <QRCodeSVG
                value={registration.qrCodeData || registration.registrationId}
                size={180}
                level="H"
                includeMargin={true}
              />
              <span className="mt-2 text-[10px] font-mono text-slate-800 font-bold tracking-widest">
                {registration.registrationId}
              </span>
            </div>

            {/* Student & Event Info grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-t border-dashed border-white/10 pt-4">
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-semibold">Attendee</span>
                <span className="block font-bold text-white mt-0.5">{registration.studentName}</span>
                <span className="block text-[11px] text-slate-400">{registration.collegeId}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-semibold">Department</span>
                <span className="block font-bold text-white mt-0.5">{registration.department}</span>
                <span className="block text-[11px] text-slate-400">{registration.year}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Oct 24, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" /> Main Auditorium
              </span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleDownloadTicket}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              <Download className="w-4 h-4" /> Download / Print Ticket
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
