'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { TEAM_MEMBERS_DATA, TeamMember } from '@/lib/data';
import { Users, Award, ShieldCheck, Mail, Search } from 'lucide-react';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS_DATA);

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Active Member Roster & Role Assignments"
        subtitle="Manage directorate leads, verify committee memberships, and issue institutional certificates"
      />

      <div className="px-6 space-y-6">
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[10px] uppercase">
                <th className="p-4">Member Name</th>
                <th className="p-4">Directorate</th>
                <th className="p-4">Executive Role</th>
                <th className="p-4">Term</th>
                <th className="p-4">Certification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80">
                  <td className="p-4 flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-[#002366]" />
                    <div>
                      <div className="font-bold text-[#00113a]">{m.name}</div>
                      <div className="text-[11px] text-slate-400">{m.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#eff4ff] text-[#002366] px-2 py-0.5 rounded-xs font-bold text-[10px]">
                      {m.department}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-[#705d00]">{m.role}</td>
                  <td className="p-4 font-mono text-slate-500">{m.term}</td>
                  <td className="p-4">
                    <button
                      onClick={() => alert(`Issuing verified certificate for ${m.name}`)}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-xs font-bold text-[10px] flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Issue Certificate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
