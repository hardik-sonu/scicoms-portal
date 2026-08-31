'use client';

import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import { EVENTS_DATA } from '@/lib/data';
import { Calendar, Search, Filter } from 'lucide-react';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Symposium', 'Conference', 'Workshop', 'Science Fair', 'Seminar'];

  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchesCat = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Symposia & Bootcamps
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Events & Activities
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Explore upcoming national conventions, hands-on LaTeX workshops, science fairs, and past research webinars organized by SciComS.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search event title, venue, speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold ${
                selectedStatus === 'All' ? 'bg-[#002366] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setSelectedStatus('Upcoming')}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold ${
                selectedStatus === 'Upcoming' ? 'bg-[#fcd400] text-[#221b00]' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Upcoming Only
            </button>
            <button
              onClick={() => setSelectedStatus('Past')}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold ${
                selectedStatus === 'Past' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Past Archives
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#002366] text-white'
                  : 'bg-[#eff4ff] text-[#444650] hover:bg-[#e5eeff] hover:text-[#00113a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-sm space-y-2">
          <p className="text-sm text-slate-500">No events matched your search criteria.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery(''); }}
            className="text-xs text-[#002366] font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
