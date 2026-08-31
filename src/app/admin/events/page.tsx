'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { EVENTS_DATA, EventItem } from '@/lib/data';
import { Calendar, Plus, Edit, Trash2, Users, CheckCircle, MapPin } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Workshop');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      tagline: 'Empowering Student Innovation',
      category: category,
      date: date || 'December 10, 2026',
      time: '10:00 AM - 04:00 PM',
      location: location || 'IMME Complex, PU Lahore',
      venueType: 'In-Person',
      status: 'Upcoming',
      featured: false,
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      description: 'Newly created event listing by administration.',
      fullDetails: 'Detailed agenda will be distributed to registered participants.',
      speakers: [],
      schedule: [],
      registrationFee: 'Free',
      eligibility: 'All students',
      capacity: 100,
      registeredCount: 0
    };

    setEvents([newEvent, ...events]);
    setTitle('');
    setDate('');
    setLocation('');
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event listing?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Events & Symposia Management"
        subtitle="Create, edit, and track registrations for conferences, workshops, and science fairs"
      />

      <div className="px-6 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-mono">
            Total active events: <strong className="text-[#00113a]">{events.length}</strong>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-[#002366] hover:bg-[#00113a] text-white text-xs font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Event</span>
          </button>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[10px] uppercase">
                <th className="p-4">Event Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date & Location</th>
                <th className="p-4">Capacity / Booked</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-[#00113a] max-w-xs truncate">
                    {evt.title}
                  </td>
                  <td className="p-4">
                    <span className="bg-[#eff4ff] text-[#002366] px-2 py-0.5 rounded-xs font-bold text-[10px] uppercase">
                      {evt.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{evt.date}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">{evt.location}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#00113a]">
                    {evt.registeredCount} / {evt.capacity}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                      evt.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Create New Event Listing</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#00113a] mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced Ceramic Materials Workshop"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventItem['category'])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                >
                  <option value="Symposium">Symposium</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Science Fair">Science Fair</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Date String</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. November 24, 2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Venue Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Faisal Auditorium PU"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 font-bold rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#002366] text-white font-bold rounded-xs"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
