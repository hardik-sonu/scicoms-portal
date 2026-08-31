import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Home, Search, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-[#eff4ff] text-[#002366] flex items-center justify-center mx-auto shadow-xs border border-[#002366]/20">
        <AlertCircle className="w-10 h-10 text-[#ba1a1a]" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#705d00]">
          HTTP Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Institutional Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#444650] max-w-md mx-auto leading-relaxed">
          The academic manuscript, symposium session, or directory record you are looking for has been relocated or archived.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="bg-[#002366] text-white hover:bg-[#00113a] text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-xs shadow-xs transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/search"
          className="bg-white border border-slate-300 text-[#00113a] hover:bg-slate-50 text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-xs transition-all flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Search Repository</span>
        </Link>
      </div>
    </div>
  );
}
