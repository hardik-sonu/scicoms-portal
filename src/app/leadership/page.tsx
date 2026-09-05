import React from 'react';
import { LEADERSHIP_DATA } from '@/lib/data';
import { Mail, Link2, GraduationCap, Award, ShieldCheck } from 'lucide-react';

export default function LeadershipPage() {
  const patrons = LEADERSHIP_DATA.filter(m => m.category === 'patron' || m.category === 'advisor');
  const executives = LEADERSHIP_DATA.filter(m => m.category === 'executive');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Executive Governance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Leadership & Advisors
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          SciComS is governed through an esteemed panel of senior university administrators, faculty mentors, and student executive officers who uphold the highest academic and ethical standards.
        </p>
      </div>

      {/* Section 1: Patrons & Faculty Advisors */}
      <div className="space-y-8">
        <div className="border-b border-[#00113a]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#00113a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#705d00]" />
            <span>Patrons & Faculty Advisors</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {patrons.map((member) => (
            <div key={member.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#eff4ff]"
                />
                <div className="text-center">
                  <h3 className="font-serif font-bold text-lg text-[#00113a]">{member.name}</h3>
                  <p className="text-xs font-bold text-[#705d00] uppercase mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{member.department}</p>
                  <p className="text-[11px] font-semibold text-slate-600">{member.institution}</p>
                </div>
                <p className="text-xs text-[#444650] leading-relaxed">
                  {member.bio}
                </p>

                {member.researchFocus && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-[#002366] uppercase block mb-1">Focus Areas:</span>
                    <div className="flex flex-wrap gap-1">
                      {member.researchFocus.map((f, i) => (
                        <span key={i} className="bg-[#eff4ff] text-[#002366] text-[10px] px-2 py-0.5 rounded-xs font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#002366]">
                <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Student Executive Cabinet */}
      <div className="space-y-8">
        <div className="border-b border-[#00113a]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#00113a] flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#002366]" />
            <span>Executive Cabinet (2026 - 2027)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {executives.map((member) => (
            <div key={member.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#eff4ff]"
                />
                <div className="text-center">
                  <h3 className="font-serif font-bold text-lg text-[#00113a]">{member.name}</h3>
                  <p className="text-xs font-bold text-[#002366] uppercase mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{member.department}</p>
                </div>
                <p className="text-xs text-[#444650] leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:text-[#002366]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.email}</span>
                </a>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#002366]">
                    <Link2 className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
