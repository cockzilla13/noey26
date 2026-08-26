"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { exportExcel } from "@/lib/exportExcel";

export default function AdminRsvpsPage() {

  const [rsvps, setRsvps] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadRsvps() {

    const { data, error } =
      await supabase
        .from("rsvps")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (!error) {
      setRsvps(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {

    loadRsvps();

    const channel =
      supabase
        .channel("admin-rsvps")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rsvps",
          },
          () => {
            loadRsvps();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };

  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Chargement...
      </div>
    );
  }

  return (

    <main className="p-8">

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        RSVP Invités
      </h1>
<button
 onClick={() =>
  exportExcel(
   rsvps,
   "Liste_Invites"
  )
 }
 className="
 bg-[#A8B5A2]
 text-white
 px-4
 py-2
 rounded-xl
 mb-6
 "
>
 📥 Export RSVP
</button>
      <div
        className="
        overflow-x-auto
        rounded-2xl
        border
        "
      >

       <div
 className="
 grid
 md:grid-cols-4
 gap-4
 mb-8
 "
>

 <div className="p-4 rounded-xl border">
  👥 RSVP
  <br />
  <strong>
   {rsvps.length}
  </strong>
 </div>

 <div className="p-4 rounded-xl border">
  ✅ Présents
  <br />
  <strong>
   {
    rsvps.filter(
     r => r.checked_in
    ).length
   }
  </strong>
 </div>

 <div className="p-4 rounded-xl border">
  ❤️ Confirmés
  <br />
  <strong>
   {
    rsvps.filter(
     r => r.attending
    ).length
   }
  </strong>
 </div>

 <div className="p-4 rounded-xl border">
  🍽️ Personnes
  <br />
  <strong>
   {
    rsvps.reduce(
      (sum, r) =>
        sum +
        (r.guests_count || 1),
      0
    )
   }
  </strong>
 </div>

</div>
        <table
          className="
          w-full
          text-left
          "
        >

          <thead
            className="
            bg-[#A8B5A2]
            text-white
            "
          >

            <tr>

              <th className="p-4">
                Nom
              </th>

              <th className="p-4">
                Téléphone
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Présence
              </th>

              <th className="p-4">
                Invités
              </th>

              <th className="p-4">
                Check-in
              </th>

              <th className="p-4">
                Code
              </th>

            </tr>

          </thead>

          <tbody>

            {rsvps.map((rsvp) => (

              <tr
                key={rsvp.id}
                className="
                border-t
                "
              >

                <td className="p-4">
                  {rsvp.first_name}
                  {" "}
                  {rsvp.last_name}
                </td>

                <td className="p-4">
                  {rsvp.phone}
                </td>

                <td className="p-4">
                  {rsvp.email}
                </td>

                <td className="p-4">

                  {rsvp.attending
                    ? "✅ Oui"
                    : "❌ Non"}

                </td>

                <td className="p-4">
                  {rsvp.guests_count}
                </td>

                <td className="p-4">

                  {rsvp.checked_in
                    ? "🟢 Présent"
                    : "⚪ Non"}
                </td>

                <td className="p-4">
                  {rsvp.invitation_code}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>

  );

}