import { createClient } from '@/lib/supabase/server';

export async function getAdminUser() {
  const supabase = await createClient();

  /*
  ==========================================
  GET AUTHENTICATED USER
  ==========================================
  */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  /*
  ==========================================
  VERIFY ADMIN RECORD
  ==========================================
  */

  const { data: admin, error: adminError } =
    await supabase
      .from('admin_users')
      .select('id, email, role')
      .eq('id', user.id)
      .maybeSingle();

  if (adminError || !admin) {
    return null;
  }

  return {
    user,
    admin,
  };
}