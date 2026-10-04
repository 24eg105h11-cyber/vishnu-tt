import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { 
  Sparkles, Calendar, Clock, MapPin, Users, Upload, CheckCircle2, 
  ArrowRight, ArrowLeft, ShieldCheck, Image, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Technical', 'Cultural', 'Sports', 'Hackathon', 'Workshop', 'Coding', 'Entrepreneurship', 'Arts', 'Music'];

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    description: '',
    posterUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: '2026-11-15',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    venue: 'Main Innovation Auditorium',
    maxCapacity: 150,
    eligibility: 'Open to all undergraduate and postgraduate students.',
    rules: [
      'Valid student college ID required for entry',
      'Laptops required for hands-on sessions'
    ],
    contactEmail: 'organizer@codingclub.edu',
    contactPhone: '+1 555-8822'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePosterUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPoster(true);
    try {
      const url = await eventService.uploadPoster(file);
      setFormData({ ...formData, posterUrl: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleAddRule = () => {
    setFormData({ ...formData, rules: [...formData.rules, 'New event guideline rule'] });
  };

  const handleRuleChange = (index, val) => {
    const updated = [...formData.rules];
    updated[index] = val;
    setFormData({ ...formData, rules: updated });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await eventService.createEvent(formData);
      navigate('/organizer');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white font-heading">Create New Campus Event</h1>
        <p className="text-xs text-slate-400">4-Step wizard to prepare your club event for admin approval</p>
      </div>

      {/* Step Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        {[
          { step: 1, label: 'Basic Info' },
          { step: 2, label: 'Schedule & Venue' },
          { step: 3, label: 'Capacity & Rules' },
          { step: 4, label: 'Preview & Submit' }
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              currentStep === s.step
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : currentStep > s.step
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-500'
            }`}>
              {currentStep > s.step ? <CheckCircle2 className="w-4 h-4" /> : s.step}
            </div>
            <span className={`hidden sm:inline text-xs font-semibold ${
              currentStep === s.step ? 'text-white' : 'text-slate-500'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-xs"
            >
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" /> Step 1: Basic Information
              </h3>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Prompt Engineering & LLM Workshop"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Upload Event Poster (Cloudinary)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 text-xs"
                  />
                  {uploadingPoster && <span className="text-[10px] text-purple-400">Uploading to Cloudinary...</span>}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Description</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of activities, agenda, and outcomes..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 flex items-center gap-2"
                >
                  <span>Next: Schedule & Venue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-xs"
            >
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" /> Step 2: Date, Time & Venue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    placeholder="10:00 AM"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Time</label>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    placeholder="04:00 PM"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Venue Location</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Main Auditorium & Lab 3"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-slate-400 hover:text-white flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 flex items-center gap-2"
                >
                  <span>Next: Capacity & Guidelines</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-xs"
            >
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-400" /> Step 3: Registration Capacity & Guidelines
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Maximum Seats Capacity</label>
                  <input
                    type="number"
                    name="maxCapacity"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Event Rules & Guidelines</label>
                <div className="space-y-2">
                  {formData.rules.map((rule, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={rule}
                      onChange={(e) => handleRuleChange(idx, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddRule}
                  className="mt-2 text-xs text-purple-400 hover:underline font-bold"
                >
                  + Add Another Rule
                </button>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-slate-400 hover:text-white flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 flex items-center gap-2"
                >
                  <span>Next: Preview & Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-xs"
            >
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Step 4: Preview & Submit for Approval
              </h3>

              <div className="bg-slate-900/90 rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Status: PENDING ADMIN APPROVAL
                  </span>
                  <span className="text-xs text-indigo-400 font-bold">{formData.category}</span>
                </div>

                <h2 className="text-2xl font-black text-white font-heading">{formData.title}</h2>
                <p className="text-slate-300 leading-relaxed">{formData.description}</p>

                <div className="grid grid-cols-2 gap-2 text-slate-300 pt-2 border-t border-white/10">
                  <div>Date: <strong>{formData.date} ({formData.startTime})</strong></div>
                  <div>Venue: <strong>{formData.venue}</strong></div>
                  <div>Capacity: <strong>{formData.maxCapacity} seats</strong></div>
                  <div>Eligibility: <strong>{formData.eligibility}</strong></div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-slate-400 hover:text-white flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="py-3.5 px-8 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-purple-600 to-indigo-600 hover:opacity-90 shadow-xl shadow-emerald-500/20 flex items-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Event for Admin Approval 🎉'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
