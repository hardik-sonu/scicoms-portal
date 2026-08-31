'use client';

import React, { useState } from 'react';
import { FEEDBACK_POSTS_DATA, FeedbackPost } from '@/lib/data';
import { MessageSquare, ThumbsUp, Send, Filter, CheckCircle2 } from 'lucide-react';

export default function FeedbackPage() {
  const [posts, setPosts] = useState<FeedbackPost[]>(FEEDBACK_POSTS_DATA);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<FeedbackPost['category']>('Suggestion');
  const [authorName, setAuthorName] = useState('');

  const handleUpvote = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: FeedbackPost = {
      id: `fb-${Date.now()}`,
      authorName: authorName.trim() || 'Anonymous Scholar',
      authorRole: 'Student / Researcher',
      date: 'Just now',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      upvotes: 1,
      commentsCount: 0,
      status: 'Under Discussion'
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setAuthorName('');
  };

  const categories = ['All', 'Suggestion', 'Event Feedback', 'Research Idea', 'Website', 'General'];

  const filteredPosts = posts.filter(p => selectedCat === 'All' || p.category === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Community Dialogue
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Comments & Feedback Board
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Open student discussion forum. Propose symposium workshop tracks, suggest research topics, and vote on community initiatives reviewed directly by the SciComS Executive Council.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                  selectedCat === c
                    ? 'bg-[#002366] text-white'
                    : 'bg-white border border-slate-200 text-[#444650] hover:bg-[#eff4ff]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#eff4ff] text-[#002366] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wide text-[10px]">
                      {post.category}
                    </span>
                    <span className="font-bold text-[#00113a]">{post.authorName}</span>
                    <span className="text-slate-400">• {post.authorRole}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-xs ${
                    post.status === 'Implemented' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {post.status}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#00113a]">{post.title}</h3>
                <p className="text-xs text-[#444650] leading-relaxed">{post.content}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{post.date}</span>

                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 bg-[#eff4ff] hover:bg-[#002366] text-[#002366] hover:text-white px-3 py-1 rounded-xs font-bold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Upvote ({post.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post Creation Form */}
        <div>
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs space-y-4 sticky top-24">
            <h3 className="font-serif font-bold text-lg text-[#00113a] border-b border-slate-100 pb-2">
              Start a Proposal
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#00113a] mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Ali Haider (IMME)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as FeedbackPost['category'])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                >
                  <option value="Suggestion">Suggestion</option>
                  <option value="Event Feedback">Event Feedback</option>
                  <option value="Research Idea">Research Idea</option>
                  <option value="Website">Website</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Brief summary of your idea"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#00113a] mb-1">Elaboration *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain your proposition or feedback in detail..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#002366] text-white hover:bg-[#00113a] font-bold uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Forum</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
