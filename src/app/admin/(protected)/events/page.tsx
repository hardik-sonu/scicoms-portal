'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AdminHeader from '@/components/admin/AdminHeader';

import { createClient } from '@/lib/supabase/client';

import {
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';


interface Event {
  id: string;

  title: string;

  tagline: string | null;

  category: string;

  event_date: string | null;

  event_time: string | null;

  location: string | null;

  venue_type: string | null;

  status: string;

  featured: boolean;

  cover_image: string | null;

  description: string | null;

  full_details: string | null;

  registration_fee: string | null;

  eligibility: string | null;

  capacity: number | null;

  created_at: string;
}


export default function AdminEventsPage() {

  const supabase = useMemo(() => createClient(), []);


  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);


  const [title, setTitle] = useState('');

  const [category, setCategory] = useState('Workshop');

  const [eventDate, setEventDate] = useState('');

  const [location, setLocation] = useState('');

  const [capacity, setCapacity] = useState('100');


  /* ============================
     LOAD EVENTS
  ============================ */

  const loadEvents = useCallback(async () => {

    setLoading(true);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', {
        ascending: false,
      });


    if (error) {

      console.error(error);

      alert('Failed to load events');

    } else {

      setEvents(data || []);

    }

    setLoading(false);

  }, [supabase]);


  useEffect(() => {

    const loadTimer = window.setTimeout(() => {
      void loadEvents();
    }, 0);

    return () => window.clearTimeout(loadTimer);

  }, [loadEvents]);



  /* ============================
     CREATE EVENT
  ============================ */

  const handleCreate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!title.trim()) {

      alert('Event title is required');

      return;

    }


    setCreating(true);


    const { error } = await supabase
      .from('events')
      .insert({

        title: title.trim(),

        tagline:
          'Empowering Scientific Communication',

        category,

        event_date:
          eventDate || null,

        event_time:
          null,

        location:
          location || null,

        venue_type:
          'In-Person',

        status:
          'Upcoming',

        featured:
          false,

        cover_image:
          null,

        description:
          'Event created by SciComS administration.',

        full_details:
          null,

        registration_fee:
          'Free',

        eligibility:
          'Open to students',

        capacity:
          Number(capacity) || 100,

      });


    if (error) {

      console.error(error);

      alert(
        'Failed to create event'
      );

    } else {

      await loadEvents();


      setTitle('');

      setEventDate('');

      setLocation('');

      setCapacity('100');


      setModalOpen(false);

    }


    setCreating(false);

  };



  /* ============================
     DELETE EVENT
  ============================ */

  const handleDelete = async (
    id: string
  ) => {

    const confirmed = confirm(
      'Are you sure you want to delete this event?'
    );


    if (!confirmed) return;


    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);


    if (error) {

      console.error(error);

      alert('Failed to delete event');

    } else {

      setEvents(
        events.filter(
          (event) =>
            event.id !== id
        )
      );

    }

  };



  return (

    <div className="space-y-6 pb-12">

      <AdminHeader

        title="Events Management"

        subtitle="Create, manage, and monitor SciComS events."

      />


      <div className="px-6 space-y-6">


        {/* TOP BAR */}

        <div className="flex justify-between items-center bg-white p-4 border border-slate-200">


          <div className="text-xs text-slate-500">

            Total Events:

            <strong className="text-[#00113a] ml-1">

              {events.length}

            </strong>

          </div>


          <button

            onClick={() =>
              setModalOpen(true)
            }

            className="px-4 py-2 bg-[#002366] text-white text-xs font-bold flex items-center gap-2"

          >

            <Plus className="w-4 h-4" />

            Create Event

          </button>


        </div>



        {/* EVENTS TABLE */}

        <div className="bg-white border border-slate-200 overflow-x-auto">


          {loading ? (

            <div className="py-20 flex justify-center">

              <Loader2 className="animate-spin text-[#002366]" />

            </div>

          ) : (

            <table className="w-full text-left text-xs">


              <thead>

                <tr className="border-b bg-slate-50 text-slate-400 uppercase">

                  <th className="p-4">

                    Event

                  </th>

                  <th className="p-4">

                    Category

                  </th>

                  <th className="p-4">

                    Date

                  </th>

                  <th className="p-4">

                    Location

                  </th>

                  <th className="p-4">

                    Capacity

                  </th>

                  <th className="p-4">

                    Status

                  </th>

                  <th className="p-4 text-right">

                    Actions

                  </th>

                </tr>

              </thead>



              <tbody>


                {events.map(
                  (event) => (

                    <tr

                      key={event.id}

                      className="border-b hover:bg-slate-50"

                    >

                      <td className="p-4 font-bold text-[#00113a]">

                        {event.title}

                      </td>


                      <td className="p-4">

                        {event.category}

                      </td>


                      <td className="p-4">

                        {event.event_date || 'TBA'}

                      </td>


                      <td className="p-4">

                        {event.location || 'TBA'}

                      </td>


                      <td className="p-4">

                        {event.capacity || 'Unlimited'}

                      </td>


                      <td className="p-4">

                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 text-[10px] font-bold">

                          {event.status}

                        </span>

                      </td>


                      <td className="p-4 text-right">

                        <button

                          onClick={() =>
                            handleDelete(
                              event.id
                            )
                          }

                          className="text-red-600"

                        >

                          <Trash2 className="w-4 h-4" />

                        </button>

                      </td>

                    </tr>

                  )
                )}


              </tbody>


            </table>

          )}


        </div>


      </div>



      {/* CREATE EVENT MODAL */}

      {modalOpen && (

        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">


          <div className="bg-white w-full max-w-md p-6">


            <h2 className="text-lg font-bold text-[#00113a] mb-5">

              Create New Event

            </h2>


            <form

              onSubmit={handleCreate}

              className="space-y-4"

            >


              <input

                required

                value={title}

                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }

                placeholder="Event Title"

                className="w-full border p-3 text-sm"

              />


              <select

                value={category}

                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }

                className="w-full border p-3 text-sm"

              >

                <option>

                  Workshop

                </option>

                <option>

                  Symposium

                </option>

                <option>

                  Conference

                </option>

                <option>

                  Seminar

                </option>

                <option>

                  Science Fair

                </option>

              </select>


              <input

                type="date"

                value={eventDate}

                onChange={(e) =>
                  setEventDate(
                    e.target.value
                  )
                }

                className="w-full border p-3 text-sm"

              />


              <input

                value={location}

                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }

                placeholder="Event Location"

                className="w-full border p-3 text-sm"

              />


              <input

                type="number"

                value={capacity}

                onChange={(e) =>
                  setCapacity(
                    e.target.value
                  )
                }

                placeholder="Capacity"

                className="w-full border p-3 text-sm"

              />


              <div className="flex justify-end gap-3">


                <button

                  type="button"

                  onClick={() =>
                    setModalOpen(false)
                  }

                  className="px-4 py-2 border"

                >

                  Cancel

                </button>


                <button

                  disabled={creating}

                  className="px-4 py-2 bg-[#002366] text-white"

                >

                  {creating

                    ? 'Creating...'

                    : 'Publish Event'

                  }

                </button>


              </div>


            </form>


          </div>


        </div>

      )}


    </div>

  );

}