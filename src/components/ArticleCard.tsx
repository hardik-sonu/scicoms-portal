import React from 'react';
import Link from 'next/link';
import { BookOpen, Download, Bookmark, FileText, ArrowRight } from 'lucide-react';
import { JournalArticle } from '@/lib/data';

export default function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <article className="bg-white border border-[#00113a]/10 rounded-sm p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#eff4ff] text-[#002366] font-bold px-2.5 py-0.5 rounded-xs uppercase tracking-wide text-[10px]">
              {article.category}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              {article.volume} • {article.issue} ({article.year})
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
            DOI: {article.doi}
          </span>
        </div>

        <h3 className="font-serif font-bold text-lg text-[#00113a] group-hover:text-[#002366] transition-colors leading-snug">
          <Link href={`/journal/${article.id}`}>
            {article.title}
          </Link>
        </h3>

        <div className="text-xs text-[#705d00] font-medium">
          {article.authors.map(a => a.name).join(', ')}
        </div>

        <p className="text-xs text-[#444650] line-clamp-3 leading-relaxed">
          {article.abstract}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.keywords.slice(0, 3).map((kw, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-xs font-mono">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span className="flex items-center gap-1 font-mono">
            <Download className="w-3.5 h-3.5 text-[#002366]" /> {article.downloadsCount}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Bookmark className="w-3.5 h-3.5 text-[#705d00]" /> {article.citationsCount} citations
          </span>
        </div>

        <Link
          href={`/journal/${article.id}`}
          className="text-[#002366] font-bold hover:underline flex items-center gap-1"
        >
          <span>Read Full Paper</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
