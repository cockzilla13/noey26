/*"use client";

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

}*/

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { exportExcel } from "@/lib/exportExcel";

export default function AdminRsvpsPage() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadRsvps() {
    setLoading(true);

    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setRsvps(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRsvps();

    const channel = supabase
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
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredRsvps = rsvps.filter((rsvp) => {
    const name = `${rsvp.first_name || ""} ${
      rsvp.last_name || ""
    }`.toLowerCase();

    const email = (rsvp.email || "").toLowerCase();
    const phone = (rsvp.phone || "").toLowerCase();
    const code = (rsvp.invitation_code || "").toLowerCase();

    const query = search.toLowerCase();

    return (
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      code.includes(query)
    );
  });

  const attendingCount = rsvps.filter(
    (r) => r.attending
  ).length;

  const checkedInCount = rsvps.filter(
    (r) => r.checked_in
  ).length;

  const totalPeople = rsvps.reduce(
    (sum, r) =>
      sum + (Number(r.guests_count) || 1),
    0
  );

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "fr-CA",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-3 py-5 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center">
          <div className="rounded-2xl border border-gray-200 bg-white px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#A8B5A2]" />

            <p className="text-sm text-gray-500 sm:text-base">
              Chargement des RSVP...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 md:px-8 lg:px-10 xl:px-12">
        {/* HEADER */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                💌 RSVP Invités
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Consultez et gérez les réponses de vos invités.
              </p>
            </div>

            {/* EXPORT */}
            <button
              type="button"
              onClick={() =>
                exportExcel(
                  rsvps,
                  "Liste_Invites"
                )
              }
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#A8B5A2]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#95a38f]
                active:bg-[#879580]
                focus:outline-none
                focus:ring-2
                focus:ring-[#A8B5A2]
                focus:ring-offset-2
                sm:w-auto
              "
            >
              📥 Export RSVP
            </button>
          </div>
        </header>

        {/* STATISTIQUES */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* RSVP */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                RSVP
              </p>

              <span className="text-xl sm:text-2xl">
                👥
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {rsvps.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              réponses reçues
            </p>
          </div>

          {/* PRESENTS */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-green-700 sm:text-sm">
                Présents
              </p>

              <span className="text-xl sm:text-2xl">
                ✅
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-green-800 sm:text-3xl">
              {checkedInCount}
            </p>

            <p className="mt-1 text-xs text-green-600">
              déjà arrivés
            </p>
          </div>

          {/* CONFIRMES */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-blue-700 sm:text-sm">
                Confirmés
              </p>

              <span className="text-xl sm:text-2xl">
                ❤️
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-blue-800 sm:text-3xl">
              {attendingCount}
            </p>

            <p className="mt-1 text-xs text-blue-600">
              réponses positives
            </p>
          </div>

          {/* PERSONNES */}
          <div className="rounded-2xl border border-[#D6C6A5] bg-[#D6C6A5]/20 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-600 sm:text-sm">
                Personnes
              </p>

              <span className="text-xl sm:text-2xl">
                🍽️
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {totalPeople}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              invités au total
            </p>
          </div>
        </section>

        {/* RECHERCHE */}
        <section className="mb-5 sm:mb-6">
          <label
            htmlFor="rsvp-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Rechercher un invité
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              id="rsvp-search"
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Nom, email, téléphone ou code..."
              className="
                min-h-12
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                pl-11
                pr-4
                text-sm
                text-gray-900
                shadow-sm
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#A8B5A2]
                focus:ring-2
                focus:ring-[#A8B5A2]/20
                sm:text-base
              "
            />
          </div>
        </section>

        {/* COMPTEUR */}
        <div className="mb-5 flex flex-col gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-700 sm:text-base">
            👥 {filteredRsvps.length}{" "}
            {filteredRsvps.length > 1
              ? "résultats"
              : "résultat"}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="w-fit text-xs font-medium text-[#71806c] hover:underline sm:text-sm"
            >
              Effacer la recherche
            </button>
          )}
        </div>

        {/* EMPTY */}
        {filteredRsvps.length === 0 && (
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <div>
              <div className="mb-4 text-5xl">
                {search ? "🔎" : "💌"}
              </div>

              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {search
                  ? "Aucun invité trouvé"
                  : "Aucun RSVP"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {search
                  ? "Aucun invité ne correspond à votre recherche."
                  : "Les réponses de vos invités apparaîtront ici."}
              </p>
            </div>
          </div>
        )}

        {/* ======================================== */}
        {/* MOBILE / TABLETTE : CARTES */}
        {/* ======================================== */}
        {filteredRsvps.length > 0 && (
          <div className="space-y-3 md:hidden">
            {filteredRsvps.map((rsvp) => (
              <article
                key={rsvp.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="p-4 sm:p-5">
                  {/* NOM + PRESENCE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-bold text-gray-900 sm:text-lg">
                        {rsvp.first_name}{" "}
                        {rsvp.last_name}
                      </h2>

                      <p className="mt-1 text-xs text-gray-400">
                        RSVP reçu
                      </p>
                    </div>

                    <span
                      className={`
                        shrink-0
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        ${
                          rsvp.attending
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {rsvp.attending
                        ? "✅ Oui"
                        : "❌ Non"}
                    </span>
                  </div>

                  {/* INFOS PRINCIPALES */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-400">
                        Invités
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {rsvp.guests_count || 1}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-400">
                        Check-in
                      </p>

                      <p
                        className={`mt-1 text-sm font-semibold ${
                          rsvp.checked_in
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {rsvp.checked_in
                          ? "🟢 Présent"
                          : "⚪ Non"}
                      </p>
                    </div>
                  </div>

                  {/* CONTACT */}
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    {rsvp.phone && (
                      <div className="flex min-w-0 gap-3">
                        <span className="shrink-0">
                          📱
                        </span>

                        <span className="break-all text-sm text-gray-600">
                          {rsvp.phone}
                        </span>
                      </div>
                    )}

                    {rsvp.email && (
                      <div className="flex min-w-0 gap-3">
                        <span className="shrink-0">
                          ✉️
                        </span>

                        <span className="break-all text-sm text-gray-600">
                          {rsvp.email}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CODE */}
                  <div className="mt-4 rounded-xl bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-400">
                      Code invitation
                    </p>

                    <p className="mt-1 break-all font-mono text-sm font-semibold text-gray-800">
                      {rsvp.invitation_code || "-"}
                    </p>
                  </div>

                  {/* CHECK-IN DATE */}
                  {rsvp.checked_in_at && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-400">
                        Arrivée
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {formatDate(
                          rsvp.checked_in_at
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ======================================== */}
        {/* DESKTOP : TABLE */}
        {/* ======================================== */}
        {filteredRsvps.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-[#A8B5A2] text-sm font-semibold text-white">
                  <tr>
                    <th className="px-5 py-4 lg:px-6">
                      Nom
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Téléphone
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Email
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Présence
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Invités
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Check-in
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Code
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="border-t border-gray-100 transition hover:bg-gray-50"
                    >
                      {/* NOM */}
                      <td className="px-5 py-4 lg:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A8B5A2]/20 text-sm font-bold text-[#71806c]">
                            {rsvp.first_name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <span className="font-medium text-gray-900">
                            {rsvp.first_name}{" "}
                            {rsvp.last_name}
                          </span>
                        </div>
                      </td>

                      {/* TELEPHONE */}
                      <td className="px-5 py-4 text-sm text-gray-600 lg:px-6">
                        {rsvp.phone || "-"}
                      </td>

                      {/* EMAIL */}
                      <td className="max-w-[240px] px-5 py-4 text-sm text-gray-600 lg:px-6">
                        <span className="block truncate">
                          {rsvp.email || "-"}
                        </span>
                      </td>

                      {/* PRESENCE */}
                      <td className="px-5 py-4 lg:px-6">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${
                              rsvp.attending
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {rsvp.attending
                            ? "✅ Oui"
                            : "❌ Non"}
                        </span>
                      </td>

                      {/* INVITES */}
                      <td className="px-5 py-4 lg:px-6">
                        <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                          {rsvp.guests_count || 1}
                        </span>
                      </td>

                      {/* CHECK-IN */}
                      <td className="px-5 py-4 lg:px-6">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${
                              rsvp.checked_in
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}
                        >
                          {rsvp.checked_in
                            ? "🟢 Présent"
                            : "⚪ Non"}
                        </span>
                      </td>

                      {/* CODE */}
                      <td className="px-5 py-4 lg:px-6">
                        <code className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                          {rsvp.invitation_code ||
                            "-"}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}