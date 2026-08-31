"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import dynamicImport from "next/dynamic";
import { supabase } from "@/lib/supabase";

const ConnectionsMap = dynamicImport(
() => import("@/component/admin/ConnectionsMap"),
{
ssr: false,
}
);

export default function ConnectionsPage() {

const [logs, setLogs] =
useState<any[]>([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {

loadLogs();

}, []);

async function loadLogs() {

const { data, error } =
  await supabase
    .from("login_logs")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

if (error) {

  console.error(
    "Erreur chargement logs",
    error
  );

  return;

}

setLogs(data || []);

setLoading(false);

}

if (loading) {

return (

  <main
    className="
    min-h-screen
    flex
    items-center
    justify-center
    "
  >

    Chargement...

  </main>

);

}

return (

<main
  className="
  min-h-screen
  bg-[#F8F6F1]
  p-6
  "
>

  <div
    className="
    max-w-7xl
    mx-auto
    "
  >

    <h1
      className="
      text-4xl
      font-serif
      text-[#556B5D]
      mb-8
      "
    >
      🌍 Connexions
    </h1>

    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      p-4
      mb-8
      "
    >

      <ConnectionsMap
        logs={logs}
      />

    </div>

    <div
      className="
      overflow-auto
      bg-white
      rounded-3xl
      shadow-xl
      "
    >

      <table
        className="
        w-full
        "
      >

        <thead>

          <tr
            className="
            bg-[#A8B5A2]
            text-white
            "
          >

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Rôle
            </th>

            <th className="p-4">
              Latitude
            </th>

            <th className="p-4">
              Longitude
            </th>

            <th className="p-4">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {logs.map(
            (log) => (

            <tr
              key={log.id}
              className="
              border-b
              "
            >

              <td className="p-4">
                {log.email}
              </td>

              <td className="p-4">

                {log.role ===
                "super_admin"
                  ? "👑"
                  : "🟢"}

                {" "}

                {log.role}

              </td>

              <td className="p-4">
                {log.latitude}
              </td>

              <td className="p-4">
                {log.longitude}
              </td>

              <td className="p-4">

                {new Date(
                  log.created_at
                ).toLocaleString()

                }

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</main>

);

}