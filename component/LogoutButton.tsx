"use client";

import { supabase }
from "@/lib/supabase";

export default function LogoutButton() {

 async function logout() {

  await supabase
   .auth
   .signOut();

  window.location.href =
   "/";

 }

 return (

  <button
   onClick={logout}
   className="
   bg-[#D8C29A]
   text-white
   px-4
   py-2
   rounded-xl
   "
  >
   Déconnexion
  </button>

 );

}