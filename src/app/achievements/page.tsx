import React from 'react';
import AchievementCard from '@/components/AchievementCard';
import { ACHIEVEMENTS_DATA } from '@/lib/data';
import { Trophy, Award, Star, ShieldCheck } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Excellence & Honors
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Achievements & Awards
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Recognitions, competitive grants, and national trophies awarded to the Scientific Communication Society and student researchers at the University of the Punjab.
        </p>
      </div>

      {/* Highlight Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm text-center shadow-xs space-y-1">
          <Trophy className="w-8 h-8 text-[#705d00] mx-auto mb-2" />
          <div className="font-serif font-bold text-3xl text-[#00113a]">#1 Ranked</div>
          <p className="text-xs text-slate-500">Student Technical Society in Punjab (PHEC 2025)</p>
        </div>
        <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm text-center shadow-xs space-y-1">
          <Award className="w-8 h-8 text-[#002366] mx-auto mb-2" />
          <div className="font-serif font-bold text-3xl text-[#00113a]">PKR 2.5M</div>
          <p className="text-xs text-slate-500">Competitive NSF Laboratory Grant Awarded</p>
        </div>
        <div className="bg-white border border-[#00113a]/10 p-6 rounded-sm text-center shadow-xs space-y-1">
          <Star className="w-8 h-8 text-[#ffd700] mx-auto mb-2" />
          <div className="font-serif font-bold text-3xl text-[#00113a]">180+</div>
          <p className="text-xs text-slate-500">Cumulative Impact Factor in Published Journals</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ACHIEVEMENTS_DATA.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
