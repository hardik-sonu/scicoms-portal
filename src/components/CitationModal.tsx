'use client';

import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { JournalArticle } from '@/lib/data';

export default function CitationModal({
  article,
  isOpen,
  onClose
}: {
  article: JournalArticle;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const authorsList = article.authors.map(a => a.name).join(', ');
  
  const apaCitation = `${authorsList} (${article.year}). ${article.title}. SciComS Research Journal, ${article.volume}(${article.issue}). https://doi.org/${article.doi}`;
  
  const ieeeCitation = `${authorsList}, "${article.title}," SciComS Res. J., ${article.volume}, no. ${article.issue}, ${article.year}, doi: ${article.doi}.`;
  
  const bibtexCitation = `@article{scicoms_${article.id}_${article.year},
  author = {${article.authors.map(a => a.name).join(' and ')}},
  title = {${article.title}},
  journal = {SciComS Research Journal},
  volume = {${article.volume.replace('Vol ', '')}},
  number = {${article.issue.replace('Issue ', '')}},
  year = {${article.year}},
  doi = {${article.doi}}
}`;

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-sm border border-[#00113a]/10 max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Export Citation</h3>
            <p className="text-xs text-slate-500">Copy citation in standard scientific formats</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-xs">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* APA */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#00113a]">
            <span>APA (7th Edition)</span>
            <button
              onClick={() => copyToClipboard(apaCitation, 'APA')}
              className="text-[#002366] hover:underline flex items-center gap-1 font-sans"
            >
              {copiedFormat === 'APA' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedFormat === 'APA' ? 'Copied!' : 'Copy APA'}
            </button>
          </div>
          <div className="bg-slate-50 p-3 rounded-xs text-xs font-mono text-slate-700 border border-slate-200 select-all">
            {apaCitation}
          </div>
        </div>

        {/* IEEE */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#00113a]">
            <span>IEEE Format</span>
            <button
              onClick={() => copyToClipboard(ieeeCitation, 'IEEE')}
              className="text-[#002366] hover:underline flex items-center gap-1 font-sans"
            >
              {copiedFormat === 'IEEE' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedFormat === 'IEEE' ? 'Copied!' : 'Copy IEEE'}
            </button>
          </div>
          <div className="bg-slate-50 p-3 rounded-xs text-xs font-mono text-slate-700 border border-slate-200 select-all">
            {ieeeCitation}
          </div>
        </div>

        {/* BibTeX */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#00113a]">
            <span>BibTeX</span>
            <button
              onClick={() => copyToClipboard(bibtexCitation, 'BibTeX')}
              className="text-[#002366] hover:underline flex items-center gap-1 font-sans"
            >
              {copiedFormat === 'BibTeX' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedFormat === 'BibTeX' ? 'Copied!' : 'Copy BibTeX'}
            </button>
          </div>
          <pre className="bg-slate-50 p-3 rounded-xs text-[11px] font-mono text-slate-700 border border-slate-200 overflow-x-auto select-all">
            {bibtexCitation}
          </pre>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00113a] text-white text-xs font-bold rounded-xs hover:bg-[#002366]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
