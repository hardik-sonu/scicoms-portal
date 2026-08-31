'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EVENTS_DATA, JOURNAL_DATA, TEAM_MEMBERS_DATA, LEADERSHIP_DATA } from '@/lib/data';
import { Search, BookOpen, Calendar, Users, ArrowRight, FileText } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'journal' | 'events' | 'members'>('all');

  const q = query.toLowerCase().trim();

  const matchedArticles = JOURNAL_DATA.filter(a => 
    !q || a.title.toLowerCase().includes(q) || a.abstract.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  );

  const matchedEvents = EVENTS_DATA.filter(e => 
    !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
  );

  const matchedMembers = [...TEAM_MEMBERS_DATA, ...LEADERSHIP_DATA].filter(m => 
    !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)
  );

  const totalResults = matchedArticles.length + matchedEvents.length + matchedMembers.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Header Search Box */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#00113a]">
          Universal Portal Search
        </h1>
        <p className="text-xs sm:text-sm text-[#444650]">
          Search across published scientific papers, symposia archives, faculty advisors, and team directories.
        </p>

        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
          <input
            type="text"
            autoFocus
            placeholder="Search keywords: Metallurgy, Friction Stir, Symposium, Ahmad, AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-slate-300 rounded-xs shadow-xs focus:ring-2 focus:ring-[#002366] focus:outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-xs transition-colors ${
            activeTab === 'all' ? 'bg-[#002366] text-white' : 'text-[#444650] hover:bg-slate-100'
          }`}
        >
          All Results ({totalResults})
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-4 py-1.5 rounded-xs transition-colors ${
            activeTab === 'journal' ? 'bg-[#002366] text-white' : 'text-[#444650] hover:bg-slate-100'
          }`}
        >
          Journal Papers ({matchedArticles.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-1.5 rounded-xs transition-colors ${
            activeTab === 'events' ? 'bg-[#002366] text-white' : 'text-[#444650] hover:bg-slate-100'
          }`}
        >
          Events ({matchedEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-1.5 rounded-xs transition-colors ${
            activeTab === 'members' ? 'bg-[#002366] text-white' : 'text-[#444650] hover:bg-slate-100'
          }`}
        >
          Scholars & Team ({matchedMembers.length})
        </button>
      </div>

      {/* Results Container */}
      <div className="space-y-8">
        {/* Papers Section */}
        {(activeTab === 'all' || activeTab === 'journal') && matchedArticles.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#002366]" />
              <span>Scientific Papers & Journal Issues</span>
            </h3>
            <div className="space-y-3">
              {matchedArticles.map((a) => (
                <div key={a.id} className="p-4 bg-white border border-[#00113a]/10 rounded-sm shadow-xs flex justify-between items-center gap-4">
                  <div>
                    <span className="text-[10px] bg-[#eff4ff] text-[#002366] font-bold px-2 py-0.5 rounded-xs uppercase">{a.category}</span>
                    <h4 className="font-bold text-sm text-[#00113a] mt-1">{a.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{a.abstract}</p>
                  </div>
                  <Link href={`/journal/${a.id}`} className="shrink-0 text-xs font-bold text-[#002366] hover:underline flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {(activeTab === 'all' || activeTab === 'events') && matchedEvents.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#705d00]" />
              <span>Symposia, Conferences & Workshops</span>
            </h3>
            <div className="space-y-3">
              {matchedEvents.map((e) => (
                <div key={e.id} className="p-4 bg-white border border-[#00113a]/10 rounded-sm shadow-xs flex justify-between items-center gap-4">
                  <div>
                    <span className="text-[10px] bg-[#ffd700] text-[#00113a] font-bold px-2 py-0.5 rounded-xs uppercase">{e.category}</span>
                    <h4 className="font-bold text-sm text-[#00113a] mt-1">{e.title}</h4>
                    <p className="text-xs text-slate-500">{e.date} • {e.location}</p>
                  </div>
                  <Link href={`/events/${e.id}`} className="shrink-0 text-xs font-bold text-[#002366] hover:underline flex items-center gap-1">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Section */}
        {(activeTab === 'all' || activeTab === 'members') && matchedMembers.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#002366]" />
              <span>Faculty Mentors & Team Directorate</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedMembers.map((m) => (
                <div key={m.id} className="p-4 bg-white border border-[#00113a]/10 rounded-sm shadow-xs flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-[#002366]" />
                  <div>
                    <h4 className="font-bold text-xs text-[#00113a]">{m.name}</h4>
                    <p className="text-[11px] text-[#705d00]">{m.role}</p>
                    <p className="text-[10px] text-slate-500">{m.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-sm space-y-2">
            <p className="text-sm text-slate-500">No records found matching "{query}".</p>
            <button onClick={() => setQuery('')} className="text-xs font-bold text-[#002366] hover:underline">
              Clear search query
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
