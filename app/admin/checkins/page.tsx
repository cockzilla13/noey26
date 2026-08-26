"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { exportExcel } from "@/lib/exportExcel";
import { exportWeddingReport } from "@/lib/exportWeddingReport";

export default function AdminCheckinsPage() {

  const [guests, setGuests] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  async function loadGuests() {

    const { data } =
      await supabase
        .from("rsvps")
        .select("*")
        .eq("checked_in", true)
        .order(
          "checked_in_at",
          {
            ascending: false,
          }
        );

    setGuests(data || []);

  }

  useEffect(() => {

    loadGuests();

    const channel =
      supabase
        .channel("admin-checkins")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rsvps",
          },
          () => {
            loadGuests();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };

  }, []);

  const filtered =
    guests.filter((g) =>
      (
        g.first_name +
        " " +
        g.last_name
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <main className="p-8">

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Présents
      </h1>

      <button
 onClick={() =>
  exportExcel(
   filtered,
   "Invites_Presents"
  )
 }
 className="
 bg-green-600
 text-white
 px-4
 py-2
 rounded-xl
 mb-6
 "
>
 📥 Export Présents
</button>

<button
 onClick={() =>
  exportWeddingReport(
   guests
  )
 }
 className="
 bg-[#D6C6A5]
 text-black
 px-4
 py-2
 rounded-xl
 "
>
 📊 Rapport Mariage
</button>
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }
        className="
        border
        p-3
        rounded-xl
        mb-6
        w-full
        "
      />

      <div
        className="
        p-4
        rounded-xl
        border
        mb-6
        "
      >
        ✅ Présents :
        {" "}
        {filtered.length}
      </div>

      <div
        className="
        overflow-x-auto
        rounded-2xl
        border
        "
      >

        <table className="w-full">

          <thead>

            <tr className="bg-[#A8B5A2] text-white">

              <th className="p-4">
                Nom
              </th>

              <th className="p-4">
                Invités
              </th>

              <th className="p-4">
                Heure
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((g) => (

              <tr
                key={g.id}
                className="border-t"
              >

                <td className="p-4">

                  {g.first_name}
                  {" "}
                  {g.last_name}

                </td>

                <td className="p-4">

                  {g.guests_count}

                </td>

                <td className="p-4">

                  {
                    new Date(
                      g.checked_in_at
                    ).toLocaleString(
                      "fr-CA"
                    )
                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>

  );

}