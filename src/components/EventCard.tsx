import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, Users } from 'lucide-react';
import { EventItem } from '@/lib/data';

export default function EventCard({ event }: { event: EventItem }) {
  const isUpcoming = event.status === 'Upcoming';

  return (
    <div className="bg-white border border-[#00113a]/10 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      {/* Cover Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#00113a] text-white text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wide">
            {event.category}
          </span>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wide ${
            isUpcoming ? 'bg-[#fcd400] text-[#221b00]' : 'bg-slate-200 text-slate-700'
          }`}>
            {event.status}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-xs font-mono">
          {event.venueType}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-[#705d00] font-semibold">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
          </div>

          <h3 className="font-serif font-bold text-base text-[#00113a] group-hover:text-[#002366] transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-[#444650] line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#444650]">
            <span className="flex items-center gap-1 truncate max-w-[200px]" title={event.location}>
              <MapPin className="w-3.5 h-3.5 text-[#002366] shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
              <Users className="w-3 h-3" />
              {event.registeredCount}/{event.capacity}
            </span>
          </div>

          <Link
            href={`/events/${event.id}`}
            className="w-full bg-[#eff4ff] hover:bg-[#002366] text-[#002366] hover:text-white text-xs font-bold py-2 rounded-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Details & Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
