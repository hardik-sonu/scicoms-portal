import React from 'react';
import Link from 'next/link';
import SciComsShader from '@/components/SciComsShader';
import EventCard from '@/components/EventCard';
import ArticleCard from '@/components/ArticleCard';
import { 
  EVENTS_DATA, 
  JOURNAL_DATA, 
  LEADERSHIP_DATA, 
  TESTIMONIALS_DATA, 
  GALLERY_DATA, 
  MILESTONES_DATA,
  ACHIEVEMENTS_DATA 
} from '@/lib/data';
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  Layers, 
  Microscope, 
  Quote, 
  Sparkles, 
  Users 
} from 'lucide-react';

export default function HomePage() {
  const featuredEvents = EVENTS_DATA.filter(e => e.featured || e.status === 'Upcoming').slice(0, 2);
  const featuredArticles = JOURNAL_DATA.slice(0, 2);
  const executiveMembers = LEADERSHIP_DATA.slice(0, 3);
  const galleryTeaser = GALLERY_DATA.slice(0, 4);

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#f8f9ff] border-b border-[#00113a]/10">
        {/* WebGL Particle/Molecular Shader Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <SciComsShader className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#002366]/15 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00113a] font-mono">
              University of the Punjab • IMME Official Society
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#00113a] tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Advancing <span className="italic font-normal text-[#002366] underline decoration-[#ffd700] decoration-4 underline-offset-8">Scientific Dialogue</span> & Engineering Innovation
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#444650] leading-relaxed font-normal">
            The Scientific Communication Society (SciComS) unites aspiring metallurgists, material scientists, and interdisciplinary researchers to publish high-impact findings and inspire national STEM excellence.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/membership/apply"
              className="bg-[#002366] text-white hover:bg-[#00113a] text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Apply for Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/journal"
              className="bg-white/90 hover:bg-white text-[#00113a] border border-[#00113a]/20 hover:border-[#00113a] text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-xs shadow-xs transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#002366]" />
              <span>Explore Journal</span>
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xs border border-[#00113a]/10 text-center shadow-xs">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-[#00113a]">1,500+</div>
              <div className="text-[11px] text-[#705d00] uppercase font-bold tracking-wider mt-0.5">Active Scholars</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xs border border-[#00113a]/10 text-center shadow-xs">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-[#00113a]">50+</div>
              <div className="text-[11px] text-[#705d00] uppercase font-bold tracking-wider mt-0.5">Journal Papers</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xs border border-[#00113a]/10 text-center shadow-xs">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-[#00113a]">25+</div>
              <div className="text-[11px] text-[#705d00] uppercase font-bold tracking-wider mt-0.5">Annual Events</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xs border border-[#00113a]/10 text-center shadow-xs">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-[#00113a]">6 Wings</div>
              <div className="text-[11px] text-[#705d00] uppercase font-bold tracking-wider mt-0.5">Directorates</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
            Strategic Foundations
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#00113a]">
            Bridging Rigorous Science with Global Impact
          </h2>
          <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
            Our multi-pronged approach transforms undergraduate and graduate students into articulate science communicators, peer reviewers, and technological innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#eff4ff] text-[#002366] flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#00113a]">Research Publication</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Managing the peer-reviewed SciComS Journal, hosting manuscript workshops, and coaching student authors in LaTeX, Elsevier guidelines, and data visualization.
            </p>
            <Link href="/journal" className="inline-flex items-center gap-1 text-xs font-bold text-[#002366] hover:underline pt-2">
              <span>View Publications</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#eff4ff] text-[#002366] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#00113a]">National Symposia & Expos</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Organizing flagship conventions including the National Materials & Science Conference and inter-collegiate science fairs with delegates from across the nation.
            </p>
            <Link href="/events" className="inline-flex items-center gap-1 text-xs font-bold text-[#002366] hover:underline pt-2">
              <span>Explore Symposia</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#eff4ff] text-[#002366] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#00113a]">STEM Mentorship & Outreach</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Fostering inclusive scientific journalism, podcasts, women in STEM forums, and providing industry internships with leading metallurgical complexes.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1 text-xs font-bold text-[#002366] hover:underline pt-2">
              <span>Discover Our Wings</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED UPCOMING EVENTS */}
      <section className="bg-[#eff4ff]/60 border-y border-[#00113a]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
                Conferences & Workshops
              </span>
              <h2 className="font-serif font-bold text-3xl text-[#00113a]">
                Upcoming Flagship Gatherings
              </h2>
            </div>
            <Link
              href="/events"
              className="text-xs font-bold text-[#002366] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All Events ({EVENTS_DATA.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LATEST PEER-REVIEWED RESEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
              SciComS Research Journal
            </span>
            <h2 className="font-serif font-bold text-3xl text-[#00113a]">
              Recent Peer-Reviewed Papers
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-xs font-bold text-[#002366] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Browse Research Repository</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 5. EXECUTIVE LEADERSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
            Institutional Leadership
          </span>
          <h2 className="font-serif font-bold text-3xl text-[#00113a]">
            Guided by Eminent Academic Pioneers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {executiveMembers.map((member) => (
            <div key={member.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs text-center space-y-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#002366]"
              />
              <div>
                <h4 className="font-serif font-bold text-base text-[#00113a]">{member.name}</h4>
                <p className="text-xs font-semibold text-[#705d00] mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-500 mt-1">{member.institution}</p>
              </div>
              <p className="text-xs text-[#444650] leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#00113a]/20 hover:border-[#00113a] text-[#00113a] text-xs uppercase font-bold tracking-wider rounded-xs transition-colors"
          >
            <span>Meet Full Executive Board & Advisors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. PHOTO GALLERY PREVIEW */}
      <section className="bg-[#00113a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
                Life at SciComS
              </span>
              <h2 className="font-serif font-bold text-3xl text-white mt-1">
                Visual Chronicles & Expos
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#ffd700] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryTeaser.map((item) => (
              <div key={item.id} className="group relative h-52 overflow-hidden rounded-xs bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[10px] text-[#ffd700] uppercase font-mono">{item.category}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
            Alumni & Member Voices
          </span>
          <h2 className="font-serif font-bold text-3xl text-[#00113a]">
            Empowering Future Scientists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs flex flex-col justify-between space-y-4">
              <Quote className="w-8 h-8 text-[#002366]/20" />
              <p className="text-xs text-[#444650] leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-[#00113a]">{t.name}</h4>
                  <p className="text-[11px] text-[#705d00] font-medium">{t.role}</p>
                  <p className="text-[10px] text-slate-500">{t.currentOrganization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION (MEMBERSHIP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#002366] text-white rounded-sm p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="bg-[#ffd700] text-[#00113a] text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider">
              Recruitment Open • Batch 2025-26
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Ready to Shape the Future of Scientific Communication?
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed">
              Join multidisciplinary teams across Editorial, Research, Events, PR, and Tech. Gain hands-on leadership credentials endorsed by the University of the Punjab.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/membership/apply"
              className="bg-[#ffd700] text-[#00113a] hover:bg-yellow-400 text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-xs shadow-md transition-all text-center"
            >
              Start Application
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-white/30 hover:border-white text-white text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-xs transition-all text-center"
            >
              Contact Society Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
