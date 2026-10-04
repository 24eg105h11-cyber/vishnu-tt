import React from 'react';
import { Award, Download, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificateCard({ certificate }) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 border border-amber-500/20 shadow-2xl relative overflow-hidden group bg-gradient-to-b from-slate-900/90 to-slate-950"
    >
      {/* Decorative Gold Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600" />

      {/* Certificate Outer Frame */}
      <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-6 bg-slate-950/60 relative">
        
        {/* Background Watermark Icon */}
        <Award className="absolute right-6 bottom-6 w-36 h-36 text-amber-500/5 pointer-events-none" />

        {/* Certificate Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block">
                Official Campus Certificate
              </span>
              <span className="text-[10px] text-slate-400">Issued by Campus Pulse Platform</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {certificate.certificateId}
          </span>
        </div>

        {/* Main Certificate Text */}
        <div className="text-center space-y-4 my-6">
          <h2 className="text-xl sm:text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-heading uppercase">
            Certificate of Participation
          </h2>
          <p className="text-xs text-slate-400">This certificate is proudly presented to</p>

          <h3 className="text-2xl font-black text-white underline underline-offset-8 decoration-amber-500/50 font-heading">
            {certificate.studentName}
          </h3>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            for active participation and successful completion of the campus event
          </p>

          <div className="py-2 px-4 rounded-xl bg-slate-900/80 border border-white/10 inline-block text-sm font-extrabold text-indigo-300">
            {certificate.eventTitle}
          </div>
        </div>

        {/* Footer Details & Signature */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs items-end">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Date of Issue</span>
            <span className="block font-bold text-slate-200">{certificate.issueDate}</span>
          </div>

          <div className="text-right">
            <div className="inline-block border-b border-white/30 pb-1 px-4 mb-1">
              <span className="font-serif italic text-amber-300 font-bold text-sm">Dr. Robert Vance</span>
            </div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Faculty Organizer Signature</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={handleDownload}
          className="py-2.5 px-5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Download className="w-4 h-4" /> Download Certificate (PDF)
        </button>
      </div>
    </motion.div>
  );
}
