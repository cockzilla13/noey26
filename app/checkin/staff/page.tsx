/*"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";

export default function CheckinStaff() {

  const [loading, setLoading] =
    useState(true);

  const [userEmail, setUserEmail] =
    useState("");

  useEffect(() => {

    checkAuth();

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



async function checkAuth() {

  const {
    data: { session }
  } =
  await supabase.auth.getSession();

  if (!session) {

    window.location.href =
      "/checkin/login";

    return;

  }

  const role =
    await getUserRole();

  if (
    role !== "staff" &&
    role !== "super_admin"
  ) {

    await supabase.auth.signOut();

    window.location.href =
      "/checkin/login";

    return;

  }

  setUserEmail(
    session.user.email || ""
  );

  setLoading(false);

}

  async function logout() {

    await supabase.auth.signOut();

    window.location.href =
      "/";

  }

  if (loading) {

    return (

      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F8F5ED]
        "
      >

        <div
          className="
          text-[#435141]
          text-xl
          "
        >
          Vérification...
        </div>

      </main>

    );

  }

  return (

    <main
      className="
      min-h-screen
      bg-gradient-to-b
      from-[#F8F5ED]
      via-[#F4F2EB]
      to-[#E9F0E7]
      p-6
      "
    >

      <div
        className="
        max-w-4xl
        mx-auto
        "
      >

        <div
          className="
          rounded-[32px]
          border
          border-[#DDD8CF]
          bg-white/70
          backdrop-blur-xl
          p-8
          shadow-xl
          "
        >

          <h1
            className="
            text-4xl
            md:text-5xl
            text-center
            font-serif
            text-[#435141]
            "
          >
            💍 Espace Staff
          </h1>

          <p
            className="
            text-center
            mt-4
            text-[#6E6E66]
            "
          >
            Connecté : {userEmail}
          </p>

          <div
            className="
            mt-10
            grid
            gap-6
            md:grid-cols-2
            "
          >

            <Link
              href="/checkin"
              className="
              rounded-3xl
              bg-[#A8B5A2]
              text-white
              p-8
              text-center
              hover:scale-105
              transition
              shadow-lg
              "
            >
              <div className="text-5xl">
                📷
              </div>

              <div className="mt-4 text-xl">
                Scanner QR
              </div>
            </Link>

            <Link
              href="/checkin/list"
              className="
              rounded-3xl
              bg-[#C3A76A]
              text-white
              p-8
              text-center
              hover:scale-105
              transition
              shadow-lg
              "
            >
              <div className="text-5xl">
                📋
              </div>

              <div className="mt-4 text-xl">
                Liste Check-in
              </div>
            </Link>

          </div>

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

      </div>

    </main>

  );

}*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";

export default function CheckinStaff() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkAuth();

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

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/checkin/login";
      return;
    }

    const role = await getUserRole();

    if (
      role !== "staff" &&
      role !== "super_admin"
    ) {
      await supabase.auth.signOut();

      window.location.href = "/checkin/login";
      return;
    }

    setUserEmail(session.user.email || "");
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#F8F5ED] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#DDD8CF] border-t-[#435141]" />

          <p className="text-base font-medium text-[#435141] sm:text-lg">
            Vérification...
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
        bg-gradient-to-b
        from-[#F8F5ED]
        via-[#F4F2EB]
        to-[#E9F0E7]
        px-3
        py-5
        sm:px-5
        sm:py-8
        md:px-8
        lg:px-10
        xl:px-12
      "
    >
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-64px)]">
        <div
          className="
            w-full
            overflow-hidden
            rounded-[24px]
            border
            border-[#DDD8CF]
            bg-white/75
            p-4
            shadow-xl
            backdrop-blur-xl
            sm:rounded-[30px]
            sm:p-6
            md:rounded-[32px]
            md:p-8
            lg:p-10
          "
        >
          {/* HEADER */}
          <header className="text-center">
            <div className="mb-3 text-4xl sm:text-5xl">
              💍
            </div>

            <h1
              className="
                font-serif
                text-3xl
                font-semibold
                leading-tight
                text-[#435141]
                sm:text-4xl
                md:text-5xl
              "
            >
              Espace Staff
            </h1>

            <div className="mx-auto mt-4 max-w-full sm:max-w-xl">
              <p className="text-xs text-[#6E6E66] sm:text-sm">
                Connecté avec
              </p>

              <p className="mt-1 break-all text-sm font-medium text-[#435141] sm:text-base">
                {userEmail}
              </p>
            </div>
          </header>

          {/* ACTIONS PRINCIPALES */}
          <section className="mt-7 sm:mt-9 md:mt-10">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
              {/* SCANNER */}
              <Link
                href="/checkin"
                className="
                  group
                  flex
                  min-h-[190px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[24px]
                  bg-[#A8B5A2]
                  p-6
                  text-center
                  text-white
                  shadow-lg
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-[#98a691]
                  hover:shadow-xl
                  active:scale-[0.98]
                  sm:min-h-[210px]
                  sm:rounded-[28px]
                  sm:p-8
                  md:min-h-[230px]
                "
              >
                <div className="text-5xl transition-transform duration-200 group-hover:scale-110 sm:text-6xl">
                  📷
                </div>

                <div className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
                  Scanner QR
                </div>

                <p className="mt-2 max-w-[240px] text-xs leading-5 text-white/80 sm:text-sm">
                  Scanner le QR code d'une invitation
                </p>
              </Link>

              {/* LISTE */}
              <Link
                href="/checkin/list"
                className="
                  group
                  flex
                  min-h-[190px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[24px]
                  bg-[#C3A76A]
                  p-6
                  text-center
                  text-white
                  shadow-lg
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-[#b4965b]
                  hover:shadow-xl
                  active:scale-[0.98]
                  sm:min-h-[210px]
                  sm:rounded-[28px]
                  sm:p-8
                  md:min-h-[230px]
                "
              >
                <div className="text-5xl transition-transform duration-200 group-hover:scale-110 sm:text-6xl">
                  📋
                </div>

                <div className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
                  Liste Check-in
                </div>

                <p className="mt-2 max-w-[240px] text-xs leading-5 text-white/80 sm:text-sm">
                  Consulter les invités déjà enregistrés
                </p>
              </Link>
            </div>
          </section>

          {/* ACTIONS SECONDAIRES */}
          <section className="mt-6 border-t border-[#DDD8CF] pt-6 sm:mt-8 sm:pt-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <Link
                href="/"
                className="
                  flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#A8B5A2]
                  bg-white/50
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-[#435141]
                  transition
                  hover:bg-[#A8B5A2]
                  hover:text-white
                  active:scale-[0.98]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#A8B5A2]
                  focus:ring-offset-2
                  sm:text-base
                "
              >
                🏠 Retour Mariage
              </Link>

              <button
                type="button"
                onClick={logout}
                className="
                  flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-500
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-red-600
                  active:scale-[0.98]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  focus:ring-offset-2
                  sm:text-base
                "
              >
                🚪 Déconnexion
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <p className="mt-6 text-center text-[11px] text-[#8A8A82] sm:mt-8 sm:text-xs">
            Espace réservé au personnel autorisé
          </p>
        </div>
      </div>
    </main>
  );
}