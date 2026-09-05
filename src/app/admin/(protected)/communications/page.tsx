'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AdminHeader from '@/components/admin/AdminHeader';
import MemberMessagePanel from '@/components/admin/MemberMessagePanel';

import { createClient } from '@/lib/supabase/client';

import {
  Send,
  CheckCircle,
  Inbox,
  Loader2,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

/*
==========================================================
TYPES
==========================================================
*/

interface ContactInquiry {
  id: string;

  name: string;

  email: string;

  institution: string | null;

  subject: string | null;

  message: string;

  status: string;

  created_at: string;
}

/*
==========================================================
PAGE
==========================================================
*/

export default function AdminCommunicationsPage() {
  /*
  ==========================================================
  SUPABASE
  ==========================================================
  */

  const supabase = useMemo(
    () => createClient(),
    []
  );

  /*
  ==========================================================
  ANNOUNCEMENT STATES
  ==========================================================
  */

  const [subject, setSubject] = useState('');

  const [body, setBody] = useState('');

  const [sending, setSending] =
    useState(false);

  const [broadcastSent, setBroadcastSent] =
    useState(false);

  /*
  ==========================================================
  CONTACT INQUIRY STATES
  ==========================================================
  */

  const [inquiries, setInquiries] =
    useState<ContactInquiry[]>([]);

  const [loadingInbox, setLoadingInbox] =
    useState(true);

  /*
  ==========================================================
  ERROR STATE
  ==========================================================
  */

  const [error, setError] =
    useState<string | null>(null);

  /*
  ==========================================================
  FETCH CONTACT INQUIRIES
  ==========================================================
  */

  const fetchInquiries =
    useCallback(async () => {
      setLoadingInbox(true);

      setError(null);

      const { data, error } =
        await supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', {
            ascending: false,
          });

      if (error) {
        console.error(
          'Error fetching contact inquiries:',
          error
        );

        setError(error.message);

        setInquiries([]);
      } else {
        setInquiries(data || []);
      }

      setLoadingInbox(false);
    }, [supabase]);

  /*
  ==========================================================
  LOAD INQUIRIES
  ==========================================================
  */

  useEffect(() => {
    setTimeout(() => void fetchInquiries(), 0);
  }, [fetchInquiries]);

  /*
  ==========================================================
  SEND ANNOUNCEMENT
  ==========================================================
  */

  const handleSendBroadcast = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!subject.trim() || !body.trim()) {
      setError(
        'Please enter both subject and message.'
      );

      return;
    }

    setSending(true);

    setError(null);

    const { error } =
      await supabase
        .from('announcements')
        .insert({
          subject: subject.trim(),

          body: body.trim(),

          audience: 'all_members',

          status: 'published',
        });

    if (error) {
      console.error(
        'Announcement publishing error:',
        error
      );

      setError(error.message);

      setSending(false);

      return;
    }

    setBroadcastSent(true);

    setSubject('');

    setBody('');

    setSending(false);

    window.setTimeout(() => {
      setBroadcastSent(false);
    }, 3000);
  };

  /*
  ==========================================================
  UPDATE CONTACT INQUIRY STATUS
  ==========================================================
  */

  const updateInquiryStatus = async (
    id: string,
    status: string
  ) => {
    setError(null);

    const { error } =
      await supabase
        .from('contact_inquiries')
        .update({
          status,
        })
        .eq('id', id);

    if (error) {
      console.error(
        'Inquiry status update error:',
        error
      );

      setError(error.message);

      return;
    }

    /*
    Update UI immediately
    */

    setInquiries((currentInquiries) =>
      currentInquiries.map((inquiry) =>
        inquiry.id === id
          ? {
              ...inquiry,
              status,
            }
          : inquiry
      )
    );
  };

  /*
  ==========================================================
  FORMAT DATE
  ==========================================================
  */

  const formatDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleDateString(
      'en-US',
      {
        month: 'short',

        day: 'numeric',

        year: 'numeric',
      }
    );
  };

  /*
  ==========================================================
  PAGE
  ==========================================================
  */

  return (
    <div className="space-y-6 pb-12">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <AdminHeader
        title="Communications & Moderation"
        subtitle="Manage official announcements, member communications, and contact inquiries."
      />


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div className="px-6">

          <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-xs rounded-sm">

            {error}

          </div>

        </div>
      )}


      {/* =====================================================
          TOP SECTION
          ANNOUNCEMENT + MEMBER MESSAGING
      ===================================================== */}

      <div className="px-6 grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* ===================================================
            BROADCAST SYSTEM
        =================================================== */}

        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">


          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">

            <div>

              <h3 className="font-serif font-bold text-base text-[#00113a]">

                Send Official Notice

              </h3>

              <p className="text-[10px] text-slate-400 mt-1">

                Publish an announcement for all members.

              </p>

            </div>


            <Send className="w-4 h-4 text-[#002366]" />

          </div>


          {/* SUCCESS */}

          {broadcastSent ? (

            <div className="text-center py-12 space-y-3">

              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />


              <h4 className="font-serif font-bold text-lg text-[#00113a]">

                Announcement Published!

              </h4>


              <p className="text-xs text-slate-500">

                The announcement has been saved successfully.

              </p>

            </div>

          ) : (


            /* FORM */

            <form
              onSubmit={handleSendBroadcast}
              className="space-y-4 text-xs"
            >


              {/* SUBJECT */}

              <div>

                <label className="block font-bold text-[#00113a] mb-1">

                  Subject *

                </label>


                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  placeholder="Enter announcement subject"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />

              </div>


              {/* MESSAGE */}

              <div>

                <label className="block font-bold text-[#00113a] mb-1">

                  Message *

                </label>


                <textarea
                  required
                  rows={8}
                  value={body}
                  onChange={(e) =>
                    setBody(e.target.value)
                  }
                  placeholder="Write your official announcement..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#002366] focus:outline-none resize-none"
                />

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 bg-[#002366] text-white font-bold uppercase tracking-wider rounded-sm hover:bg-[#00113a] disabled:opacity-60 flex items-center gap-2"
              >

                {sending ? (

                  <Loader2 className="w-4 h-4 animate-spin" />

                ) : (

                  <Send className="w-4 h-4" />

                )}


                <span>

                  {sending
                    ? 'Publishing...'
                    : 'Publish Announcement'
                  }

                </span>

              </button>

            </form>

          )}

        </div>


        {/* ===================================================
            MEMBER DIRECT MESSAGING
        =================================================== */}

        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6">

          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">

            <MessageSquare className="w-4 h-4 text-[#002366]" />

            <div>

              <h3 className="font-serif font-bold text-base text-[#00113a]">

                Member Direct Messaging

              </h3>

              <p className="text-[10px] text-slate-400 mt-1">

                Send official messages directly to active members.

              </p>

            </div>

          </div>


          {/* STEP 3 MEMBER MESSAGE PANEL */}

          <MemberMessagePanel />

        </div>

      </div>


      {/* =====================================================
          CONTACT INQUIRY INBOX
      ===================================================== */}

      <div className="px-6">


        <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">


          {/* =================================================
              INBOX HEADER
          ================================================= */}

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">


            <div className="flex items-center gap-2">

              <Inbox className="w-4 h-4 text-[#002366]" />


              <div>

                <h3 className="font-serif font-bold text-base text-[#00113a]">

                  Contact Inquiry Inbox

                </h3>


                <p className="text-[10px] text-slate-400 mt-1">

                  Review and manage messages submitted through the contact form.

                </p>

              </div>

            </div>


            {/* REFRESH */}

            <button
              onClick={() =>
                void fetchInquiries()
              }
              disabled={loadingInbox}
              className="p-2 hover:bg-slate-100 rounded-sm disabled:opacity-50"
              title="Refresh inbox"
            >

              <RefreshCw
                className={`w-4 h-4 text-slate-500 ${
                  loadingInbox
                    ? 'animate-spin'
                    : ''
                }`}
              />

            </button>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loadingInbox ? (

            <div className="py-16 flex justify-center">

              <Loader2 className="w-6 h-6 animate-spin text-[#002366]" />

            </div>

          ) : inquiries.length === 0 ? (

            <div className="text-center py-16 text-xs text-slate-400">

              No contact inquiries yet.

            </div>

          ) : (


            /* =================================================
                INQUIRIES
            ================================================= */

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">


              {inquiries.map(
                (inquiry) => (

                  <div
                    key={inquiry.id}
                    className="p-4 bg-[#f8f9ff] border border-slate-200 rounded-sm space-y-3"
                  >


                    {/* HEADER */}

                    <div className="flex justify-between gap-3">


                      <div className="min-w-0">


                        <h4 className="font-bold text-[#00113a] truncate">

                          {inquiry.name}

                        </h4>


                        <p className="text-[10px] text-slate-400 truncate">

                          {inquiry.email}

                        </p>


                        {inquiry.institution && (

                          <p className="text-[10px] text-slate-400 truncate">

                            {inquiry.institution}

                          </p>

                        )}

                      </div>


                      <span className="text-[10px] text-slate-400 whitespace-nowrap">

                        {formatDate(
                          inquiry.created_at
                        )}

                      </span>

                    </div>


                    {/* SUBJECT */}

                    {inquiry.subject && (

                      <h5 className="font-semibold text-xs text-[#002366]">

                        {inquiry.subject}

                      </h5>

                    )}


                    {/* MESSAGE */}

                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">

                      {inquiry.message}

                    </p>


                    {/* STATUS */}

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center">


                      <span className="text-[10px] text-slate-400 font-mono uppercase">

                        Status

                      </span>


                      <select
                        value={inquiry.status}
                        onChange={(e) =>
                          void updateInquiryStatus(
                            inquiry.id,
                            e.target.value
                          )
                        }
                        className="text-[10px] font-bold border border-slate-200 px-2 py-1 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#002366]"
                      >

                        <option value="unread">

                          Unread

                        </option>


                        <option value="read">

                          Read

                        </option>


                        <option value="resolved">

                          Resolved

                        </option>

                      </select>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}