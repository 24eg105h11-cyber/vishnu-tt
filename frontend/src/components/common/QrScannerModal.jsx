import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, AlertCircle, Sparkles, Camera, Search, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { attendanceService } from '../../services/attendanceService';
import confetti from 'canvas-confetti';

export default function QrScannerModal({ eventId, onClose, onAttendanceMarked }) {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleProcessScan = async (codeToVerify) => {
    if (!codeToVerify || !codeToVerify.trim()) return;
    setLoading(true);
    setErrorMessage('');
    setScanResult(null);

    try {
      const attendance = await attendanceService.checkInStudent(codeToVerify.trim(), eventId);
      setScanResult(attendance);
      
      // Confetti celebration sound & effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onAttendanceMarked) onAttendanceMarked(attendance);
    } catch (err) {
      setErrorMessage(err.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    handleProcessScan(manualCode);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Attendance Scanner
                </h3>
                <p className="text-xs text-slate-400">Scan student QR ticket or enter Registration ID</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="my-6">
            <div className="relative h-64 rounded-2xl bg-slate-900 border-2 border-dashed border-indigo-500/40 overflow-hidden flex flex-col items-center justify-center text-center p-6 group">
              
              {/* Corner target lines */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500" />

              {/* Animated laser line */}
              <motion.div
                animate={{ y: [-90, 90, -90] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_#6366f1]"
              />

              <Camera className="w-12 h-12 text-indigo-400/80 mb-3 animate-pulse" />
              <p className="text-xs font-semibold text-slate-300">
                Camera Scanner Active
              </p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                Hold student QR ticket in front of the lens to check-in automatically
              </p>

              <button
                type="button"
                onClick={() => handleProcessScan('REG-2026-88291')}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
              >
                Simulate Camera Scan (Sample Ticket)
              </button>
            </div>
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Or Enter Ticket Code Manually:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. REG-2026-88291"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" /> Check-In
              </button>
            </div>
          </form>

          {/* Result Banner */}
          <AnimatePresence>
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-white text-sm">Attendance Marked ✓</h4>
                  <p className="mt-1">Attendee: <strong className="text-emerald-300">{scanResult.studentName}</strong> ({scanResult.collegeId})</p>
                  <p className="text-[11px] text-emerald-400/80 mt-0.5">+20 Participation Points awarded to student!</p>
                </div>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 flex items-start gap-3"
              >
                <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-white text-sm">Check-In Failed</h4>
                  <p className="mt-1 text-rose-300">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
