import { supabase } from "@/lib/supabase";

export async function getUserRole(): Promise<string | null> {

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("USER AUTH :", user);
  console.log("USER ERROR :", userError);

  if (userError || !user) {
    return null;
  }

  if (!user.email) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
    .from("admin_users")
    .select("role")
    .eq("email", user.email)
    .maybeSingle();

  console.log("ADMIN DATA :", data);
  console.log("ADMIN ERROR :", error);

  if (error) {
    return null;
  }

  console.log("ROLE FINAL :", data?.role);

  return data?.role ?? null;
}