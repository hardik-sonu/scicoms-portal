'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AdminLogoutButton from '@/app/admin/AdminLogoutButton';

import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  UserCheck,
  Users,
  MessageSquare,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: 'Dashboard Overview',
      href: '/admin',
      icon: LayoutDashboard,
    },

    {
      name: 'Events Management',
      href: '/admin/events',
      icon: CalendarCheck,
    },

    {
      name: 'Journal Management',
      href: '/admin/journal',
      icon: BookOpen,
    },

    {
      name: 'Applications Queue',
      href: '/admin/applications',
      icon: UserCheck,
    },

    {
      name: 'Member Roster',
      href: '/admin/members',
      icon: Users,
    },

    {
      name: 'Communications & Inbox',
      href: '/admin/communications',
      icon: MessageSquare,
    },

    {
      name: 'Academic Portal',
      href: '/admin/portal',
      icon: GraduationCap,
    },
  ];

  return (
    <aside className="w-64 bg-[#00113a] text-white border-r border-[#002366] flex flex-col min-h-screen shrink-0">

      {/* ========================================= */}
      {/* TOP SECTION */}
      {/* ========================================= */}

      <div>

        {/* ADMIN BRAND */}

        <div className="p-5 border-b border-[#002366] flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Logo */}

            <div className="w-8 h-8 rounded-sm bg-[#ffd700] text-[#00113a] font-bold flex items-center justify-center text-base">

              SC

            </div>

            {/* Brand Text */}

            <div>

              <h2 className="font-serif font-bold text-sm tracking-wide text-white">

                SciComS Admin

              </h2>

              <span className="text-[10px] text-[#ffd700] font-mono uppercase">

                Institutional Control

              </span>

            </div>

          </div>

        </div>


        {/* ========================================= */}
        {/* NAVIGATION */}
        {/* ========================================= */}

        <nav className="p-3 space-y-1 text-xs font-medium">

          {links.map((link) => {

            const Icon = link.icon;

            const active = pathname === link.href;

            return (

              <Link
                key={link.name}
                href={link.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  rounded-xs
                  transition-colors

                  ${
                    active
                      ? 'bg-[#002366] text-[#ffd700] font-bold border-l-3 border-[#ffd700]'
                      : 'text-slate-300 hover:bg-[#001c55] hover:text-white'
                  }
                `}
              >

                <Icon className="w-4 h-4 shrink-0" />

                <span>

                  {link.name}

                </span>

              </Link>

            );

          })}

        </nav>

      </div>


      {/* ========================================= */}
      {/* BOTTOM SECTION */}
      {/* ========================================= */}

      <div className="mt-auto border-t border-[#002366]">

        {/* LOGOUT */}

        <AdminLogoutButton />


        {/* PUBLIC PORTAL */}

        <div className="px-4 pb-4 pt-2 space-y-2">

          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-300
              hover:text-white
              px-2
              py-1.5
              rounded-xs
              hover:bg-[#002366]
              transition-colors
            "
          >

            <ArrowLeft className="w-4 h-4" />

            <span>

              Exit to Public Portal

            </span>

          </Link>


          {/* SERVER STATUS */}

          <div className="text-[10px] text-slate-500 px-2 font-mono">

            IMME PU Server v2.4 (Secure)

          </div>

        </div>

      </div>

    </aside>
  );
}