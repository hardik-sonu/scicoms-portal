'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Award, 
  Image as ImageIcon, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'About', 
      href: '/about',
      hasDropdown: true,
      subLinks: [
        { name: 'About SciComS', href: '/about' },
        { name: 'Leadership & Advisors', href: '/leadership' },
        { name: 'Teams & Departments', href: '/team' },
        { name: 'Our Journey', href: '/journey' },
        { name: 'Achievements & Honors', href: '/achievements' },
        { name: 'Affiliations & Partners', href: '/affiliations' },
        { name: 'Member Testimonials', href: '/testimonials' }
      ]
    },
    { name: 'Events', href: '/events' },
    { name: 'Journal', href: '/journal' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#00113a]/10 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#00113a] text-white text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-[#ffd700] text-[#00113a] font-bold text-[10px] px-2 py-0.5 rounded-xs uppercase">Official</span>
          <span className="hidden sm:inline">Institute of Metallurgy & Materials Engineering (IMME) — University of the Punjab</span>
          <span className="sm:hidden">IMME | University of the Punjab</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <Link href="/admin" className="hover:text-[#ffd700] flex items-center gap-1 transition-colors">
            <Shield className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
          <span className="opacity-40">|</span>
          <Link href="/search" className="hover:text-[#ffd700] flex items-center gap-1 transition-colors">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm overflow-hidden relative shrink-0 shadow-md border border-[#ffd700]/30 group-hover:scale-105 transition-transform">
            <Image
              src="/images/branding/scicoms-logo.png"
              alt="SciComS Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-lg text-[#00113a] tracking-tight leading-none font-serif flex items-center gap-1">
              SciComS
              <span className="text-[10px] font-sans bg-[#e5eeff] text-[#002366] px-1.5 py-0.5 rounded-xs font-semibold uppercase">PU</span>
            </div>
            <p className="text-[11px] text-[#444650] font-medium tracking-normal mt-0.5 hidden sm:block">
              Scientific Communication Society
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <button
                    className={`px-3 py-2 rounded-xs text-sm font-semibold flex items-center gap-1 transition-colors ${
                      isActive('/about') || isActive('/leadership') || isActive('/team') || isActive('/journey') || isActive('/achievements') || isActive('/affiliations') || isActive('/testimonials')
                        ? 'text-[#00113a] bg-[#e5eeff]'
                        : 'text-[#444650] hover:text-[#00113a] hover:bg-[#eff4ff]'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-3.5 h-3.5 text-[#757682] group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-[#00113a]/10 rounded-sm shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.subLinks?.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setAboutDropdownOpen(false)}
                          className={`block px-4 py-2 text-xs font-medium transition-colors ${
                            pathname === sub.href
                              ? 'bg-[#eff4ff] text-[#00113a] font-bold border-l-2 border-[#002366]'
                              : 'text-[#444650] hover:bg-[#f8f9ff] hover:text-[#00113a]'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-xs text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'text-[#00113a] bg-[#e5eeff] font-bold'
                    : 'text-[#444650] hover:text-[#00113a] hover:bg-[#eff4ff]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 text-[#444650] hover:text-[#00113a] hover:bg-[#eff4ff] rounded-xs transition-colors"
            title="Search Portal"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/membership/apply"
            className="bg-[#002366] text-white hover:bg-[#00113a] text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-95 border border-[#00113a]"
          >
            <span>Join SciComS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/membership/apply"
            className="bg-[#002366] text-white text-xs font-bold px-3 py-1.5 rounded-xs sm:hidden"
          >
            Join
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xs text-[#00113a] hover:bg-[#eff4ff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#00113a]/10 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="py-2 border-b border-slate-100">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#444650] bg-[#f8f9ff] rounded-xs font-medium"
            >
              <Search className="w-4 h-4 text-[#002366]" />
              <span>Search SciComS directory & archives</span>
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Home
            </Link>
            
            <div className="px-3 py-1 text-xs font-bold text-[#757682] uppercase tracking-wider">About SciComS</div>
            <div className="pl-3 space-y-1 border-l-2 border-[#eff4ff] ml-3">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Overview & Mission</Link>
              <Link href="/leadership" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Leadership & Advisors</Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Teams & Members</Link>
              <Link href="/journey" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Our Journey Timeline</Link>
              <Link href="/achievements" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Achievements</Link>
              <Link href="/affiliations" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Affiliations & Partners</Link>
              <Link href="/testimonials" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1.5 text-xs text-[#444650] hover:text-[#00113a]">Member Testimonials</Link>
            </div>

            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Events & Symposia
            </Link>
            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Research Journal
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Photo Gallery
            </Link>
            <Link
              href="/feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Discussions & Feedback
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#00113a] hover:bg-[#eff4ff] rounded-xs"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xs"
            >
              Admin Management Portal
            </Link>
          </div>

          <div className="pt-3">
            <Link
              href="/membership/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#002366] text-white text-center py-2.5 px-4 rounded-xs font-bold text-sm block"
            >
              Apply for SciComS Membership
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}