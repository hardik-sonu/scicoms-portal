import React from 'react';
import { Mail, Link2, ExternalLink } from 'lucide-react';
import { TeamMember } from '@/lib/data';

export default function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white border border-[#00113a]/10 rounded-sm p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        <div className="flex items-center gap-3.5">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#002366]/20 group-hover:border-[#002366] transition-colors"
          />
          <div>
            <h4 className="font-bold text-sm text-[#00113a] leading-tight group-hover:text-[#002366]">
              {member.name}
            </h4>
            <p className="text-xs text-[#705d00] font-medium mt-0.5">{member.role}</p>
            <span className="inline-block bg-[#eff4ff] text-[#002366] text-[10px] px-2 py-0.5 rounded-xs font-semibold mt-1">
              {member.department}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#444650] leading-relaxed line-clamp-2">
          {member.bio}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1 pt-1">
          {member.skills.map((s, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-xs">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">{member.term}</span>
        <div className="flex items-center gap-2 text-slate-600">
          <a href={`mailto:${member.email}`} className="p-1 hover:text-[#002366] transition-colors" title={member.email}>
            <Mail className="w-3.5 h-3.5" />
          </a>
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1 hover:text-[#002366] transition-colors">
              <Link2 className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
