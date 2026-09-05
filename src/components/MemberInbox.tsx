'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import { createClient } from '@/lib/supabase/client';

import {
  Mail,
  MailOpen,
  Loader2,
  RefreshCw,
  Clock,
} from 'lucide-react';


interface MemberMessage {

  id: string;

  member_id: string;

  subject: string;

  body: string;

  sender_name: string | null;

  status: 'unread' | 'read';

  created_at: string;

  read_at: string | null;

}


interface MemberInboxProps {

  memberId: string;

}


export default function MemberInbox({
  memberId,
}: MemberInboxProps) {


  const supabase = createClient();


  /* ============================================================
     STATES
  ============================================================ */

  const [messages, setMessages] =
    useState<MemberMessage[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedMessage, setSelectedMessage] =
    useState<MemberMessage | null>(null);

  const [error, setError] =
    useState<string | null>(null);



  /* ============================================================
     FETCH MESSAGES
  ============================================================ */

  const fetchMessages = async () => {

    setLoading(true);

    setError(null);


    const { data, error } = await supabase
      .from('member_messages')
      .select(`
        id,
        member_id,
        subject,
        body,
        sender_name,
        status,
        created_at,
        read_at
      `)
      .eq(
        'member_id',
        memberId
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      );


    if (error) {

      console.error(error);

      setError(error.message);

      setMessages([]);

    } else {

      setMessages(
        data || []
      );

    }


    setLoading(false);

  };



  /* ============================================================
     INITIAL FETCH
  ============================================================ */

  useEffect(() => {

    void fetchMessages();

  }, [memberId]);



  /* ============================================================
     MARK MESSAGE AS READ
  ============================================================ */

  const openMessage = async (
    message: MemberMessage
  ) => {


    setSelectedMessage(
      message
    );


    if (
      message.status === 'unread'
    ) {


      const now =
        new Date().toISOString();


      const { error } =
        await supabase
          .from(
            'member_messages'
          )
          .update({

            status: 'read',

            read_at: now,

          })
          .eq(
            'id',
            message.id
          );


      if (error) {

        console.error(error);

        return;

      }


      setMessages(
        (previousMessages) =>

          previousMessages.map(
            (item) =>

              item.id === message.id

                ? {

                    ...item,

                    status: 'read',

                    read_at: now,

                  }

                : item

          )

      );


      setSelectedMessage({

        ...message,

        status: 'read',

        read_at: now,

      });

    }

  };



  /* ============================================================
     FORMAT DATE
  ============================================================ */

  const formatDate = (
    date: string
  ) => {

    return new Date(
      date
    ).toLocaleString(
      'en-US',
      {

        month: 'short',

        day: 'numeric',

        year: 'numeric',

        hour: 'numeric',

        minute: '2-digit',

      }
    );

  };



  /* ============================================================
     UNREAD COUNT
  ============================================================ */

  const unreadCount =
    messages.filter(
      (message) =>
        message.status === 'unread'
    ).length;




  return (

    <div
      className="
        max-w-5xl
        mx-auto
        space-y-6
      "
    >


      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >


        <div>


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <h1
              className="
                text-2xl
                font-serif
                font-bold
                text-[#00113a]
              "
            >

              My Inbox

            </h1>


            {unreadCount > 0 && (

              <span
                className="
                  bg-red-600
                  text-white
                  text-[10px]
                  font-bold
                  px-2
                  py-1
                  rounded-full
                "
              >

                {unreadCount}

              </span>

            )}

          </div>


          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >

            Official communications
            from SciComS Administration.

          </p>


        </div>



        <button

          onClick={fetchMessages}

          className="
            p-2
            border
            border-slate-200
            hover:bg-slate-50
            rounded-sm
          "

          title="
            Refresh inbox
          "

        >

          <RefreshCw
            className="
              w-4
              h-4
              text-slate-500
            "
          />

        </button>


      </div>




      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (

        <div
          className="
            bg-red-50
            border
            border-red-200
            text-red-700
            p-3
            text-sm
            rounded-sm
          "
        >

          {error}

        </div>

      )}




      {/* ======================================================
          LOADING
      ====================================================== */}

      {loading ? (

        <div
          className="
            py-20
            flex
            justify-center
          "
        >

          <Loader2
            className="
              w-7
              h-7
              animate-spin
              text-[#002366]
            "
          />

        </div>


      ) : messages.length === 0 ? (


        /* ====================================================
           EMPTY STATE
        ==================================================== */

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-sm
            py-24
            text-center
          "
        >

          <MailOpen
            className="
              w-12
              h-12
              text-slate-300
              mx-auto
              mb-4
            "
          />


          <h2
            className="
              font-serif
              font-bold
              text-lg
              text-[#00113a]
            "
          >

            Your Inbox is Empty

          </h2>


          <p
            className="
              text-sm
              text-slate-400
              mt-2
            "
          >

            You don&apos;t have any
            personal messages yet.

          </p>


        </div>


      ) : (


        /* ====================================================
           MESSAGE LIST
        ==================================================== */

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-sm
            divide-y
            divide-slate-100
          "
        >


          {messages.map(
            (message) => (


              <button

                key={message.id}

                onClick={() =>
                  openMessage(
                    message
                  )
                }

                className={`
                  w-full
                  text-left
                  p-5
                  transition
                  hover:bg-slate-50

                  ${
                    message.status === 'unread'

                      ? 'bg-[#f5f8ff]'

                      : 'bg-white'

                  }
                `}

              >


                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >


                  {/* ICON */}

                  <div
                    className="
                      mt-1
                    "
                  >

                    {message.status ===
                    'unread' ? (

                      <Mail
                        className="
                          w-5
                          h-5
                          text-[#002366]
                        "
                      />

                    ) : (

                      <MailOpen
                        className="
                          w-5
                          h-5
                          text-slate-400
                        "
                      />

                    )}

                  </div>




                  {/* CONTENT */}

                  <div
                    className="
                      flex-1
                      min-w-0
                    "
                  >


                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >


                      <h3
                        className={`
                          text-sm
                          truncate

                          ${
                            message.status ===
                            'unread'

                              ? 'font-bold text-[#00113a]'

                              : 'font-semibold text-slate-700'

                          }
                        `}
                      >

                        {message.subject}

                      </h3>



                      <span
                        className="
                          text-[10px]
                          text-slate-400
                          whitespace-nowrap
                        "
                      >

                        {formatDate(
                          message.created_at
                        )}

                      </span>


                    </div>



                    <p
                      className="
                        text-xs
                        text-slate-500
                        mt-1
                      "
                    >

                      From:{' '}

                      {message.sender_name ||
                        'SciComS Administration'}

                    </p>



                    <p
                      className="
                        text-xs
                        text-slate-500
                        mt-3
                        line-clamp-2
                      "
                    >

                      {message.body}

                    </p>


                  </div>


                </div>


              </button>


            )
          )}


        </div>

      )}




      {/* ======================================================
          MESSAGE VIEW MODAL
      ====================================================== */}

      {selectedMessage && (

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
              max-w-2xl
              rounded-sm
              shadow-xl
            "
          >


            {/* MODAL HEADER */}

            <div
              className="
                p-6
                border-b
                border-slate-200
              "
            >

              <h2
                className="
                  font-serif
                  font-bold
                  text-xl
                  text-[#00113a]
                "
              >

                {selectedMessage.subject}

              </h2>


              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-3
                "
              >

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >

                  From:{' '}

                  {selectedMessage.sender_name ||
                    'SciComS Administration'}

                </p>


                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-[10px]
                    text-slate-400
                  "
                >

                  <Clock
                    className="
                      w-3
                      h-3
                    "
                  />

                  {formatDate(
                    selectedMessage.created_at
                  )}

                </div>


              </div>


            </div>



            {/* MESSAGE */}

            <div
              className="
                p-6
                min-h-[200px]
              "
            >

              <p
                className="
                  text-sm
                  text-slate-600
                  leading-relaxed
                  whitespace-pre-wrap
                "
              >

                {selectedMessage.body}

              </p>


            </div>




            {/* FOOTER */}

            <div
              className="
                px-6
                py-4
                border-t
                border-slate-200
                flex
                justify-end
              "
            >

              <button

                onClick={() =>
                  setSelectedMessage(
                    null
                  )
                }

                className="
                  px-5
                  py-2
                  bg-[#002366]
                  text-white
                  text-xs
                  font-bold
                  rounded-sm
                "

              >

                Close

              </button>


            </div>


          </div>


        </div>

      )}


    </div>

  );

}