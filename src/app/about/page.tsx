import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Institutional Heritage & Mission
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          About SciComS
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          The Scientific Communication Society (SciComS) is the premier student-led technical society chartered at the Institute of Metallurgy and Materials Engineering (IMME), Faculty of Engineering and Technology, University of the Punjab, Lahore.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xs bg-[#eff4ff] text-[#002366] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#00113a]">Our Vision</h2>
          <p className="text-xs text-[#444650] leading-relaxed">
            To establish the University of the Punjab as a globally recognized benchmark for student-driven scientific literacy, high-impact metallurgical and materials research, and transparent science communication across South Asia and beyond.
          </p>
        </div>

        <div className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xs bg-[#eff4ff] text-[#002366] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#00113a]">Our Mission</h2>
          <p className="text-xs text-[#444650] leading-relaxed">
            To cultivate world-class scientific writing, peer-review discipline, conference management capabilities, and ethical scientific journalism among student scholars by bridging academia with cutting-edge industrial innovation.
          </p>
        </div>
      </div>

      {/* Affiliation with IMME and University of the Punjab */}
      <div className="bg-[#eff4ff] border border-[#002366]/15 rounded-sm p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-[#002366]" />
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#00113a]">
              Institute of Metallurgy & Materials Engineering (IMME)
            </h3>
            <p className="text-xs text-[#705d00] font-semibold">Faculty of Engineering & Technology, University of the Punjab</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
          Founded as one of the oldest engineering bodies in Pakistan, IMME has produced thousands of metallurgy pioneers. SciComS serves as the official scientific outreach arm of the institute, providing direct access to state-of-the-art XRD, SEM, universal testing machines, and computer simulation labs for student researchers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#002366]/10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00113a]">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PHEC & PEC Endorsed</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00113a]">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Institutional Research Grants</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00113a]">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>International IEEE Chapter Liaison</span>
          </div>
        </div>
      </div>

      {/* Six Technical Wings */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif font-bold text-3xl text-[#00113a]">The Six Operational Wings</h2>
          <p className="text-xs text-[#444650]">
            SciComS functions through six specialized directorates ensuring seamless academic operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 01</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Editorial & Publications</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Manages manuscript submissions, peer reviewer allocations, typesetting in LaTeX, and quarterly journal editions.
            </p>
          </div>

          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 02</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Event Management & Logistics</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Coordinates physical/hybrid symposia, workshop venues, speaker hospitality, attendee ticketing, and stage operations.
            </p>
          </div>

          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 03</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Research & Innovation</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Facilitates student research teams, lab access permissions, grant applications, and inter-departmental projects.
            </p>
          </div>

          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 04</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Media & Public Relations</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Leads external press relations, social media broadcasts, faculty interviews, and scientific podcast series.
            </p>
          </div>

          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 05</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Creative & Design</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Designs conference proceedings booklets, scientific posters, UI/UX design systems, and digital assets.
            </p>
          </div>

          <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">Wing 06</span>
            <h3 className="font-serif font-bold text-lg text-[#00113a]">Technology & Web</h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Maintains the institutional digital portal, automated certificate issuing systems, and WebGL visualizations.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 bg-[#002366] text-white px-8 py-3.5 rounded-xs font-bold text-xs uppercase tracking-wider hover:bg-[#00113a] transition-all"
        >
          <span>Meet Our Directorate Members</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
