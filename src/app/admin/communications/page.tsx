'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { MessageSquare, Send, Mail, CheckCircle } from 'lucide-react';

export default function AdminCommunicationsPage() {
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setSubject('');
      setBody('');
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Communications & Moderation"
        subtitle="Broadcast announcements to registered members, review contact inquiries, and moderate forum threads"
      />

      <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broadcast Sender */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#00113a] border-b border-slate-100 pb-2">
            Send Official Notice to All Members (1,540 Recipients)
          </h3>

          {!broadcastSent ? (
            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#00113a] mb-1">Subject Header *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Urgent Notice: SCMS-2026 Paper Submission Deadline Extended"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Message Body *</label>
                <textarea
                  required
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter notice text to be dispatched via institutional email broadcast..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#002366] text-white font-bold uppercase tracking-wider rounded-xs hover:bg-[#00113a] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Broadcast Notice</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-[#00113a]">Broadcast Dispatched!</h4>
              <p className="text-xs text-slate-500">Notice queued for delivery to all 1,540 registered society emails.</p>
            </div>
          )}
        </div>

        {/* Moderation Controls */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#00113a] border-b border-slate-100 pb-2">
            Inquiries Inbox & Forum Moderation
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-[#f8f9ff] border border-slate-200 rounded-xs space-y-1.5">
              <div className="flex justify-between font-bold text-[#00113a]">
                <span>Dr. Noman (NUST Metallurgical Dept)</span>
                <span className="text-slate-400 font-mono text-[10px]">Today</span>
              </div>
              <p className="text-slate-600">Inquiry regarding student poster track entries in SCMS-2026 symposium.</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-xs font-bold">Unanswered</span>
            </div>

            <div className="p-3.5 bg-[#f8f9ff] border border-slate-200 rounded-xs space-y-1.5">
              <div className="flex justify-between font-bold text-[#00113a]">
                <span>Maryam Aslam (Govt College Univ)</span>
                <span className="text-slate-400 font-mono text-[10px]">Yesterday</span>
              </div>
              <p className="text-slate-600">Requesting LaTeX thesis citation template for SciComS Journal Volume 8.</p>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-xs font-bold">Resolved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
