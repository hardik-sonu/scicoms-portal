import React from 'react';
import { TESTIMONIALS_DATA } from '@/lib/data';
import { Quote, Star, GraduationCap } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Alumni Success Stories
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Member Testimonials
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Hear how mentorship, scientific publications, and leadership opportunities at SciComS empowered our alumni to secure global scholarships and engineering careers.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_DATA.map((t) => (
          <div key={t.id} className="bg-white border border-[#00113a]/10 rounded-sm p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-[#ffd700]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#444650] leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#002366]" />
              <div>
                <h4 className="font-bold text-xs text-[#00113a]">{t.name}</h4>
                <p className="text-[11px] text-[#705d00] font-medium">{t.role}</p>
                <p className="text-[10px] text-slate-500">{t.currentOrganization}</p>
                <span className="inline-block text-[10px] font-mono text-slate-400 mt-0.5">{t.batch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
