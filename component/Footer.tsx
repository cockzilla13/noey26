/*
export default function Footer() {
  return (
    <footer className="bg-[#556B5D] text-white py-16 text-center">

      <h2 className="text-4xl font-serif">
        Donald Kevin ❤️ Marie
      </h2>

      <p className="mt-6">
        Merci de partager ce moment inoubliable avec nous.
      </p>

      <p className="mt-4 text-sm opacity-80">
        12 décembre 2026 • Mpolongwe, Kribi
      </p>

    </footer>
  );
}
*/

"use client";

import { useEffect, useState } from "react";
import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";

export default function Footer() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Correction : role est une chaîne ou null, pas un boolean
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier la session actuelle
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      if (session?.user) {
        const userRole = await getUserRole();

        setRole(userRole);
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    getSession();

    // Écouter connexion / déconnexion
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        // Si l'utilisateur est déconnecté,
        // on supprime également son rôle
        if (!session?.user) {
          setRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(
        "Erreur de déconnexion :",
        error
      );
    } else {
      setUser(null);
      setRole(null);
    }

    setLoading(false);
  }

  return (
    <footer className="bg-[#556B5D] px-6 py-16 text-center text-white">

      <div className="mx-auto max-w-5xl">

        {/* Logo / noms */}
        <h2 className="font-serif text-3xl sm:text-4xl">
          Donald Kevin{" "}
          <span className="text-[#D8C7A3]">
            ❤️
          </span>{" "}
          Marie
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-7 text-white/80 sm:text-base">
          Merci de partager ce moment inoubliable
          avec nous.
        </p>

        <p className="mt-4 text-sm text-white/60">
          12 décembre 2026 • Mpolongwe, Kribi
        </p>

        {/* Séparateur */}
        <div className="mx-auto my-10 h-px w-full max-w-md bg-white/20" />

        {/* Connexion / déconnexion */}
        {!loading && (
          <div className="flex justify-center">

            {!user ? (
              <a
                href="/checkin/login"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/30
                  bg-white/10
                  px-7
                  py-3
                  text-sm
                  font-medium
                  backdrop-blur-xl
                  transition
                  hover:bg-white/20
                  hover:scale-105
                "
              >
                <LogIn size={18} />

                Connexion
              </a>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/30
                  bg-white/10
                  px-7
                  py-3
                  text-sm
                  font-medium
                  backdrop-blur-xl
                  transition
                  hover:bg-red-500/20
                  hover:scale-105
                "
              >
                <LogOut size={18} />

                Déconnexion
              </button>
            )}

          </div>
        )}

        {/* Administration / espace staff */}
        {user && role && (
          <a
            href={
              role === "super_admin"
                ? "/admin"
                : "/checkin/staff"
            }
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              text-xs
              text-white/60
              transition
              hover:text-white
            "
          >
            <ShieldCheck size={15} />

            {role === "super_admin"
              ? "Espace administration"
              : "Espace Staff"}
          </a>
        )}

        {/* Copyright */}
        <p className="mt-10 text-xs text-white/40">
          © 2026 Donald Kevin Tech
        </p>

      </div>

    </footer>
  );
}