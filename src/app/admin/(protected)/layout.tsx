import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // STEP 1 — Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User is not logged in
  if (!user) {
    redirect('/admin/login');
  }

  // STEP 2 — Verify administrator
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('id', user.id)
    .eq('role', 'admin')
    .maybeSingle();

  // User is not authorized
  if (error || !adminUser) {
    redirect('/admin/login');
  }

  // STEP 3 — Render protected admin dashboard
  return (
    <div className="min-h-screen bg-[#f6f8fc] flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}