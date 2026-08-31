import React from 'react';
import { Award, Calendar, ShieldCheck } from 'lucide-react';
import { AchievementItem } from '@/lib/data';

export default function AchievementCard({ achievement }: { achievement: AchievementItem }) {
  return (
    <div className="bg-white border border-[#00113a]/10 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
        <img
          src={achievement.image}
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#00113a] text-[#ffd700] text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wide flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          <span>{achievement.category}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#00113a] text-xs font-bold px-2 py-0.5 rounded-xs font-mono">
          {achievement.year}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#705d00] uppercase tracking-wide">
            {achievement.awarder}
          </span>
          <h3 className="font-serif font-bold text-base text-[#00113a] leading-snug">
            {achievement.title}
          </h3>
          <p className="text-xs text-[#444650] leading-relaxed">
            {achievement.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="bg-[#fcd400]/20 text-[#6e5c00] font-bold text-[11px] px-2.5 py-1 rounded-xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {achievement.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
