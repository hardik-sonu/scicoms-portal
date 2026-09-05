import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 10-11.563 9.876v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.889h-2.33v6.987A10 10 0 0022 12z"/>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#00113a] text-white border-t border-[#002366] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm overflow-hidden relative shrink-0 bg-white p-1">
                <Image
                  src="/images/branding/scicoms-logo.png"
                  alt="SciComS Logo"
                  fill
                  className="object-contain"
                />
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
                <span>Institute of Metallurgy and Materials Engineering, University of the Punjab, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ffd700] shrink-0" />
                <a href="mailto:scicoms.imme.pu.2.0@gmail.com" className="hover:text-white transition-colors">scicoms.imme.pu.2.0@gmail.com</a>
                <span>| director.imme@pu.edu.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ffd700] shrink-0" />
                <a href="tel:+923237201986" className="hover:text-white transition-colors">+92 323 7201986</a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-[#ffd700] shrink-0" />
                <a href="https://www.instagram.com/scicomsimme" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="w-4 h-4 text-[#ffd700] shrink-0" />
                <a href="https://www.facebook.com/scicomsimme" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-4 h-4 text-[#ffd700] shrink-0" />
                <a href="https://www.linkedin.com/in/scicoms-imme-pu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
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