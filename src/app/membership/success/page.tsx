'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Download, ArrowRight, Calendar, MessageSquare } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'APP-2026-9482';
  const name = searchParams.get('name') || 'Student Scholar';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8">
      {/* Badge Icon */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#705d00]">
          Application Acknowledgment
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#00113a]">
          Application Successfully Lodged!
        </h1>
        <p className="text-xs sm:text-sm text-[#444650] max-w-md mx-auto leading-relaxed">
          Welcome, <span className="font-bold text-[#00113a]">{name}</span>. Your membership dossier has been submitted to the Executive Review Board.
        </p>
      </div>

      {/* Reference Card */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-mono text-slate-500">OFFICIAL REGISTRATION TRACKING</span>
          <span className="bg-[#fcd400]/30 text-[#6e5c00] text-[10px] font-bold px-2 py-0.5 rounded-xs font-mono uppercase">
            Under Review
          </span>
        </div>

        <div className="text-center py-3 bg-[#f8f9ff] rounded-xs font-mono text-xl font-bold text-[#002366] tracking-wider border border-[#002366]/10">
          {refCode}
        </div>

        <div className="space-y-2 text-xs text-[#444650]">
          <p><strong>Next Steps:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Review board will inspect academic transcripts and department preferences within 72 hours.</li>
            <li>Shortlisted candidates will receive an interview slot notification on university email.</li>
            <li>Orientation session details will be published on the portal noticeboard.</li>
          </ul>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => window.print()}
            className="text-xs text-[#002366] font-bold hover:underline flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Official Application Slip</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#002366] text-white hover:bg-[#00113a] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
        >
          Return to Homepage
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 bg-white border border-slate-300 text-[#00113a] hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
        >
          Explore Upcoming Events
        </Link>
      </div>
    </div>
  );
}

export default function MembershipSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Loading application receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
