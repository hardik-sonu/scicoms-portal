'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Bell,
  Inbox,
  Loader2,
  RefreshCw,
  Calendar,
  Megaphone,
  CheckCircle2,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface Announcement {
  id: string;
  subject: string;
  body: string;
  audience: string;
  status: string;
  created_at: string;
}

export default function MemberPortalPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // FETCH ANNOUNCEMENTS
  // ============================================================

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('status', 'published')
      .eq('audience', 'all_members')
      .order('created_at', {
        ascending: false,
      });

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setAnnouncements(data || []);
    setLoading(false);
  }, []);

  // ============================================================
  // LOAD ON PAGE OPEN
  // ============================================================

  useEffect(() => {
    queueMicrotask(fetchAnnouncements);
  }, [fetchAnnouncements]);

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
      }
    );
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f8f9fc]">

      {/* ======================================================
          MEMBER PORTAL HEADER
      ====================================================== */}

      <div className="bg-[#00113a] border-b border-[#002366]">

        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-sm flex items-center justify-center">

                <Inbox className="w-6 h-6 text-white" />

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-blue-200 font-semibold mb-2">
                  SciComS Member Portal
                </p>

                <h1 className="font-serif font-bold text-3xl md:text-4xl text-white">

                  Communications

                </h1>

                <p className="text-sm text-slate-300 mt-2 max-w-xl">

                  Official announcements, notices, and important updates
                  from SciComS.

                </p>

              </div>

            </div>


            {/* Announcement Count */}

            <div className="bg-white/10 border border-white/10 px-5 py-4 rounded-sm">

              <div className="flex items-center gap-3">

                <Bell className="w-5 h-5 text-blue-200" />

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-slate-300">

                    Announcements

                  </p>

                  <p className="text-xl font-bold text-white">

                    {announcements.length}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="max-w-6xl mx-auto px-6 py-10">


        {/* ====================================================
            PAGE TOOLBAR
        ==================================================== */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="font-serif font-bold text-xl text-[#00113a]">

              Official Inbox

            </h2>

            <p className="text-xs text-slate-500 mt-1">

              Latest communications from SciComS administration

            </p>

          </div>


          <button
            onClick={fetchAnnouncements}
            disabled={loading}
            className="
              flex items-center gap-2
              px-4 py-2
              border border-slate-300
              bg-white
              text-xs font-semibold
              text-[#00113a]
              rounded-sm
              hover:bg-slate-50
              disabled:opacity-50
            "
          >

            <RefreshCw
              className={`w-4 h-4 ${
                loading ? 'animate-spin' : ''
              }`}
            />

            Refresh

          </button>

        </div>


        {/* ====================================================
            LOADING STATE
        ==================================================== */}

        {loading && (

          <div className="bg-white border border-slate-200 rounded-sm py-20 flex justify-center">

            <div className="text-center space-y-3">

              <Loader2 className="w-8 h-8 animate-spin text-[#002366] mx-auto" />

              <p className="text-xs text-slate-500">

                Loading announcements...

              </p>

            </div>

          </div>

        )}


        {/* ====================================================
            ERROR STATE
        ==================================================== */}

        {!loading && error && (

          <div className="bg-red-50 border border-red-200 rounded-sm p-5">

            <p className="text-sm font-semibold text-red-700">

              Unable to load announcements

            </p>

            <p className="text-xs text-red-600 mt-1">

              {error}

            </p>

          </div>

        )}


        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {!loading &&
          !error &&
          announcements.length === 0 && (

            <div className="bg-white border border-slate-200 rounded-sm py-20 text-center">

              <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-5">

                <Inbox className="w-7 h-7 text-slate-400" />

              </div>

              <h3 className="font-serif font-bold text-lg text-[#00113a]">

                Your inbox is empty

              </h3>

              <p className="text-xs text-slate-500 mt-2">

                There are currently no announcements available.

              </p>

            </div>

          )}


        {/* ====================================================
            ANNOUNCEMENTS
        ==================================================== */}

        {!loading &&
          !error &&
          announcements.length > 0 && (

            <div className="space-y-5">

              {announcements.map(
                (announcement) => (

                  <article
                    key={announcement.id}
                    className="
                      bg-white
                      border border-slate-200
                      rounded-sm
                      hover:border-[#002366]/30
                      transition-colors
                    "
                  >


                    {/* Announcement Header */}

                    <div className="px-6 pt-6 pb-4">

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                        <div className="flex items-start gap-4">

                          <div className="
                            w-10 h-10
                            bg-[#eff4ff]
                            border border-[#002366]/10
                            flex items-center justify-center
                            rounded-sm
                            shrink-0
                          ">

                            <Megaphone className="w-5 h-5 text-[#002366]" />

                          </div>


                          <div>

                            <div className="flex items-center gap-2 mb-2">

                              <span className="
                                text-[9px]
                                uppercase
                                tracking-widest
                                font-bold
                                text-[#002366]
                                bg-[#eff4ff]
                                px-2 py-1
                              ">

                                Official Notice

                              </span>

                            </div>


                            <h3 className="
                              font-serif
                              font-bold
                              text-lg
                              md:text-xl
                              text-[#00113a]
                            ">

                              {announcement.subject}

                            </h3>

                          </div>

                        </div>


                        {/* Date */}

                        <div className="
                          flex items-center
                          gap-2
                          text-[11px]
                          text-slate-400
                          whitespace-nowrap
                        ">

                          <Calendar className="w-3.5 h-3.5" />

                          <span>

                            {formatDate(
                              announcement.created_at
                            )}

                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Announcement Body */}

                    <div className="px-6 pb-6">

                      <div className="
                        border-l-2
                        border-[#002366]/20
                        pl-5
                      ">

                        <p className="
                          text-sm
                          text-slate-600
                          leading-7
                          whitespace-pre-wrap
                        ">

                          {announcement.body}

                        </p>

                      </div>


                      {/* Footer */}

                      <div className="
                        flex items-center
                        justify-between
                        mt-6
                        pt-4
                        border-t border-slate-100
                      ">

                        <div className="
                          flex items-center
                          gap-2
                          text-[10px]
                          text-slate-400
                        ">

                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                          Published to SciComS Members

                        </div>


                        <span className="text-[10px] text-slate-400">

                          {formatTime(
                            announcement.created_at
                          )}

                        </span>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

      </div>

    </div>
  );
}