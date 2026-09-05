'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Search,
  Send,
  Loader2,
  CheckCircle2,
  User,
  Users,
  Mail,
  RefreshCw,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

type Member = {
  id: string;
  membership_id: string;
  full_name: string;
  email: string;
  directorate: string;
  executive_role: string;
  member_status: string;
};

export default function MemberMessagePanel() {

  const supabase = useMemo(
    () => createClient(),
    []
  );

  const [members, setMembers] =
    useState<Member[]>([]);

  const [search, setSearch] =
    useState('');

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [subject, setSubject] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [loadingMembers, setLoadingMembers] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState('');

  const [error, setError] =
    useState('');

  /*
  ==========================================
  FETCH ACTIVE MEMBERS
  ==========================================
  */

  const fetchMembers = useCallback(
    async () => {

      setLoadingMembers(true);

      setError('');

      const { data, error } =
        await supabase
          .from('members')
          .select(`
            id,
            membership_id,
            full_name,
            email,
            directorate,
            executive_role,
            member_status
          `)
          .eq(
            'member_status',
            'Active'
          )
          .order(
            'full_name',
            {
              ascending: true,
            }
          );

      if (error) {

        console.error(
          'Error fetching members:',
          error
        );

        setError(
          error.message
        );

        setMembers([]);

      } else {

        setMembers(
          data || []
        );

      }

      setLoadingMembers(false);

    },
    [supabase]
  );

  /*
  ==========================================
  LOAD MEMBERS
  ==========================================
  */

  useEffect(() => {

    setTimeout(() => void fetchMembers(), 0);

  }, [fetchMembers]);

  /*
  ==========================================
  FILTER MEMBERS
  ==========================================
  */

  const filteredMembers =
    members.filter(
      (member) => {

        const query =
          search
            .toLowerCase()
            .trim();

        if (!query) {

          return true;

        }

        return (

          member.full_name
            .toLowerCase()
            .includes(query)

          ||

          member.email
            .toLowerCase()
            .includes(query)

          ||

          member.directorate
            .toLowerCase()
            .includes(query)

        );

      }
    );

  /*
  ==========================================
  SEND MESSAGE
  ==========================================
  */

  const handleSendMessage =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setError('');

      setSuccess('');

      if (!selectedMember) {

        setError(
          'Please select a member.'
        );

        return;

      }

      if (!subject.trim()) {

        setError(
          'Please enter a subject.'
        );

        return;

      }

      if (!message.trim()) {

        setError(
          'Please enter a message.'
        );

        return;

      }

      if (
        !selectedMember.membership_id
      ) {

        setError(
          'This member does not have an authenticated account connected.'
        );

        return;

      }

      setSending(true);

      const { error } =
        await supabase
          .from('member_messages')
          .insert({

            recipient_id:
              selectedMember.membership_id,

            subject:
              subject.trim(),

            body:
              message.trim(),

            sender_name:
              'SciComS Administration',

            status:
              'unread',

          });

      if (error) {

        console.error(
          'Error sending message:',
          error
        );

        setError(
          error.message
        );

        setSending(false);

        return;

      }

      setSuccess(
        `Message successfully sent to ${selectedMember.full_name}.`
      );

      setSubject('');

      setMessage('');

      setSending(false);

      setTimeout(() => {

        setSuccess('');

      }, 4000);

    };

  /*
  ==========================================
  UI
  ==========================================
  */

  return (

    <div className="bg-white rounded-sm border border-slate-200 shadow-xs">

      {/* HEADER */}

      <div className="p-6 border-b border-slate-100">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-serif font-bold text-lg text-[#00113a]">

              Send Individual Message

            </h3>

            <p className="text-xs text-slate-500 mt-1">

              Send a private message directly to a SciComS member.

            </p>

          </div>

          <button
            onClick={() =>
              void fetchMembers()
            }
            disabled={loadingMembers}
            className="p-2 border border-slate-200 hover:bg-slate-50"
            title="Refresh Members"
          >

            <RefreshCw
              className={`w-4 h-4 text-[#002366] ${
                loadingMembers
                  ? 'animate-spin'
                  : ''
              }`}
            />

          </button>

        </div>

      </div>

      <div className="p-6">

        {/* SUCCESS */}

        {success && (

          <div className="mb-5 flex items-center gap-2 border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-xs">

            <CheckCircle2 className="w-4 h-4" />

            {success}

          </div>

        )}

        {/* ERROR */}

        {error && (

          <div className="mb-5 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs">

            {error}

          </div>

        )}

        {/* MEMBER SEARCH */}

        <div className="mb-6">

          <label className="block text-xs font-bold text-[#00113a] mb-2">

            Select Member

          </label>

          <div className="relative">

            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search member by name, email, or directorate..."
              className="w-full border border-slate-300 pl-10 pr-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002366]"
            />

          </div>

        </div>

        {/* MEMBER LIST */}

        {loadingMembers ? (

          <div className="py-10 flex justify-center">

            <Loader2 className="w-6 h-6 animate-spin text-[#002366]" />

          </div>

        ) : filteredMembers.length === 0 ? (

          <div className="border border-dashed border-slate-200 py-10 text-center">

            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />

            <p className="text-xs text-slate-400">

              No active members found.

            </p>

          </div>

        ) : (

          <div className="max-h-64 overflow-y-auto border border-slate-200 mb-6">

            {filteredMembers.map(
              (member) => (

                <button
                  key={member.id}
                  type="button"
                  onClick={() =>
                    setSelectedMember(
                      member
                    )
                  }
                  className={`w-full text-left p-4 border-b border-slate-100 transition-colors ${
                    selectedMember?.id ===
                    member.id
                      ? 'bg-[#eff4ff]'
                      : 'hover:bg-slate-50'
                  }`}
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-[#002366] text-white flex items-center justify-center">

                        <User className="w-4 h-4" />

                      </div>

                      <div>

                        <div className="font-bold text-xs text-[#00113a]">

                          {member.full_name}

                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">

                          <Mail className="w-3 h-3" />

                          {member.email}

                        </div>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-[10px] font-bold text-[#705d00]">

                        {member.directorate}

                      </div>

                      <div className="text-[10px] text-slate-400 mt-1">

                        {member.executive_role}

                      </div>

                    </div>

                  </div>

                </button>

              )
            )}

          </div>

        )}

        {/* SELECTED MEMBER */}

        {selectedMember && (

          <div className="mb-6 border border-[#002366]/20 bg-[#eff4ff] p-4">

            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">

              Message Recipient

            </div>

            <div className="font-bold text-[#00113a]">

              {selectedMember.full_name}

            </div>

            <div className="text-xs text-slate-500">

              {selectedMember.email}

            </div>

          </div>

        )}

        {/* MESSAGE FORM */}

        <form
          onSubmit={handleSendMessage}
          className="space-y-4"
        >

          <div>

            <label className="block text-xs font-bold text-[#00113a] mb-2">

              Subject

            </label>

            <input
              type="text"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              placeholder="Enter message subject"
              className="w-full border border-slate-300 px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002366]"
            />

          </div>

          <div>

            <label className="block text-xs font-bold text-[#00113a] mb-2">

              Message

            </label>

            <textarea
              rows={7}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Write your message..."
              className="w-full border border-slate-300 px-3 py-2.5 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#002366]"
            />

          </div>

          <button
            type="submit"
            disabled={
              sending ||
              !selectedMember
            }
            className="px-6 py-2.5 bg-[#002366] text-white text-xs font-bold hover:bg-[#00113a] disabled:opacity-50 flex items-center gap-2"
          >

            {sending ? (

              <Loader2 className="w-4 h-4 animate-spin" />

            ) : (

              <Send className="w-4 h-4" />

            )}

            {sending
              ? 'Sending Message...'
              : 'Send Message'}

          </button>

        </form>

      </div>

    </div>

  );

}