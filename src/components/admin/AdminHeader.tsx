import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif font-bold text-xl text-[#00113a] leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records..."
            className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#002366] w-56"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:text-[#00113a] hover:bg-slate-100 rounded-xs">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5"></span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#00113a] text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-[#00113a] leading-none">Syed M. Ahmad</div>
            <span className="text-[10px] text-[#705d00] font-medium">President / IMME</span>
          </div>
        </div>
      </div>
    </header>
  );
}
