"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/auth";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {

    setLoading(true);
    setError("");
    const {
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {

      console.error(
        "Erreur connexion :",
        loginError
      );

      setError(
        "Email ou mot de passe incorrect."
      );

      setLoading(false);

      return;
    }

    // =========================
    // RÉCUPÉRATION DU RÔLE
    // =========================

    const role = await getUserRole();

    console.log("Rôle utilisateur :", role);

    if (!role) {

      await supabase.auth.signOut();

      setError(
        "Votre compte est connecté, mais vous n'avez aucune autorisation."
      );

      setLoading(false);

      return;
    }

    // =========================
    // REDIRECTION
    // =========================

if (role === "super_admin") {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      await supabase
        .from("login_logs")
        .insert({

          email:
            email,

          role:
            "super_admin",

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude

        });

      router.replace(
        "/admin"
      );

    },

    () => {

      router.replace(
        "/admin"
      );

    }

  );

  return;
}
    //if (role === "super_admin") {

     // router.replace("/admin");

    //  return;
   // }


if (role === "staff") {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      await supabase
        .from("login_logs")
        .insert({

          email:
            email,

          role:
            "staff",

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude

        });

      router.replace(
        "/checkin/staff"
      );

    },

    () => {

      router.replace(
        "/checkin/staff"
      );

    }

  );

  return;
}
   // if (role === "staff") {
     // alert(" redirection vers staff");
      //router.replace("/checkin/staff");
    //  window.location.href = "/checkin/staff";
     // return;
   // }

    // =========================
    // RÔLE INCONNU
    // =========================

    await supabase.auth.signOut();

    setError(
      "Rôle utilisateur non reconnu."
    );

    setLoading(false);
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F8F6F1]
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-[32px]
          bg-white
          p-8
          md:p-10
          shadow-2xl
        "
      >

        <div className="text-center mb-8">

          <p
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-[#B9A77C]
            "
          >
            Espace privé
          </p>

          <h1
            className="
              mt-3
              text-3xl
              font-serif
              text-[#556B5D]
            "
          >
            Accès équipe
          </h1>

        </div>

        <div className="space-y-5">

          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-[#5E625B]
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-[#DDD8CF]
                bg-[#FAF9F6]
                p-4
                outline-none
                focus:border-[#A8B5A2]
              "
            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-[#5E625B]
              "
            >
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signIn();
                }
              }}
              className="
                w-full
                rounded-2xl
                border
                border-[#DDD8CF]
                bg-[#FAF9F6]
                p-4
                outline-none
                focus:border-[#A8B5A2]
              "
            />

          </div>

          {error && (

            <div
              className="
                rounded-2xl
                bg-red-50
                border
                border-red-100
                p-4
                text-sm
                text-red-600
              "
            >
              {error}
            </div>

          )}

          <button
            onClick={signIn}
            disabled={loading}
            className="
              w-full
              rounded-full
              bg-[#A8B5A2]
              px-6
              py-4
              font-semibold
              text-white
              transition
              hover:bg-[#919F8A]
              disabled:opacity-50
            "
          >

            {loading
              ? "Vérification..."
              : "Se connecter"}

          </button>

        </div>

      </div>

    </main>
  );
}

