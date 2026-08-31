'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { MOCK_APPLICATIONS_DATA, MembershipApplication } from '@/lib/data';
import { UserCheck, CheckCircle2, XCircle, Clock, Eye, Download, Search } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<MembershipApplication[]>(MOCK_APPLICATIONS_DATA);
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const handleUpdateStatus = (id: string, newStatus: MembershipApplication['status']) => {
    setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const filteredApps = apps.filter(a => statusFilter === 'All' || a.status === statusFilter);

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Membership Application Review Queue"
        subtitle="Inspect candidate credentials, department preferences, and render executive admission decisions"
      />

      <div className="px-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-sm border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            {['All', 'Pending', 'Interview Scheduled', 'Approved', 'Rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-colors ${
                  statusFilter === st
                    ? 'bg-[#002366] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <strong className="text-[#00113a]">{filteredApps.length}</strong> applications
          </div>
        </div>

        {/* Grid / List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Table */}
          <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="p-4">App ID & Name</th>
                  <th className="p-4">Roll / Dept</th>
                  <th className="p-4">Preferred Wing</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`cursor-pointer transition-colors ${
                      selectedApp?.id === app.id ? 'bg-[#eff4ff]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-mono text-[10px] text-slate-400">{app.id}</div>
                      <div className="font-bold text-[#00113a]">{app.fullName}</div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="font-mono">{app.rollNumber}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{app.department}</div>
                    </td>
                    <td className="p-4 font-semibold text-[#705d00]">
                      {app.preferredTeam}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Eye className="w-4 h-4 text-[#002366] inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Inspection Drawer */}
          <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">
            {selectedApp ? (
              <div className="space-y-4 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{selectedApp.id}</span>
                  <h3 className="font-serif font-bold text-lg text-[#00113a]">{selectedApp.fullName}</h3>
                  <p className="text-[11px] text-slate-500">{selectedApp.email} • {selectedApp.phone}</p>
                </div>

                <div className="space-y-2">
                  <div><span className="text-slate-500">Degree & Term:</span> <strong>{selectedApp.degree} ({selectedApp.semester})</strong></div>
                  <div><span className="text-slate-500">Target Directorate:</span> <strong className="text-[#705d00]">{selectedApp.preferredTeam}</strong></div>
                  <div><span className="text-slate-500">Secondary Preference:</span> <strong>{selectedApp.secondaryTeam}</strong></div>
                  <div>
                    <span className="text-slate-500 block mb-1">Key Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedApp.skills.map((s, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-xs text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Statement of Purpose:</span>
                    <p className="p-2.5 bg-[#f8f9ff] rounded-xs border border-slate-100 text-slate-700 leading-relaxed italic">
                      "{selectedApp.statementOfPurpose}"
                    </p>
                  </div>
                </div>

                {/* Workflow Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-[#00113a] mb-2">Executive Action:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, 'Approved')}
                      className="py-2 bg-emerald-600 text-white font-bold rounded-xs hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, 'Interview Scheduled')}
                      className="py-2 bg-[#002366] text-white font-bold rounded-xs hover:bg-[#00113a] flex items-center justify-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Interview</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Rejected')}
                    className="w-full py-1.5 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xs"
                  >
                    Decline Dossier
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <UserCheck className="w-8 h-8 mx-auto text-slate-300" />
                <p>Select any applicant record to inspect credentials.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
