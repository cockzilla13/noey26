"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";
import LogoutButton from "@/component/LogoutButton";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
	
	  // Empêche le retour arrière
    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handlePopState = () => {

      window.history.pushState(
        null,
        "",
        window.location.href
      );

    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);

  async function checkAccess() {

    const userRole = await getUserRole();

    console.log("ADMIN - ROLE :", userRole);

    if (userRole !== "super_admin") {

      console.log("Accès admin refusé");

      window.location.href = "/";

      return;
    }

    setRole(userRole);
    setLoading(false);
  }

 async function logout() {

    await supabase.auth.signOut();

    window.location.href =
      "/";

  }
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <p className="text-[#556B5D]">
          Vérification des autorisations...
        </p>
      </main>
    );
  }

  return (

    <main
      className="
        min-h-screen
        p-8
        bg-[#FAF8F5]
      "
    >

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-[#B9A77C]">
              Espace privé
            </p>

            <h1 className="mt-2 text-4xl font-serif text-[#556B5D]">
              Dashboard Mariage
            </h1>

          </div>

          <LogoutButton />

 <div
            className="
            mt-10
            flex
            flex-col
            md:flex-row
            gap-4
            "
          >

            <Link
              href="/"
              className="
              flex-1
              text-center
              rounded-2xl
              border
              border-[#A8B5A2]
              py-4
              text-[#435141]
              hover:bg-[#A8B5A2]
              hover:text-white
              transition
              "
            >
              🏠 Retour Mariage
            </Link>

            <button
              onClick={logout}
              className="
              flex-1
              rounded-2xl
              bg-red-500
              text-white
              py-4
              hover:bg-red-600
              transition
              "
            >
              🚪 Déconnexion
            </button>

          </div>
        </div>

        <p className="mb-8 text-[#5E625B]">
          Connecté comme :{" "}
          <strong className="text-[#556B5D]">
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
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            👥 RSVP
          </Link>

          <Link
            href="/admin/checkins"
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            ✅ Check-ins
          </Link>

          <Link
            href="/admin/guestbook"
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            ❤️ Livre d'or
          </Link>

          <Link
            href="/admin/gallery"
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            📷 Galerie
          </Link>

          <Link
            href="/checkin"
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            ⬜ Check-in
          </Link>

          <Link
            href="/checkin/list"
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            ✅ Check-list
          </Link>

        </div>

      </div>

    </main>
  );
}