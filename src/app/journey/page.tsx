import React from 'react';
import { MILESTONES_DATA } from '@/lib/data';
import { Flag, Award, BookOpen, Handshake, Network, Rocket, Calendar } from 'lucide-react';

export default function JourneyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Historical Milestones
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Our Journey So Far
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          From a pioneering initiative at IMME to a national nexus for scientific communication, explore the defining breakthroughs that shaped SciComS.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#002366]/20 ml-4 sm:ml-32 space-y-12 pb-8">
        {MILESTONES_DATA.map((milestone, idx) => (
          <div key={idx} className="relative pl-8 sm:pl-10 group">
            {/* Timeline Bullet */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#002366] border-4 border-white shadow-xs group-hover:scale-125 group-hover:bg-[#ffd700] transition-all"></div>

            {/* Year Tag on Left (Desktop) */}
            <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right">
              <span className="font-serif font-bold text-xl text-[#00113a]">{milestone.year}</span>
              {milestone.month && <span className="block text-[11px] text-[#705d00] font-mono">{milestone.month}</span>}
            </div>

            {/* Content Card */}
            <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs hover:shadow-md transition-all space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="sm:hidden font-serif font-bold text-lg text-[#00113a]">
                  {milestone.year} {milestone.month && `(${milestone.month})`}
                </span>
                <span className="bg-[#eff4ff] text-[#002366] text-[10px] font-bold px-2.5 py-0.5 rounded-xs uppercase tracking-wide">
                  {milestone.category}
                </span>
                {milestone.statsBadge && (
                  <span className="bg-[#fcd400]/30 text-[#6e5c00] text-[10px] font-bold px-2 py-0.5 rounded-xs font-mono">
                    {milestone.statsBadge}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-[#00113a]">{milestone.title}</h3>
              <p className="text-xs text-[#444650] leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
