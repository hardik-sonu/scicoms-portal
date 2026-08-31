import React from 'react';
import { PARTNERS_DATA } from '@/lib/data';
import { Handshake, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AffiliationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Collaborative Ecosystem
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Affiliations & Partners
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          SciComS actively partners with premier academic faculties, international engineering societies, research councils, and metallurgy industrial giants.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PARTNERS_DATA.map((partner) => (
          <div key={partner.id} className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-16 rounded-xs object-cover border border-slate-200"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#705d00] uppercase">
                    {partner.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#00113a] leading-snug">
                    {partner.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#444650] leading-relaxed">
                {partner.description}
              </p>

              <div className="p-3 bg-[#f8f9ff] rounded-xs border border-slate-100 text-xs">
                <span className="font-bold text-[#00113a] block mb-1">Collaboration Scope:</span>
                <span className="text-slate-600">{partner.collabScope}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="text-[#002366] font-bold hover:underline flex items-center gap-1"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
