"use client";

import Link from "next/link";

export default function AdminPage() {

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
          ✅ Check-in
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

      </div>

    </main>

  );

}