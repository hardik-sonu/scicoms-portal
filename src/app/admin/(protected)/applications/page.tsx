'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AdminHeader from '@/components/admin/AdminHeader';

import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Loader2,
  RefreshCw,
  Hash,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  Lightbulb,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

/*
==========================================
MEMBERSHIP APPLICATION TYPE
==========================================
*/

type Application = {
  id: string;

  application_reference: string;

  full_name: string;

  email: string;

  phone: string | null;

  university: string | null;

  department: string | null;

  student_id: string | null;

  semester: string | null;

  interest_area: string | null;

  motivation: string | null;

  status: string | null;

  created_at: string | null;
};

export default function AdminApplicationsPage() {
  const supabase = useMemo(() => createClient(), []);

  /*
  ==========================================
  STATES
  ==========================================
  */

  const [apps, setApps] = useState<Application[]>([]);

  const [selectedApp, setSelectedApp] =
    useState<Application | null>(null);

  const [statusFilter, setStatusFilter] =
    useState<string>('All');

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string>('');

  /*
  ==========================================
  FETCH MEMBERSHIP APPLICATIONS
  ==========================================
  */

  const fetchApplications = useCallback(async () => {
    setLoading(true);

    setErrorMessage('');

    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

    if (error) {
      console.error(
        'Error fetching membership applications:',
        error
      );

      setErrorMessage(
        `Could not load applications: ${error.message}`
      );

      setApps([]);
    } else {
      setApps(data || []);
    }

    setLoading(false);
  }, [supabase]);

  /*
  ==========================================
  LOAD DATA
  ==========================================
  */

  useEffect(() => {
    void Promise.resolve().then(fetchApplications);
  }, [fetchApplications]);

  /*
  ==========================================
  UPDATE APPLICATION STATUS
  ==========================================
  */

  const handleUpdateStatus = async (
    id: string,
    newStatus: string
  ) => {
    setUpdating(id);

    setErrorMessage('');

    const { error } = await supabase
      .from('memberships')
      .update({
        status: newStatus,
      })
      .eq('id', id);

    if (error) {
      console.error(
        'Error updating membership application:',
        error
      );

      setErrorMessage(
        `Failed to update application: ${error.message}`
      );
    } else {
      /*
      Update table immediately
      */

      setApps((currentApps) =>
        currentApps.map((app) =>
          app.id === id
            ? {
                ...app,
                status: newStatus,
              }
            : app
        )
      );

      /*
      Update details panel
      */

      setSelectedApp((current) =>
        current && current.id === id
          ? {
              ...current,
              status: newStatus,
            }
          : current
      );
    }

    setUpdating(null);
  };

  /*
  ==========================================
  FILTER APPLICATIONS
  ==========================================
  */

  const filteredApps = apps.filter((app) => {
    if (statusFilter === 'All') {
      return true;
    }

    return (
      (app.status || 'Pending') ===
      statusFilter
    );
  });

  /*
  ==========================================
  STATUS STYLE
  ==========================================
  */

  const getStatusStyle = (
    status: string | null
  ) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';

      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';

      case 'Rejected':
        return 'bg-red-100 text-red-800';

      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  /*
  ==========================================
  FORMAT DATE
  ==========================================
  */

  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return 'Unknown';
    }

    return new Date(
      date
    ).toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /*
  ==========================================
  PAGE
  ==========================================
  */

  return (
    <div className="space-y-6 pb-12">
      <AdminHeader
        title="Membership Applications"
        subtitle="Review and manage membership applications submitted through the SciComS website."
      />

      <div className="px-6 space-y-6">

        {/* ERROR MESSAGE */}

        {errorMessage && (
          <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs">
            {errorMessage}
          </div>
        )}

        {/* FILTERS */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-sm border border-slate-200 shadow-xs">

          {/* STATUS FILTERS */}

          <div className="flex flex-wrap gap-2">

            {[
              'All',
              'Pending',
              'Interview Scheduled',
              'Approved',
              'Rejected',
            ].map((status) => (

              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-colors ${
                  statusFilter === status
                    ? 'bg-[#002366] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>

            ))}

          </div>

          {/* APPLICATION COUNT + REFRESH */}

          <div className="flex items-center gap-4">

            <div className="text-xs text-slate-500 font-mono">
              Showing{' '}
              <strong className="text-[#00113a]">
                {filteredApps.length}
              </strong>{' '}
              applications
            </div>

            <button
              onClick={() =>
                void fetchApplications()
              }
              disabled={loading}
              className="p-2 border border-slate-200 hover:bg-slate-50 text-[#002366] disabled:opacity-50"
              title="Refresh Applications"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  loading
                    ? 'animate-spin'
                    : ''
                }`}
              />
            </button>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* APPLICATION TABLE */}

          <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 shadow-xs overflow-x-auto">

            {loading ? (

              <div className="py-20 flex justify-center">
                <Loader2 className="w-7 h-7 animate-spin text-[#002366]" />
              </div>

            ) : filteredApps.length === 0 ? (

              <div className="py-20 text-center">

                <UserCheck className="w-10 h-10 mx-auto text-slate-300 mb-3" />

                <p className="text-sm text-slate-400">
                  No membership applications found.
                </p>

              </div>

            ) : (

              <table className="w-full text-left text-xs">

                <thead>

                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-mono text-[10px] uppercase">

                    <th className="p-4">
                      Reference
                    </th>

                    <th className="p-4">
                      Applicant
                    </th>

                    <th className="p-4">
                      Department
                    </th>

                    <th className="p-4">
                      Status
                    </th>

                    <th className="p-4 text-right">
                      View
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredApps.map((app) => (

                    <tr
                      key={app.id}
                      onClick={() =>
                        setSelectedApp(app)
                      }
                      className={`cursor-pointer transition-colors ${
                        selectedApp?.id === app.id
                          ? 'bg-[#eff4ff]'
                          : 'hover:bg-slate-50'
                      }`}
                    >

                      {/* REFERENCE */}

                      <td className="p-4">

                        <div className="font-mono text-[10px] text-[#705d00] font-bold">
                          {app.application_reference}
                        </div>

                      </td>

                      {/* APPLICANT */}

                      <td className="p-4">

                        <div className="font-bold text-[#00113a]">
                          {app.full_name}
                        </div>

                        <div className="text-[11px] text-slate-400">
                          {app.email}
                        </div>

                      </td>

                      {/* DEPARTMENT */}

                      <td className="p-4 text-slate-600">
                        {app.department ||
                          'Not provided'}
                      </td>

                      {/* STATUS */}

                      <td className="p-4">

                        <span
                          className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${getStatusStyle(
                            app.status
                          )}`}
                        >
                          {app.status ||
                            'Pending'}
                        </span>

                      </td>

                      {/* VIEW */}

                      <td className="p-4 text-right">

                        <Eye className="w-4 h-4 text-[#002366] inline" />

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

          {/* APPLICATION DETAILS */}

          <div className="bg-white rounded-sm border border-slate-200 shadow-xs p-6 space-y-4">

            {selectedApp ? (

              <div className="space-y-5 text-xs">

                {/* HEADER */}

                <div className="border-b border-slate-100 pb-4">

                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">

                    <Hash className="w-3 h-3" />

                    Application Reference

                  </div>

                  <p className="text-sm font-bold text-[#705d00] mt-1 font-mono">

                    {selectedApp.application_reference}

                  </p>

                  <h3 className="font-serif font-bold text-lg text-[#00113a] mt-4">

                    {selectedApp.full_name}

                  </h3>

                  <div className="mt-2 space-y-1">

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">

                      <Mail className="w-3 h-3" />

                      {selectedApp.email}

                    </div>

                    {selectedApp.phone && (

                      <div className="flex items-center gap-2 text-[11px] text-slate-500">

                        <Phone className="w-3 h-3" />

                        {selectedApp.phone}

                      </div>

                    )}

                  </div>

                </div>

                {/* ACADEMIC DETAILS */}

                <div className="space-y-3">

                  <div className="flex items-start gap-2">

                    <Building2 className="w-3.5 h-3.5 text-[#002366] mt-0.5" />

                    <div>

                      <span className="text-slate-500 block">
                        University
                      </span>

                      <strong>
                        {selectedApp.university ||
                          'Not provided'}
                      </strong>

                    </div>

                  </div>

                  <div className="flex items-start gap-2">

                    <GraduationCap className="w-3.5 h-3.5 text-[#002366] mt-0.5" />

                    <div>

                      <span className="text-slate-500 block">
                        Department
                      </span>

                      <strong>
                        {selectedApp.department ||
                          'Not provided'}
                      </strong>

                    </div>

                  </div>

                  <div>

                    <span className="text-slate-500">
                      Student ID:
                    </span>

                    <strong className="ml-1">
                      {selectedApp.student_id ||
                        'Not provided'}
                    </strong>

                  </div>

                  <div>

                    <span className="text-slate-500">
                      Semester:
                    </span>

                    <strong className="ml-1">
                      {selectedApp.semester ||
                        'Not provided'}
                    </strong>

                  </div>

                  <div>

                    <span className="text-slate-500">
                      Submitted:
                    </span>

                    <strong className="ml-1">
                      {formatDate(
                        selectedApp.created_at
                      )}
                    </strong>

                  </div>

                </div>

                {/* INTEREST AREA */}

                <div className="border-t border-slate-100 pt-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Lightbulb className="w-3.5 h-3.5 text-[#705d00]" />

                    <span className="font-bold text-[#00113a]">
                      Area of Interest
                    </span>

                  </div>

                  <p className="p-3 bg-[#fffdf5] border border-[#f1e7b8] text-slate-700 leading-relaxed">

                    {selectedApp.interest_area ||
                      'Not provided'}

                  </p>

                </div>

                {/* MOTIVATION */}

                <div>

                  <span className="font-bold text-[#00113a] block mb-2">

                    Motivation Statement

                  </span>

                  <p className="p-3 bg-[#f8f9ff] border border-slate-100 text-slate-700 leading-relaxed">

                    {selectedApp.motivation ||
                      'No motivation statement provided.'}

                  </p>

                </div>

                {/* ADMIN ACTIONS */}

                <div className="pt-4 border-t border-slate-100">

                  <div className="font-bold text-[#00113a] mb-3">

                    Admin Decision

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    {/* APPROVE */}

                    <button
                      disabled={
                        updating === selectedApp.id
                      }
                      onClick={() =>
                        void handleUpdateStatus(
                          selectedApp.id,
                          'Approved'
                        )
                      }
                      className="py-2 bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center justify-center gap-1 disabled:opacity-50"
                    >

                      <CheckCircle2 className="w-3.5 h-3.5" />

                      Approve

                    </button>

                    {/* INTERVIEW */}

                    <button
                      disabled={
                        updating === selectedApp.id
                      }
                      onClick={() =>
                        void handleUpdateStatus(
                          selectedApp.id,
                          'Interview Scheduled'
                        )
                      }
                      className="py-2 bg-[#002366] text-white font-bold hover:bg-[#00113a] flex items-center justify-center gap-1 disabled:opacity-50"
                    >

                      <Clock className="w-3.5 h-3.5" />

                      Interview

                    </button>

                  </div>

                  {/* REJECT */}

                  <button
                    disabled={
                      updating === selectedApp.id
                    }
                    onClick={() =>
                      void handleUpdateStatus(
                        selectedApp.id,
                        'Rejected'
                      )
                    }
                    className="w-full mt-2 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-bold disabled:opacity-50"
                  >

                    <XCircle className="w-3.5 h-3.5 inline mr-1" />

                    Reject Application

                  </button>

                  {/* LOADING */}

                  {updating === selectedApp.id && (

                    <div className="flex justify-center mt-3">

                      <Loader2 className="w-4 h-4 animate-spin text-[#002366]" />

                    </div>

                  )}

                </div>

              </div>

            ) : (

              <div className="text-center py-16 text-slate-400 space-y-2">

                <UserCheck className="w-8 h-8 mx-auto text-slate-300" />

                <p>
                  Select an application to inspect its details.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}