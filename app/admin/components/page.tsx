"use client";

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

}