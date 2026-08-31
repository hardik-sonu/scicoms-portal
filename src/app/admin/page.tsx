'use client';

import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { MOCK_APPLICATIONS_DATA, EVENTS_DATA, JOURNAL_DATA } from '@/lib/data';

export default function AdminDashboardPage() {
  const pendingApps = MOCK_APPLICATIONS_DATA.filter(a => a.status === 'Pending');

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Institutional Dashboard"
        subtitle="Overview of society operations, journal submissions, and member registrations"
      />

      <div className="px-6 space-y-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Total Active Members</span>
              <div className="p-1.5 bg-[#eff4ff] text-[#002366] rounded-xs"><Users className="w-4 h-4" /></div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#00113a]">1,540</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18% from last semester</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Pending Applications</span>
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-xs"><UserCheck className="w-4 h-4" /></div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#705d00]">{pendingApps.length}</div>
            <div className="text-[11px] text-slate-500">Requires executive review</div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Published Papers</span>
              <div className="p-1.5 bg-[#eff4ff] text-[#002366] rounded-xs"><BookOpen className="w-4 h-4" /></div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#00113a]">{JOURNAL_DATA.length} Papers</div>
            <div className="text-[11px] text-slate-500">Volume 8 indexed</div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Upcoming Events</span>
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xs"><Calendar className="w-4 h-4" /></div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#00113a]">
              {EVENTS_DATA.filter(e => e.status === 'Upcoming').length} Events
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">664 registered delegates</div>
          </div>
        </div>

        {/* Quick Actions & Recent Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications Queue */}
          <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-[#00113a]">Recent Applications Queue</h3>
                <p className="text-xs text-slate-500">Student dossiers awaiting executive approval</p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-bold text-[#002366] hover:underline flex items-center gap-1"
              >
                <span>View Full Queue</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-2">Applicant</th>
                    <th className="py-2">Roll No</th>
                    <th className="py-2">Target Directorate</th>
                    <th className="py-2">Status</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_APPLICATIONS_DATA.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80">
                      <td className="py-3 font-bold text-[#00113a]">{app.fullName}</td>
                      <td className="py-3 font-mono text-slate-500">{app.rollNumber}</td>
                      <td className="py-3 font-medium text-[#705d00]">{app.preferredTeam}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                          app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link href="/admin/applications" className="text-[#002366] font-bold hover:underline">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#00113a] border-b border-slate-100 pb-3">
              Administrative Quick Actions
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/events"
                className="w-full p-3 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-slate-200 rounded-xs flex items-center justify-between text-xs font-bold text-[#00113a] transition-colors"
              >
                <span>+ Create New Symposium / Workshop</span>
                <Calendar className="w-4 h-4 text-[#002366]" />
              </Link>

              <Link
                href="/admin/journal"
                className="w-full p-3 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-slate-200 rounded-xs flex items-center justify-between text-xs font-bold text-[#00113a] transition-colors"
              >
                <span>+ Publish New Journal Issue</span>
                <BookOpen className="w-4 h-4 text-[#002366]" />
              </Link>

              <Link
                href="/admin/communications"
                className="w-full p-3 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-slate-200 rounded-xs flex items-center justify-between text-xs font-bold text-[#00113a] transition-colors"
              >
                <span>Broadcast Notice to Members</span>
                <Users className="w-4 h-4 text-[#002366]" />
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Security Status: Nominal</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Database synced with IMME Punjab University central directory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
