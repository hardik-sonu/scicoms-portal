import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAdminUser();

  /*
  ==========================================
  NOT LOGGED IN
  ==========================================
  */

  if (!adminUser) {
    redirect('/login');
  }

  /*
  ==========================================
  NOT AUTHORIZED
  ==========================================
  */

  if (adminUser.admin.role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}