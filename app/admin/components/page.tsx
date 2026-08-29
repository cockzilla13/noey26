/*"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsCards() {

  const [stats, setStats] =
    useState({
      rsvps: 0,
      present: 0,
      guests: 0,
    });

  async function loadStats() {

    const { data } =
      await supabase
        .from("rsvps")
        .select("*");

    const rows = data || [];

    const present =
      rows.filter(
        r => r.checked_in
      ).length;

    const guests =
      rows.reduce(
        (sum, r) =>
          sum +
          (r.guests_count || 1),
        0
      );

    setStats({
      rsvps: rows.length,
      present,
      guests,
    });

  }

  useEffect(() => {

    loadStats();

    const channel =
      supabase
        .channel("admin-stats")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rsvps",
          },
          () => {
            loadStats();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, []);

  return (
    <div
      className="
      grid
      md:grid-cols-3
      gap-4
      mb-8
      "
    >

      <div className="p-5 rounded-xl border">
        👥 RSVP : {stats.rsvps}
      </div>

      <div className="p-5 rounded-xl border">
        ✅ Présents : {stats.present}
      </div>

      <div className="p-5 rounded-xl border">
        🍽️ Personnes : {stats.guests}
      </div>

    </div>
  );

}*/

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsCards() {
  const [stats, setStats] = useState({
    rsvps: 0,
    present: 0,
    guests: 0,
  });

  const [loading, setLoading] = useState(true);

  async function loadStats() {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*");

    if (error) {
      setLoading(false);
      return;
    }

    const rows = data || [];

    const present = rows.filter(
      (r) => r.checked_in
    ).length;

    const guests = rows.reduce(
      (sum, r) =>
        sum + (Number(r.guests_count) || 1),
      0
    );

    setStats({
      rsvps: rows.length,
      present,
      guests,
    });

    setLoading(false);
  }

  useEffect(() => {
    loadStats();

    const channel = supabase
      .channel("admin-stats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rsvps",
        },
        () => {
          loadStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section
      className="
        mb-6
        w-full
        sm:mb-8
      "
      aria-label="Statistiques des invités"
    >
      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          sm:gap-4
          lg:grid-cols-3
        "
      >
        {/* RSVP */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            sm:p-5
            lg:p-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 sm:text-sm">
                RSVP
              </p>

              {loading ? (
                <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-gray-200 sm:h-9" />
              ) : (
                <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stats.rsvps}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                réponses reçues
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#A8B5A2]/20
                text-xl
                sm:h-12
                sm:w-12
                sm:text-2xl
              "
            >
              👥
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#A8B5A2]" />
        </div>

        {/* PRESENTS */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-green-200
            bg-green-50
            p-4
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            sm:p-5
            lg:p-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-green-600 sm:text-sm">
                Présents
              </p>

              {loading ? (
                <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-green-200 sm:h-9" />
              ) : (
                <p className="mt-1 text-2xl font-bold text-green-800 sm:text-3xl">
                  {stats.present}
                </p>
              )}

              <p className="mt-1 text-xs text-green-600 sm:text-sm">
                invités arrivés
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-xl
                sm:h-12
                sm:w-12
                sm:text-2xl
              "
            >
              ✅
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500" />
        </div>

        {/* PERSONNES */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-[#D6C6A5]
            bg-[#D6C6A5]/15
            p-4
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            sm:p-5
            lg:p-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-600 sm:text-sm">
                Personnes
              </p>

              {loading ? (
                <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-[#D6C6A5]/40 sm:h-9" />
              ) : (
                <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stats.guests}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                invités au total
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#D6C6A5]/30
                text-xl
                sm:h-12
                sm:w-12
                sm:text-2xl
              "
            >
              🍽️
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#C3A76A]" />
        </div>
      </div>
    </section>
  );
}