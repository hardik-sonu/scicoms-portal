'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

export default function AdminLogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const supabase = createClient();

      console.log('Starting administrator logout...');

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('LOGOUT ERROR:', error);

        alert(
          'Unable to sign out. Please try again.'
        );

        return;
      }

      console.log('ADMIN LOGOUT SUCCESSFUL');

      // Refresh authentication state
      router.refresh();

      // Redirect administrator to login page
      router.replace('/admin/login');

    } catch (error) {
      console.error(
        'LOGOUT SYSTEM ERROR:',
        error
      );

      alert(
        'Something went wrong while signing out.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="
        w-full
        flex
        items-center
        gap-3
        px-5
        py-3
        text-xs
        font-bold
        uppercase
        tracking-wider
        text-red-300
        hover:text-red-200
        hover:bg-red-500/10
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-colors
      "
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />

          <span>
            Signing Out...
          </span>
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />

          <span>
            Sign Out
          </span>
        </>
      )}
    </button>
  );
}