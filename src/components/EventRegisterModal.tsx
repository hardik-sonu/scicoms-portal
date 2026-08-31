'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Ticket, Calendar, MapPin } from 'lucide-react';
import { EventItem } from '@/lib/data';

export default function EventRegisterModal({
  event,
  isOpen,
  onClose
}: {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    institution: 'University of the Punjab',
    role: 'Student'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `SCMS-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(refCode);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-sm border border-[#00113a]/10 max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Event Registration</h3>
            <p className="text-xs text-slate-500 truncate max-w-xs">{event.title}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="bg-[#eff4ff] p-3 rounded-xs text-xs space-y-1 text-[#002366]">
              <div className="font-bold flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date} • {event.time}</div>
              <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#00113a] mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Zainab Malik"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@pu.edu.pk"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Roll / ID Number</label>
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  placeholder="BME-23-45"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Institution</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Attendee Category</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                >
                  <option value="Student">Student (PU)</option>
                  <option value="External Student">External Student</option>
                  <option value="Faculty / Researcher">Faculty / Researcher</option>
                  <option value="Industry Delegate">Industry Delegate</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              Registration Fee: <span className="font-bold text-[#705d00]">{event.registrationFee}</span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#002366] text-white text-xs font-bold rounded-xs hover:bg-[#00113a]"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#00113a]">Registration Confirmed!</h4>
              <p className="text-xs text-slate-600 mt-1">
                Your entry pass has been generated. An institutional e-ticket was sent to <span className="font-bold">{formData.email}</span>.
              </p>
            </div>
            <div className="bg-[#eff4ff] p-4 rounded-xs border border-[#002366]/20 font-mono text-sm font-bold text-[#002366] flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" />
              <span>PASS ID: {ticketId}</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#00113a] text-white text-xs font-bold rounded-xs hover:bg-[#002366]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
