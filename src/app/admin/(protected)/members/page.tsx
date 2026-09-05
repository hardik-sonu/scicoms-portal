'use client';

import React, { useCallback, useEffect, useState } from 'react';

import AdminHeader from '@/components/admin/AdminHeader';

import { createClient } from '@/lib/supabase/client';

import {
  ShieldCheck,
  Loader2,
  Send,
  X,
  Mail,
  RefreshCw,
} from 'lucide-react';

const supabase = createClient();


interface Member {
  id: string;

  full_name: string;

  email: string;

  department: string | null;

  student_id: string | null;

  semester: string | null;

  status: string;

  created_at: string;
}


export default function AdminMembersPage() {

  /* ============================================================
     STATES
  ============================================================ */

  const [members, setMembers] =
    useState<Member[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  /* ============================================================
     MESSAGE MODAL
  ============================================================ */

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [messageSubject, setMessageSubject] =
    useState('');

  const [messageBody, setMessageBody] =
    useState('');

  const [sendingMessage, setSendingMessage] =
    useState(false);

  const [messageSuccess, setMessageSuccess] =
    useState(false);



  /* ============================================================
     FETCH REAL MEMBERS
  ============================================================ */

  const fetchMembers = useCallback(async () => {

    setLoading(true);

    setError(null);


    const { data, error } = await supabase
      .from('memberships')
      .select(`
        id,
        full_name,
        email,
        department,
        student_id,
        semester,
        status,
        created_at
      `)
      .eq('status', 'Approved')
      .order('created_at', {
        ascending: false
      });


    if (error) {

      console.error(error);

      setError(error.message);

      setMembers([]);

    } else {

      setMembers(data || []);

    }


    setLoading(false);

  }, []);



  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {

    queueMicrotask(fetchMembers);

  }, [fetchMembers]);




  /* ============================================================
     SEND INDIVIDUAL MESSAGE
  ============================================================ */

  const handleSendMessage = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!selectedMember) {
      return;
    }


    if (
      !messageSubject.trim() ||
      !messageBody.trim()
    ) {

      setError(
        'Please enter both subject and message.'
      );

      return;

    }


    setSendingMessage(true);

    setError(null);


    const { error } = await supabase
      .from('member_messages')
      .insert({

        member_id:
          selectedMember.id,

        subject:
          messageSubject.trim(),

        body:
          messageBody.trim(),

        sender_name:
          'SciComS Administration',

        status:
          'unread',

      });


    if (error) {

      console.error(error);

      setError(error.message);

      setSendingMessage(false);

      return;

    }


    setMessageSuccess(true);


    setMessageSubject('');

    setMessageBody('');


    setSendingMessage(false);


    setTimeout(() => {

      setMessageSuccess(false);

      setSelectedMember(null);

    }, 1500);

  };




  /* ============================================================
     CLOSE MESSAGE MODAL
  ============================================================ */

  const closeModal = () => {

    if (sendingMessage) {
      return;
    }


    setSelectedMember(null);

    setMessageSubject('');

    setMessageBody('');

    setMessageSuccess(false);

  };




  return (

    <div className="space-y-6 pb-12">


      <AdminHeader
        title="Active Member Roster & Role Assignments"
        subtitle="Manage approved SciComS members and send individual communications"
      />


      <div className="px-6 space-y-6">


        {/* ======================================================
            HEADER ACTIONS
        ====================================================== */}

        <div className="flex items-center justify-between">


          <div>

            <h3 className="font-serif font-bold text-lg text-[#00113a]">

              Approved Members

            </h3>


            <p className="text-xs text-slate-500">

              {members.length} active member
              {members.length !== 1 ? 's' : ''}

            </p>

          </div>


          <button

            onClick={fetchMembers}

            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              text-xs
              font-bold
              border
              border-slate-200
              hover:bg-slate-50
              rounded-sm
            "

          >

            <RefreshCw
              className="w-4 h-4"
            />

            Refresh

          </button>


        </div>




        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading ? (

          <div className="py-20 flex justify-center">

            <Loader2
              className="
                w-7
                h-7
                animate-spin
                text-[#002366]
              "
            />

          </div>

        ) : members.length === 0 ? (


          /* ====================================================
             EMPTY STATE
          ==================================================== */

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-sm
              py-20
              text-center
            "
          >

            <Mail
              className="
                w-10
                h-10
                mx-auto
                mb-3
                text-slate-300
              "
            />

            <h3
              className="
                font-bold
                text-[#00113a]
              "
            >

              No Approved Members

            </h3>


            <p
              className="
                text-xs
                text-slate-400
                mt-1
              "
            >

              Approved membership applications
              will appear here.

            </p>

          </div>


        ) : (


          /* ====================================================
             MEMBERS TABLE
          ==================================================== */

          <div
            className="
              bg-white
              rounded-sm
              border
              border-slate-200
              shadow-xs
              overflow-x-auto
            "
          >


            <table
              className="
                w-full
                text-left
                text-xs
              "
            >


              <thead>

                <tr
                  className="
                    border-b
                    border-slate-200
                    bg-slate-50
                    text-slate-400
                    font-mono
                    text-[10px]
                    uppercase
                  "
                >

                  <th className="p-4">

                    Member

                  </th>


                  <th className="p-4">

                    Department

                  </th>


                  <th className="p-4">

                    Student ID

                  </th>


                  <th className="p-4">

                    Semester

                  </th>


                  <th className="p-4">

                    Communication

                  </th>


                </tr>

              </thead>




              <tbody
                className="
                  divide-y
                  divide-slate-100
                "
              >


                {members.map(
                  (member) => (


                    <tr
                      key={member.id}

                      className="
                        hover:bg-slate-50/80
                      "
                    >


                      {/* MEMBER */}

                      <td className="p-4">


                        <div>

                          <div
                            className="
                              font-bold
                              text-[#00113a]
                            "
                          >

                            {member.full_name}

                          </div>


                          <div
                            className="
                              text-[11px]
                              text-slate-400
                            "
                          >

                            {member.email}

                          </div>

                        </div>


                      </td>



                      {/* DEPARTMENT */}

                      <td className="p-4">

                        <span
                          className="
                            bg-[#eff4ff]
                            text-[#002366]
                            px-2
                            py-1
                            rounded-xs
                            font-bold
                            text-[10px]
                          "
                        >

                          {member.department ||
                            'Not specified'}

                        </span>

                      </td>



                      {/* STUDENT ID */}

                      <td
                        className="
                          p-4
                          font-mono
                          text-slate-500
                        "
                      >

                        {member.student_id ||
                          '-'}

                      </td>



                      {/* SEMESTER */}

                      <td
                        className="
                          p-4
                          text-slate-500
                        "
                      >

                        {member.semester ||
                          '-'}

                      </td>



                      {/* SEND MESSAGE */}

                      <td className="p-4">


                        <button

                          onClick={() =>
                            setSelectedMember(
                              member
                            )
                          }

                          className="
                            px-3
                            py-1.5
                            bg-[#002366]
                            text-white
                            hover:bg-[#00113a]
                            rounded-xs
                            font-bold
                            text-[10px]
                            flex
                            items-center
                            gap-1.5
                          "

                        >

                          <Send
                            className="
                              w-3
                              h-3
                            "
                          />

                          Send Message

                        </button>


                      </td>


                    </tr>


                  )
                )}


              </tbody>


            </table>


          </div>

        )}


      </div>




      {/* ========================================================
          ERROR
      ======================================================== */}

      {error && (

        <div className="px-6">

          <div
            className="
              bg-red-50
              border
              border-red-200
              text-red-700
              p-3
              text-xs
              rounded-sm
            "
          >

            {error}

          </div>

        </div>

      )}




      {/* ========================================================
          SEND MESSAGE MODAL
      ======================================================== */}

      {selectedMember && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-4
          "
        >


          <div
            className="
              bg-white
              w-full
              max-w-xl
              rounded-sm
              shadow-xl
            "
          >


            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-4
                border-b
                border-slate-200
              "
            >


              <div>

                <h3
                  className="
                    font-serif
                    font-bold
                    text-lg
                    text-[#00113a]
                  "
                >

                  Send Member Message

                </h3>


                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >

                  To: {selectedMember.full_name}

                </p>


              </div>


              <button
                onClick={closeModal}
              >

                <X
                  className="
                    w-5
                    h-5
                    text-slate-400
                  "
                />

              </button>


            </div>



            {/* SUCCESS */}

            {messageSuccess ? (

              <div
                className="
                  py-16
                  text-center
                "
              >

                <ShieldCheck
                  className="
                    w-12
                    h-12
                    text-emerald-600
                    mx-auto
                    mb-3
                  "
                />


                <h3
                  className="
                    font-bold
                    text-[#00113a]
                  "
                >

                  Message Sent Successfully

                </h3>


                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >

                  The message is now available
                  in the member inbox.

                </p>


              </div>

            ) : (


              /* FORM */

              <form
                onSubmit={handleSendMessage}
                className="
                  p-6
                  space-y-5
                "
              >


                <div>


                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      text-[#00113a]
                      mb-2
                    "
                  >

                    Subject

                  </label>


                  <input

                    value={messageSubject}

                    onChange={(e) =>
                      setMessageSubject(
                        e.target.value
                      )
                    }

                    placeholder="
                      Enter message subject
                    "

                    className="
                      w-full
                      border
                      border-slate-300
                      px-3
                      py-2.5
                      text-sm
                      rounded-sm
                      focus:outline-none
                      focus:ring-1
                      focus:ring-[#002366]
                    "

                  />


                </div>




                <div>


                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      text-[#00113a]
                      mb-2
                    "
                  >

                    Message

                  </label>


                  <textarea

                    rows={7}

                    value={messageBody}

                    onChange={(e) =>
                      setMessageBody(
                        e.target.value
                      )
                    }

                    placeholder="
                      Write your message to the member...
                    "

                    className="
                      w-full
                      border
                      border-slate-300
                      px-3
                      py-2.5
                      text-sm
                      rounded-sm
                      resize-none
                      focus:outline-none
                      focus:ring-1
                      focus:ring-[#002366]
                    "

                  />


                </div>




                <div
                  className="
                    flex
                    justify-end
                    gap-3
                    pt-2
                  "
                >


                  <button

                    type="button"

                    onClick={closeModal}

                    className="
                      px-4
                      py-2.5
                      border
                      border-slate-200
                      text-xs
                      font-bold
                      rounded-sm
                    "

                  >

                    Cancel

                  </button>



                  <button

                    type="submit"

                    disabled={sendingMessage}

                    className="
                      px-5
                      py-2.5
                      bg-[#002366]
                      text-white
                      text-xs
                      font-bold
                      rounded-sm
                      flex
                      items-center
                      gap-2
                      disabled:opacity-50
                    "

                  >

                    {sendingMessage ? (

                      <Loader2
                        className="
                          w-4
                          h-4
                          animate-spin
                        "
                      />

                    ) : (

                      <Send
                        className="
                          w-4
                          h-4
                        "
                      />

                    )}


                    {sendingMessage
                      ? 'Sending...'
                      : 'Send Message'
                    }


                  </button>


                </div>


              </form>


            )}


          </div>


        </div>

      )}


    </div>

  );

}