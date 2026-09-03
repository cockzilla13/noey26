/*"use client";

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
}*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { trackLogin }
from "@/lib/trackLogin";
export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

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

    if (userRole !== "super_admin") {
      window.location.href = "/";
      return;
    }

    setRole(userRole);
    setLoading(false);
  }

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#FAF8F5] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#DDD8CF] border-t-[#556B5D]" />

          <p className="text-sm font-medium text-[#556B5D] sm:text-base">
            Vérification des autorisations...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#FAF8F5]
        px-3
        py-5
        sm:px-5
        sm:py-7
        md:px-8
        lg:px-10
        xl:px-12
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div
            className="
              flex
              flex-col
              gap-5
              rounded-[24px]
              border
              border-[#E4DED4]
              bg-white
              p-4
              shadow-sm
              sm:rounded-[28px]
              sm:p-6
              md:p-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B9A77C] sm:text-xs sm:tracking-[0.3em]">
                Espace privé
              </p>

              <h1
                className="
                  mt-2
                  font-serif
                  text-2xl
                  leading-tight
                  text-[#556B5D]
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                "
              >
                Dashboard Mariage
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#777A73] sm:text-base">
                Gérez les invités, les check-ins, le livre d'or et
                la galerie.
              </p>
            </div>

            {/* DÉCONNEXION */}
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="
                flex
                min-h-11
                w-full
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-500
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-red-600
                active:bg-red-700
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              {loggingOut ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Déconnexion...
                </>
              ) : (
                <>🚪 Déconnexion</>
              )}
            </button>
          </div>
        </header>

        {/* INFORMATIONS ADMIN */}
        <section
          className="
            mb-6
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-[#DDD8CF]
            bg-[#F4F1EA]
            p-4
            sm:mb-8
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#8B8C84]">
              Session actuelle
            </p>

            <p className="mt-1 text-sm text-[#5E625B] sm:text-base">
              Connecté comme{" "}
              <strong className="font-semibold text-[#556B5D]">
                {role}
              </strong>
            </p>
          </div>

          <Link
            href="/#hero"
            className="
              flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-[#A8B5A2]
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#435141]
              transition
              hover:bg-[#A8B5A2]
              hover:text-white
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#A8B5A2]
              focus:ring-offset-2
              sm:w-auto
            "
          >
            🏠 Retour au mariage
          </Link>
        </section>

        {/* NAVIGATION */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#556B5D] sm:text-xl">
              Administration
            </h2>

            <p className="mt-1 text-sm text-[#777A73]">
              Choisissez une section à gérer.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              sm:gap-4
              lg:grid-cols-3
              lg:gap-5
            "
          >
            {/* RSVP */}
            <Link
              href="/admin/rsvps"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#E1DED7]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#A8B5A2]
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  👥
                </span>

                <span className="text-lg text-[#A8B5A2]">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  RSVP
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Gérer les réponses des invités
                </p>
              </div>
            </Link>

            {/* CHECK-INS */}
            <Link
              href="/admin/checkins"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#E1DED7]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-green-300
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  ✅
                </span>

                <span className="text-lg text-green-500">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  Check-ins
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Voir les invités présents
                </p>
              </div>
            </Link>

            {/* LIVRE D'OR */}
            <Link
              href="/admin/guestbook"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#E1DED7]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-pink-200
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  ❤️
                </span>

                <span className="text-lg text-pink-400">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  Livre d'or
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Modérer les messages
                </p>
              </div>
            </Link>

            {/* GALERIE */}
            <Link
              href="/admin/gallery"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#E1DED7]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-purple-200
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  📷
                </span>

                <span className="text-lg text-purple-400">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  Galerie
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Gérer les photos
                </p>
              </div>
            </Link>

            {/* CHECK-IN */}
            <Link
              href="/checkin"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#D6C6A5]
                bg-[#D6C6A5]/10
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:bg-[#D6C6A5]/20
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  📷
                </span>

                <span className="text-lg text-[#C3A76A]">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  Check-in
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Scanner une invitation
                </p>
              </div>
            </Link>

            {/* CHECK-LIST */}
            <Link
              href="/checkin/list"
              className="
                group
                flex
                min-h-[145px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-[#E1DED7]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#A8B5A2]
                hover:shadow-lg
                active:scale-[0.98]
                sm:min-h-[165px]
                sm:p-6
                lg:min-h-[180px]
              "
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110 sm:text-5xl">
                  📋
                </span>

                <span className="text-lg text-[#A8B5A2]">
                  →
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#435141] sm:text-xl">
                  Check-list
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888A83] sm:text-sm">
                  Consulter les arrivées
                </p>
              </div>
            </Link>
			<Link
 href="/admin/analytics"
 className="
 rounded-2xl
 border
 p-6
 "
>
 📊 Analytics
</Link>
			<Link
 href="/admin/components"
 className="
 rounded-2xl
 border
 p-6
 "
>
 📊 Composante
</Link>

<Link
 href="/admin/connections"
>
 🌍 Connexions
</Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-[#E1DED7] pt-5 text-center sm:mt-10">
          <p className="text-[11px] text-[#999A94] sm:text-xs">
            🔒 Espace d'administration réservé aux personnes
            autorisées
          </p>
        </footer>
      </div>
    </main>
  );
}