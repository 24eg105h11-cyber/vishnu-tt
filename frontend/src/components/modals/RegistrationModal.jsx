import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, Sparkles, User, Mail, Phone, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { registrationService } from '../../services/registrationService';
import { useAuthStore } from '../../store/useAuthStore';
import TicketModal from '../common/TicketModal';
import confetti from 'canvas-confetti';

export default function RegistrationModal({ event, onClose }) {
  const { user, addPoints } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredTicket, setRegisteredTicket] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      collegeId: user?.collegeId || 'STU-2024-889',
      phone: user?.phone || '+1 555-0192',
      department: user?.department || 'Computer Science & Engineering',
      year: user?.year || '3rd Year'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const reg = await registrationService.registerForEvent(event.id, {
        ...data,
        eventTitle: event.title
      });

      // Award registration points (+5 points)
      addPoints(5);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      setRegisteredTicket(reg);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (registeredTicket) {
    return (
      <TicketModal
        registration={registeredTicket}
        onClose={() => {
          setRegisteredTicket(null);
          onClose();
        }}
      />
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 text-white overflow-hidden"
        >
          {/* Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Title */}
          <div className="mb-6 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Event Registration
            </span>
            <h3 className="text-xl font-extrabold text-white font-heading">
              {event.title}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant QR Ticket Pass Generation
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Jane Smith"
                  />
                </div>
                {errors.name && <span className="text-[10px] text-rose-400">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">College ID Card No.</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    {...register('collegeId', { required: 'College ID is required' })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="STU-2024-889"
                  />
                </div>
                {errors.collegeId && <span className="text-[10px] text-rose-400">{errors.collegeId.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="student@college.edu"
                  />
                </div>
                {errors.email && <span className="text-[10px] text-rose-400">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="+1 555-0192"
                  />
                </div>
                {errors.phone && <span className="text-[10px] text-rose-400">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    {...register('department', { required: 'Department is required' })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Information Technology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Year of Study</label>
                <select
                  {...register('year')}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
              >
                {loading ? 'Registering...' : 'Confirm Registration 🎉'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
