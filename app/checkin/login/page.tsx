"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/checkin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Accès équipe d'accueil
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-3 mb-4"
        />

        <button
          onClick={signIn}
          className="
            w-full
            bg-[#A8B5A2]
            text-white
            p-3
            rounded-xl
          "
        >
          Se connecter
        </button>

      </div>

    </main>
  );
}