'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

import {
  LockKeyhole,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      // ============================================
      // STEP 1 — Authenticate User
      // ============================================

      console.log('Starting login...');

      const {
        data,
        error: loginError,
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log('LOGIN USER:', data.user);
      console.log('LOGIN SESSION:', data.session);
      console.log('LOGIN ERROR:', loginError);

      // Login failed
      if (loginError) {
        console.error('LOGIN FAILED:', loginError);

        setError(loginError.message);
        return;
      }

      // No authenticated user
      if (!data.user) {
        console.error('NO USER RETURNED AFTER LOGIN');

        setError(
          'Unable to authenticate this account. Please try again.'
        );

        return;
      }

      // ============================================
      // STEP 6A — Verify Session
      // ============================================

      console.log('Checking authentication session...');

      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log('SESSION DATA:', sessionData);
      console.log('SESSION ERROR:', sessionError);

      if (sessionError || !sessionData.session) {
        console.error(
          'SESSION CREATION FAILED:',
          sessionError
        );

        setError(
          'Login succeeded, but the authentication session could not be created.'
        );

        return;
      }

      // ============================================
      // STEP 6B — Check Admin Database Record
      // ============================================

      console.log(
        'Checking admin_users table for:',
        data.user.id
      );

      const {
        data: adminUser,
        error: adminError,
      } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('id', data.user.id)
        .maybeSingle();

      console.log('ADMIN USER:', adminUser);
      console.log('ADMIN ERROR:', adminError);

      // Database error
      if (adminError) {
        console.error(
          'ADMIN DATABASE CHECK ERROR:',
          adminError
        );

        setError(
          `Unable to verify administrator access: ${adminError.message}`
        );

        return;
      }

      // User does not exist in admin_users
      if (!adminUser) {
        console.error(
          'ADMIN RECORD NOT FOUND FOR USER:',
          data.user.id
        );

        await supabase.auth.signOut();

        setError(
          'Access denied. This account is not registered as a SciComS administrator.'
        );

        return;
      }

      // ============================================
      // Verify Administrator Role
      // ============================================

      console.log(
        'ADMIN ROLE:',
        adminUser.role
      );

      if (adminUser.role !== 'admin') {
        console.error(
          'INVALID ADMIN ROLE:',
          adminUser.role
        );

        await supabase.auth.signOut();

        setError(
          'Access denied. Administrator privileges are required.'
        );

        return;
      }

      // ============================================
      // LOGIN SUCCESSFUL
      // ============================================

      console.log(
        '===================================='
      );

      console.log(
        'ADMIN LOGIN SUCCESSFUL'
      );

      console.log(
        'USER ID:',
        data.user.id
      );

      console.log(
        'ROLE:',
        adminUser.role
      );

      console.log(
        '===================================='
      );

      // Small delay to ensure browser stores auth cookies
      router.replace('/admin');
      router.refresh();

    } catch (error) {

      console.error(
        'LOGIN SYSTEM ERROR:',
        error
      );

      setError(
        'Something went wrong during login. Please try again.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white border border-[#00113a]/10 shadow-xl rounded-sm overflow-hidden">

          {/* Header */}
          <div className="bg-[#00113a] px-8 py-8 text-center">

            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">

              <LockKeyhole className="w-6 h-6 text-white" />

            </div>

            <p className="text-[#d4b54a] text-[10px] uppercase tracking-[0.25em] font-bold mb-2">

              Secure Administration

            </p>

            <h1 className="font-serif text-3xl font-bold text-white">

              SciComS Portal

            </h1>

            <p className="text-xs text-slate-300 mt-2">

              Administrator Authentication

            </p>

          </div>


          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="p-8 space-y-5"
          >

            {/* Error Message */}
            {error && (

              <div className="flex gap-2 bg-red-50 border border-red-200 text-red-700 p-3 text-xs rounded-sm">

                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />

                <span>{error}</span>

              </div>

            )}


            {/* Email */}
            <div>

              <label className="block text-xs font-bold text-[#00113a] mb-2">

                Administrator Email

              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-sm text-sm outline-none focus:border-[#002366] focus:ring-1 focus:ring-[#002366]"
                />

              </div>

            </div>


            {/* Password */}
            <div>

              <label className="block text-xs font-bold text-[#00113a] mb-2">

                Password

              </label>

              <div className="relative">

                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-sm text-sm outline-none focus:border-[#002366] focus:ring-1 focus:ring-[#002366]"
                />

              </div>

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#002366] hover:bg-[#00113a] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
            >

              {loading ? (

                <>
                  <Loader2 className="w-4 h-4 animate-spin" />

                  Authenticating...

                </>

              ) : (

                'Sign In to Admin Portal'

              )}

            </button>

          </form>


          {/* Footer */}
          <div className="border-t border-slate-100 px-8 py-4 text-center">

            <p className="text-[10px] text-slate-400">

              Secure access for authorized SciComS administrators only.

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}