import AdminHeader from '@/components/admin/AdminHeader';

import {
  Users,
  ClipboardList,
  CalendarDays,
  FileText,
  MessageSquare,
  Star,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  /*
  ==========================================
  GET REAL COUNTS FROM SUPABASE
  ==========================================
  */

  const [
    membershipsResult,
    applicationsResult,
    eventsResult,
    registrationsResult,
    messagesResult,
    feedbackResult,
  ] = await Promise.all([
    supabase
      .from('memberships')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('applications')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('events')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('feedback')
      .select('*', { count: 'exact', head: true }),
  ]);

  /*
  ==========================================
  DASHBOARD STATISTICS
  ==========================================
  */

  const stats = [
    {
      title: 'Memberships',
      value: membershipsResult.count ?? 0,
      icon: Users,
    },
    {
      title: 'Applications',
      value: applicationsResult.count ?? 0,
      icon: ClipboardList,
    },
    {
      title: 'Events',
      value: eventsResult.count ?? 0,
      icon: CalendarDays,
    },
    {
      title: 'Event Registrations',
      value: registrationsResult.count ?? 0,
      icon: FileText,
    },
    {
      title: 'Contact Messages',
      value: messagesResult.count ?? 0,
      icon: MessageSquare,
    },
    {
      title: 'Feedback',
      value: feedbackResult.count ?? 0,
      icon: Star,
    },
  ];

  /*
  ==========================================
  GET RECENT APPLICATIONS
  ==========================================
  */

  const { data: recentApplications } = await supabase
    .from('applications')
    .select(`
      id,
      full_name,
      email,
      application_type,
      status,
      created_at
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  /*
  ==========================================
  GET RECENT EVENTS
  ==========================================
  */

  const { data: recentEvents } = await supabase
    .from('events')
    .select(`
      id,
      title,
      category,
      event_date,
      location,
      status
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen">

      <AdminHeader
        title="Admin Dashboard"
        subtitle="Manage SciComS website, members, applications, events, and communications."
      />

      <div className="p-6 space-y-6">

        {/* STATISTICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (

              <div
                key={stat.title}
                className="bg-white border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold text-[#00113a] mt-2">
                      {stat.value}
                    </h2>

                  </div>

                  <div className="w-11 h-11 bg-[#00113a]/5 flex items-center justify-center">

                    <Icon className="w-5 h-5 text-[#002366]" />

                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* RECENT DATA */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


          {/* RECENT APPLICATIONS */}

          <div className="bg-white border border-slate-200">

            <div className="p-5 border-b border-slate-200">

              <h2 className="font-bold text-[#00113a]">
                Recent Applications
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Latest applications received through the website.
              </p>

            </div>


            <div className="divide-y divide-slate-100">

              {recentApplications &&
              recentApplications.length > 0 ? (

                recentApplications.map((application) => (

                  <div
                    key={application.id}
                    className="p-4 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-sm font-bold text-[#00113a]">
                        {application.full_name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {application.email}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-1">
                        {application.application_type}
                      </p>

                    </div>


                    <span className="px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-700">

                      {application.status ?? 'Pending'}

                    </span>

                  </div>

                ))

              ) : (

                <div className="p-10 text-center text-sm text-slate-400">

                  No applications received yet.

                </div>

              )}

            </div>

          </div>


          {/* RECENT EVENTS */}

          <div className="bg-white border border-slate-200">

            <div className="p-5 border-b border-slate-200">

              <h2 className="font-bold text-[#00113a]">
                Recent Events
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Latest events created in the system.
              </p>

            </div>


            <div className="divide-y divide-slate-100">

              {recentEvents &&
              recentEvents.length > 0 ? (

                recentEvents.map((event) => (

                  <div
                    key={event.id}
                    className="p-4 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-sm font-bold text-[#00113a]">
                        {event.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {event.category}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-1">

                        {event.event_date ?? 'Date not scheduled'}

                        {event.location
                          ? ` • ${event.location}`
                          : ''}

                      </p>

                    </div>


                    <span className="px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-700">

                      {event.status}

                    </span>

                  </div>

                ))

              ) : (

                <div className="p-10 text-center text-sm text-slate-400">

                  No events created yet.

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}