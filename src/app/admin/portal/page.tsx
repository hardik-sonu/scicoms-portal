import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { GraduationCap, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminPortalAcademicPage() {
  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="SciComS Academic Management Portal"
        subtitle="Inter-departmental synchronization, student credit hours, and university administrative approvals"
      />

      <div className="px-6 space-y-6">
        <div className="bg-[#eff4ff] border border-[#002366]/20 rounded-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#002366]" />
            <div>
              <h3 className="font-serif font-bold text-xl text-[#00113a]">
                University Academic Accreditation System
              </h3>
              <p className="text-xs text-[#705d00] font-semibold">Faculty of Engineering & Technology (FET), University of the Punjab</p>
            </div>
          </div>

          <p className="text-xs text-[#444650] leading-relaxed max-w-4xl">
            This module synchronizes student society participation hours with the official Punjab University Co-Curricular Transcript system. Executive members and event volunteers are awarded authenticated co-curricular credits upon completion of their annual directorate tenures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-serif font-bold text-base text-[#00113a]">Curricular Credits Assigned</h4>
            <div className="font-serif font-bold text-3xl text-[#00113a]">420 Credit Hours</div>
            <p className="text-xs text-slate-500">Verified by Controller of Examinations</p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-serif font-bold text-base text-[#00113a]">Inter-Faculty MoUs</h4>
            <div className="font-serif font-bold text-3xl text-[#705d00]">7 Institutes</div>
            <p className="text-xs text-slate-500">Physics, Chemistry, CEES, Metallurgy, CS</p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-serif font-bold text-base text-[#00113a]">Dean's Honor Awards</h4>
            <div className="font-serif font-bold text-3xl text-emerald-700">12 Medals</div>
            <p className="text-xs text-slate-500">Awarded for Outstanding Scientific Outreach</p>
          </div>
        </div>
      </div>
    </div>
  );
}
