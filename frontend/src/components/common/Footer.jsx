import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Globe, Share2, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-white/10 bg-slate-950 mt-24 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white font-heading">
                Campus<span className="text-gradient">Pulse</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering campus students to discover hackathons, cultural fests, workshops, and club activities with seamless digital QR tickets and certificates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/discover" className="hover:text-white transition-colors">Discover Events</Link></li>
              <li><Link to="/leaderboard" className="hover:text-white transition-colors">Campus Leaderboard</Link></li>
              <li><Link to="/discover?category=Hackathon" className="hover:text-white transition-colors">Hackathons</Link></li>
              <li><Link to="/discover?category=Workshop" className="hover:text-white transition-colors">Workshops</Link></li>
            </ul>
          </div>

          {/* Roles */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">For Campus</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              <li><Link to="/login?role=organizer" className="hover:text-white transition-colors">Club Organizer Hub</Link></li>
              <li><Link to="/login?role=admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact & Network */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Campus Network</h4>
            <p className="text-xs text-slate-400">Stay updated on upcoming club events & hackathons.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 hover:text-white transition-all">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CampusPulse College Club Event Management System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for College Campuses
          </p>
        </div>
      </div>
    </footer>
  );
}
