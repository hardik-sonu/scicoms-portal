'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import CitationModal from '@/components/CitationModal';
import { JOURNAL_DATA } from '@/lib/data';
import { 
  BookOpen, 
  Download, 
  Bookmark, 
  Quote, 
  ArrowLeft, 
  Share2, 
  FileText, 
  CheckCircle,
  MessageSquare,
  Send
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Remarkable findings on grain boundary precipitate refinement. The TEM micrographs provide compelling confirmation.'
  ]);
  const [newComment, setNewComment] = useState('');

  const article = JOURNAL_DATA.find((a) => a.id === articleId);
  if (!article) {
    return notFound();
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment.trim()]);
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link */}
      <Link
        href="/journal"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002366] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Research Journal</span>
      </Link>

      {/* Article Header Card */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#eff4ff] text-[#002366] font-bold px-3 py-1 rounded-xs uppercase tracking-wide">
              {article.category}
            </span>
            <span className="font-mono text-slate-500">
              {article.volume} • {article.issue} ({article.year})
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Published: {article.publishedDate}
          </span>
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#00113a] leading-tight">
          {article.title}
        </h1>

        {/* Authors List */}
        <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
          {article.authors.map((author, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-bold text-[#00113a]">{author.name}</span>
              {author.isCorresponding && (
                <span className="ml-1 text-[10px] bg-[#ffd700] text-[#00113a] px-1.5 py-0.2 rounded-xs font-mono font-bold">
                  Corresponding
                </span>
              )}
              <span className="block text-[11px] text-slate-500">{author.affiliation}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCitationModalOpen(true)}
              className="bg-[#eff4ff] hover:bg-[#002366] text-[#002366] hover:text-white text-xs font-bold px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5"
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Cite Paper</span>
            </button>
            <button
              onClick={() => alert('Downloading official PDF manuscript...')}
              className="bg-[#002366] text-white hover:bg-[#00113a] text-xs font-bold px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer" className="text-[#002366] underline">{article.doi}</a>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Full Text Sections */}
        <div className="lg:col-span-3 space-y-8">
          {/* Abstract */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#00113a]">Abstract</h2>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed italic">
              {article.abstract}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#00113a]">Keywords: </span>
              <span className="text-xs text-slate-600 font-mono">
                {article.keywords.join(', ')}
              </span>
            </div>
          </div>

          {/* Section: Introduction */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">1. Introduction</h3>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
              {article.fullTextContent.introduction}
            </p>
          </div>

          {/* Section: Methodology */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">2. Experimental Methodology</h3>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
              {article.fullTextContent.methodology}
            </p>
          </div>

          {/* Section: Results & Discussion */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">3. Results & Microstructural Analysis</h3>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
              {article.fullTextContent.results}
            </p>
            <div className="pt-3">
              <h4 className="font-serif font-bold text-base text-[#00113a]">3.1 Discussion of Passivation Kinetics</h4>
              <p className="text-xs sm:text-sm text-[#444650] leading-relaxed mt-1">
                {article.fullTextContent.discussion}
              </p>
            </div>
          </div>

          {/* Section: Conclusion */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">4. Conclusion</h3>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
              {article.fullTextContent.conclusion}
            </p>
          </div>

          {/* References */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#00113a]">References</h3>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 font-mono">
              {article.fullTextContent.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ref}
                </li>
              ))}
            </ol>
          </div>

          {/* Peer Discussion / Feedback section */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#00113a] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#002366]" />
              <span>Scientific Peer Inquiries & Comments ({comments.length})</span>
            </h3>

            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="p-3.5 bg-[#f8f9ff] rounded-xs border border-slate-100 text-xs text-[#444650]">
                  {c}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="space-y-3 pt-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Post a scholarly inquiry or remark on this manuscript..."
                rows={3}
                className="w-full p-3 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#002366] text-white text-xs font-bold rounded-xs hover:bg-[#00113a] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Inquiry</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div className="space-y-6">
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-5 shadow-xs space-y-4 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#00113a] border-b border-slate-100 pb-2">
              Article Metrics
            </h4>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Downloads:</span>
                <span className="font-mono font-bold text-[#00113a]">{article.downloadsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Citations:</span>
                <span className="font-mono font-bold text-[#705d00]">{article.citationsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Peer Review:</span>
                <span className="text-emerald-700 font-bold">Double-Blind Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">License:</span>
                <span className="font-mono">CC BY 4.0</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eff4ff] border border-[#002366]/15 rounded-sm p-5 space-y-3 text-xs text-[#00113a]">
            <h4 className="font-serif font-bold text-sm">Need Help with Citations?</h4>
            <p className="text-[11px] text-[#444650]">
              Export APA, IEEE, and BibTeX snippets ready for direct insertion into Overleaf or Zotero.
            </p>
            <button
              onClick={() => setCitationModalOpen(true)}
              className="w-full py-2 bg-[#002366] text-white font-bold rounded-xs text-xs hover:bg-[#00113a]"
            >
              Open Citation Tool
            </button>
          </div>
        </div>
      </div>

      {/* Citation Modal */}
      <CitationModal
        article={article}
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
      />
    </div>
  );
}
