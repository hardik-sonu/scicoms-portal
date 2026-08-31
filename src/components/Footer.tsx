import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Globe, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#00113a] text-white border-t border-[#002366] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#ffd700] text-[#00113a] flex items-center justify-center font-bold text-xl">
                SC
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">SciComS</h3>
                <p className="text-xs text-slate-300">Scientific Communication Society</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              The Scientific Communication Society (SciComS) at the Institute of Metallurgy and Materials Engineering (IMME), University of the Punjab, is dedicated to empowering student researchers, publishing peer-reviewed breakthroughs, and orchestrating national scientific dialogue.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ffd700] shrink-0" />
                <span>IMME Complex, Quaid-e-Azam Campus, University of the Punjab, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ffd700] shrink-0" />
                <span>scicoms@pu.edu.pk | editorial.scicoms@pu.edu.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ffd700] shrink-0" />
                <span>+92 (42) 9923 1261 (Ext: 104)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ffd700] border-b border-[#002366] pb-2">
              Society
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/about" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> About & Mission</Link></li>
              <li><Link href="/leadership" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Leadership Cabinet</Link></li>
              <li><Link href="/team" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Teams & Directorates</Link></li>
              <li><Link href="/journey" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Historical Timeline</Link></li>
              <li><Link href="/achievements" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Honors & Awards</Link></li>
              <li><Link href="/affiliations" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Partners & IEEE</Link></li>
            </ul>
          </div>

          {/* Col 3: Research & Events */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ffd700] border-b border-[#002366] pb-2">
              Academic Wings
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/journal" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> SciComS Journal</Link></li>
              <li><Link href="/events" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> National Symposia</Link></li>
              <li><Link href="/gallery" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Photo & Video Archive</Link></li>
              <li><Link href="/feedback" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Discussion Board</Link></li>
              <li><Link href="/membership/apply" className="hover:text-white flex items-center gap-1"><ChevronRight className="w-3 h-3 text-slate-500" /> Student Membership</Link></li>
              <li><Link href="/admin" className="hover:text-white flex items-center gap-1 text-amber-300"><ChevronRight className="w-3 h-3 text-amber-500" /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Institutional Endorsement */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ffd700] border-b border-[#002366] pb-2">
              Official Endorsement
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chartered by the Faculty of Engineering & Technology, University of the Punjab. Registered under PHEC Academic Society Protocols.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-[#002366] text-white text-[11px] px-3 py-1.5 rounded-xs border border-white/10 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffd700]" />
                ISO 9001:2015 Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#002366] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Scientific Communication Society (SciComS), University of the Punjab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Governance</Link>
            <a href="http://pu.edu.pk" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
              <span>PU Official Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
