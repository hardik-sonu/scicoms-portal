'use client';

import React, { useState } from 'react';
import MemberCard from '@/components/MemberCard';
import { TEAM_MEMBERS_DATA } from '@/lib/data';
import { Users, Search, Filter } from 'lucide-react';

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = [
    'All',
    'Editorial & Publications',
    'Media & PR',
    'Event Management',
    'Research & Innovation',
    'Creative & Design',
    'Technology & Web'
  ];

  const filteredMembers = TEAM_MEMBERS_DATA.filter(m => {
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    const matchesQuery = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Departmental Hierarchy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Teams & Directorates
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          The talented student leads driving scientific publication, tech infrastructure, event orchestration, and national PR for the 2025-2026 academic term.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search member, skill, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <span className="font-bold text-[#00113a]">{filteredMembers.length}</span> members
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                selectedDept === dept
                  ? 'bg-[#002366] text-white'
                  : 'bg-[#eff4ff] text-[#444650] hover:text-[#00113a] hover:bg-[#e5eeff]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Member Cards Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-sm space-y-2">
          <p className="text-sm text-slate-500">No members found matching your search query.</p>
          <button
            onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
            className="text-xs text-[#002366] font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
