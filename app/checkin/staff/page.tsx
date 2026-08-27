"use client";

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

}