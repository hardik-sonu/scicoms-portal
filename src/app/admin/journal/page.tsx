'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { JOURNAL_DATA, JournalArticle } from '@/lib/data';
import { BookOpen, Plus, CheckCircle, FileText, Download, ShieldCheck } from 'lucide-react';

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<JournalArticle[]>(JOURNAL_DATA);

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Journal Management & Peer Review Pipeline"
        subtitle="Manuscript intake, double-blind reviewer assignments, and DOI cataloging"
      />

      <div className="px-6 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-mono">
            Cataloged manuscripts: <strong className="text-[#00113a]">{articles.length}</strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-xs font-bold">
              ISSN: 2958-4421 (Active)
            </span>
          </div>
        </div>

        {/* Papers Table */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[10px] uppercase">
                <th className="p-4">Article Title & Authors</th>
                <th className="p-4">Domain</th>
                <th className="p-4">Volume / Issue</th>
                <th className="p-4">DOI Code</th>
                <th className="p-4">Downloads</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80">
                  <td className="p-4 max-w-sm">
                    <div className="font-bold text-[#00113a] truncate">{art.title}</div>
                    <div className="text-[11px] text-slate-500 truncate">{art.authors.map(a => a.name).join(', ')}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#eff4ff] text-[#002366] px-2 py-0.5 rounded-xs font-bold text-[10px] uppercase">
                      {art.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">
                    {art.volume} • {art.issue}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">
                    {art.doi}
                  </td>
                  <td className="p-4 font-mono font-bold text-[#00113a]">
                    {art.downloadsCount}
                  </td>
                  <td className="p-4 text-right">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-xs font-bold text-[10px] uppercase">
                      Published
                    </span>
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
