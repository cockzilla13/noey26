/*"use client";

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

}*/

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { exportExcel } from "@/lib/exportExcel";
import { exportWeddingReport } from "@/lib/exportWeddingReport";

export default function AdminCheckinsPage() {
  const [guests, setGuests] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadGuests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("checked_in", true)
      .order("checked_in_at", {
        ascending: false,
      });

    if (!error) {
      setGuests(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadGuests();

    const channel = supabase
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
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = guests.filter((g) => {
    const fullName = `${g.first_name || ""} ${g.last_name || ""}`;

    return fullName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const totalGuests = filtered.reduce(
    (total, guest) =>
      total + (Number(guest.guests_count) || 0),
    0
  );

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(date).toLocaleString("fr-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 md:px-8 lg:px-10 xl:px-12">
        {/* HEADER */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                👋 Présents
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                Consultez en temps réel les invités actuellement
                enregistrés comme présents.
              </p>
            </div>

            {/* STATISTIQUES */}
            {!loading && (
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-xs font-medium text-green-700">
                    Invités présents
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-800 sm:text-2xl">
                    {totalGuests}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-medium text-gray-500">
                    Réservations
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    {filtered.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ACTIONS */}
        <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:mb-6 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                exportExcel(
                  filtered,
                  "Invites_Presents"
                )
              }
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-xl
                bg-green-600
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-green-700
                active:bg-green-800
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                focus:ring-offset-2
                sm:w-auto
              "
            >
              📥 Export Présents
            </button>

            <button
              type="button"
              onClick={() =>
                exportWeddingReport(guests)
              }
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#D6C6A5]
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-900
                shadow-sm
                transition
                hover:bg-[#cbbb99]
                active:bg-[#bbaa88]
                focus:outline-none
                focus:ring-2
                focus:ring-[#D6C6A5]
                focus:ring-offset-2
                sm:w-auto
              "
            >
              📊 Rapport Mariage
            </button>
          </div>
        </section>

        {/* RECHERCHE */}
        <section className="mb-5 sm:mb-6">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Rechercher un invité
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              id="search"
              type="search"
              placeholder="Nom ou prénom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                focus:border-green-500
                focus:ring-2
                focus:ring-green-500/20
                sm:text-base
              "
            />
          </div>
        </section>

        {/* COMPTEUR */}
        {!loading && (
          <div className="mb-5 flex flex-col gap-1 rounded-xl border border-green-200 bg-green-50 px-4 py-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-green-800 sm:text-base">
              ✅ {filtered.length}{" "}
              {filtered.length > 1
                ? "invités enregistrés"
                : "invité enregistré"}
            </p>

            {search && (
              <p className="text-xs text-green-700 sm:text-sm">
                Recherche : « {search} »
              </p>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-sm text-gray-500">
                Chargement des invités...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div>
              <div className="mb-4 text-5xl">
                {search ? "🔎" : "👥"}
              </div>

              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {search
                  ? "Aucun invité trouvé"
                  : "Aucun invité présent"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {search
                  ? "Aucun invité ne correspond à votre recherche."
                  : "Les invités enregistrés comme présents apparaîtront ici."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* MOBILE / TABLETTE : CARTES */}
        {/* ========================================= */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3 md:hidden">
            {filtered.map((g) => (
              <article
                key={g.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="p-4">
                  {/* NOM */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-bold text-gray-900 sm:text-lg">
                        {g.first_name} {g.last_name}
                      </h2>

                      <p className="mt-1 text-xs text-gray-400">
                        Présent
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg">
                      ✓
                    </div>
                  </div>

                  {/* INFOS */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-400">
                        Invités
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {g.guests_count}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-400">
                        Heure
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {g.checked_in_at
                          ? new Date(
                              g.checked_in_at
                            ).toLocaleTimeString(
                              "fr-CA",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-400">
                      Arrivée
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {formatDate(g.checked_in_at)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* DESKTOP : TABLE */}
        {/* ========================================= */}
        {!loading && filtered.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="bg-[#A8B5A2] text-left text-sm font-semibold text-white">
                    <th className="px-5 py-4 lg:px-6">
                      Nom
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Invités
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Heure d'arrivée
                    </th>

                    <th className="px-5 py-4 lg:px-6">
                      Statut
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((g) => (
                    <tr
                      key={g.id}
                      className="border-t border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 lg:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                            ✓
                          </div>

                          <span className="font-medium text-gray-900">
                            {g.first_name}{" "}
                            {g.last_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 lg:px-6">
                        <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                          {g.guests_count}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 lg:px-6">
                        {formatDate(g.checked_in_at)}
                      </td>

                      <td className="px-5 py-4 lg:px-6">
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          ✓ Présent
                        </span>
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