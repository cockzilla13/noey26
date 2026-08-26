import { supabase } from "@/lib/supabase";

export async function getUserRole() {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const email =
    session.user.email;

  const { data } =
    await supabase
      .from("admin_users")
      .select("role")
      .eq("email", email)
      .single();

  return data?.role || null;

}