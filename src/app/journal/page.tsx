'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { JOURNAL_DATA } from '@/lib/data';
import { BookOpen, Search, FileText, Send, Download, ShieldCheck } from 'lucide-react';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Metallurgy', 'Materials Science', 'Biotechnology', 'AI in Science', 'Chemical Physics'];

  const filteredArticles = JOURNAL_DATA.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          ISSN Peer-Reviewed Repository
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          SciComS Research Journal
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Open-access, peer-reviewed scientific investigations authored by university scholars and faculty across metallurgy, nanotechnology, AI in materials, and biotechnology.
        </p>
      </div>

      {/* Journal Information & Author Submission Banner */}
      <div className="bg-[#eff4ff] border border-[#002366]/15 rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#002366] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs font-mono uppercase">
              Call for Papers
            </span>
            <span className="text-xs font-bold text-[#705d00]">Volume 8, Issue 3 (Fall 2026)</span>
          </div>
          <h3 className="font-serif font-bold text-lg text-[#00113a]">
            Submit Your Original Research Manuscript
          </h3>
          <p className="text-xs text-[#444650] max-w-2xl">
            Submissions are reviewed by our double-blind peer review board. Accepted papers are cataloged, assigned DOIs, and published with open-access indexing.
          </p>
        </div>

        <Link
          href="/feedback"
          className="shrink-0 bg-[#002366] text-white hover:bg-[#00113a] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs shadow-xs transition-all flex items-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Manuscript</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search paper title, author, keyword, DOI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <span className="font-bold text-[#00113a]">{filteredArticles.length}</span> published papers
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#002366] text-white'
                  : 'bg-[#eff4ff] text-[#444650] hover:bg-[#e5eeff] hover:text-[#00113a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-sm space-y-2">
          <p className="text-sm text-slate-500">No scientific papers found matching your query.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs text-[#002366] font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
