'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import EventRegisterModal from '@/components/EventRegisterModal';
import { EVENTS_DATA } from '@/lib/data';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Ticket, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  ShieldCheck,
  User 
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const event = EVENTS_DATA.find((e) => e.id === eventId);
  if (!event) {
    return notFound();
  }

  const isUpcoming = event.status === 'Upcoming';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back Link */}
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002366] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Events</span>
      </Link>

      {/* Main Event Header Card */}
      <div className="bg-white border border-[#00113a]/10 rounded-sm overflow-hidden shadow-xs">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00113a] via-[#00113a]/40 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#ffd700] text-[#00113a] font-bold text-xs px-3 py-1 rounded-xs uppercase tracking-wider font-mono">
                {event.category}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-xs font-mono">
                {event.venueType}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-xs ${
                isUpcoming ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
              }`}>
                {event.status}
              </span>
            </div>

            <h1 className="font-serif font-bold text-2xl sm:text-4xl max-w-4xl text-white leading-tight">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl italic">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Action / Meta Bar */}
        <div className="p-6 bg-[#f8f9ff] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#00113a] font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#705d00]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#705d00]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#705d00]" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isUpcoming ? (
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="w-full sm:w-auto bg-[#002366] text-white hover:bg-[#00113a] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-[#ffd700]" />
                <span>Register for Event</span>
              </button>
            ) : (
              <div className="bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xs">
                Archived Past Event
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#00113a]">Event Overview</h2>
            <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
              {event.fullDetails}
            </p>
          </div>

          {/* Schedule / Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="font-serif font-bold text-xl text-[#00113a]">Session Schedule & Program</h2>
              <div className="space-y-4">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3.5 bg-[#f8f9ff] rounded-xs border-l-3 border-[#002366]">
                    <div className="w-24 text-xs font-mono font-bold text-[#705d00] shrink-0">
                      {item.time}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-[#00113a]">{item.session}</h4>
                      <p className="text-[11px] text-slate-500">{item.speaker}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keynote Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="font-serif font-bold text-xl text-[#00113a]">Distinguished Speakers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xs bg-[#f8f9ff]">
                    <img src={sp.avatar} alt={sp.name} className="w-12 h-12 rounded-full object-cover border border-[#002366]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#00113a]">{sp.name}</h4>
                      <p className="text-[11px] text-[#705d00]">{sp.designation}</p>
                      <p className="text-[10px] text-slate-500">{sp.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#00113a] border-b border-slate-100 pb-2">
              Registration Info
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Registration Fee:</span>
                <span className="font-bold text-[#705d00]">{event.registrationFee}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Audience:</span>
                <span className="font-medium text-[#0b1c30]">{event.eligibility}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Capacity & Status:</span>
                <span className="font-mono text-[#002366] font-bold">
                  {event.registeredCount} / {event.capacity} Seats Booked
                </span>
              </div>
            </div>

            {isUpcoming && (
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="w-full py-2.5 bg-[#002366] text-white hover:bg-[#00113a] text-xs font-bold uppercase rounded-xs transition-colors shadow-xs"
              >
                Register Now
              </button>
            )}
          </div>

          <div className="bg-[#eff4ff] border border-[#002366]/15 rounded-sm p-6 space-y-3 text-xs text-[#00113a]">
            <h3 className="font-serif font-bold text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#705d00]" />
              <span>Official Verification</span>
            </h3>
            <p className="text-[11px] text-[#444650] leading-relaxed">
              Attending delegates receive verified digital credentials endorsed by the Dean, Faculty of Engineering & Technology, University of the Punjab.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <EventRegisterModal
        event={event}
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}
