"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import LogoutButton from "@/component/LogoutButton";

import {
  useEffect,
  useState
} from "react";

import {
  getUserRole
} from "@/lib/auth";

export default function AdminPage() {

const [loading, setLoading] =
useState(true);

const [role,setRole] =
useState("");

useEffect(() => {

  checkAccess();

  checkAdmin();
}, []);



async function checkAccess() {

  const role =
    await getUserRole();
    setRole(role);
  if (
    role !==
    "super_admin"
  ) {

    alert(
      "Accès refusé"
    );

    window.location.href =
      "/";

    return;
  }

  setLoading(false);

}
async function checkAdmin() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {

    window.location.href =
      "/checkin/login";

    return;
  }

  const email =
    session.user.email;

  const { data } =
    await supabase
      .from("checkin_staff")
      .select("*")
      .eq("email", email)
      .single();

  if (!data) {

    alert("Accès administrateur refusé");

    await supabase.auth.signOut();

    window.location.href =
      "/";

    return;
  }

  setLoading(false);

}

if (loading) {
  return (<div>Chargement...</div>);
}

  return (

    <main
      className="
      min-h-screen
      p-8
      bg-[#FAF8F5]
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-10
        "
      >
        Dashboard Mariage
      </h1>
	    <div className="mt-10">
         <LogoutButton/>
        </div>
       		<p className="mb-6">

 Connecté comme : 

 <strong>
  {role}
 </strong>

</p>
      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >

        <Link
          href="/admin/rsvps"
          className="p-6 rounded-2xl border"
        >
          👥 RSVP
        </Link>

        <Link
          href="/admin/checkins"
          className="p-6 rounded-2xl border"
        >
          ✅ Check-ins
        </Link>

        <Link
          href="/admin/guestbook"
          className="p-6 rounded-2xl border"
        >
          ❤️ Livre d'or
        </Link>

        <Link
          href="/admin/gallery"
          className="p-6 rounded-2xl border"
        >
          📷 Galerie
        </Link>
		
          <Link
          href="/checkin"
          className="p-6 rounded-2xl border"
        >
          ✅ Checkin
        </Link>
		
		 <Link
          href="/checkin/list"
          className="p-6 rounded-2xl border"
        >
          ✅ Check-list
        </Link>
      </div>

    </main>

  );

}