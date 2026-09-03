/*"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 supabase
}
from "@/lib/supabase";

export default function Analytics() {

 const [
  visitors,
  setVisitors
 ] = useState<any[]>([]);

 const [
  logins,
  setLogins
 ] = useState<any[]>([]);

 const [
  rsvps,
  setRsvps
 ] = useState<any[]>([]);

 async function loadData() {

  const {
   data: visitorsData
  } = await supabase
   .from("visitor_logs")
   .select("*");

  const {
   data: loginData
  } = await supabase
   .from("login_logs")
   .select("*");

  const {
   data: rsvpData
  } = await supabase
   .from("rsvps")
   .select("*");

  setVisitors(
   visitorsData || []
  );

  setLogins(
   loginData || []
  );

  setRsvps(
   rsvpData || []
  );

 }

 useEffect(() => {

  loadData();
  
  ////
const channel =
 supabase
 .channel(
  "analytics"
 )
 .on(
  "postgres_changes",
  {
   event:"*",
   schema:"public",
   table:"visitor_logs"
  },
  () => loadData()
 )
 .subscribe();

return () => {

 supabase
 .removeChannel(
  channel
 );

};

////
 }, []);
 
 return (

 <main
  className="
  p-8
  "
 >

 <h1
  className="
  text-4xl
  font-bold
  mb-8
  "
 >
  📊 Analytics
 </h1>

 <div
  className="
  grid
  md:grid-cols-4
  gap-6
  "
 >

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  👥
  <br />
  {visitors.length}
  <br />
  Visites
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  📨
  <br />
  {
   rsvps.length
  }
  <br />
  RSVP
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  🔑
  <br />
  {
   logins.length
  }
  <br />
  Connexions
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  ✅
  <br />
  {
   rsvps.filter(
    (r)=>
    r.checked_in
   ).length
  }
  <br />
  Présents
 </div>

 </div>
 <div
 className="
 mt-10
 rounded-2xl
 border
 p-6
 "
>

<h2>
 Dernières connexions
</h2>

{logins.map(
 (l)=>(

<div
 key={l.id}
 className="
 border-b
 py-2
 "
>

 {l.email}

 <br />

 {l.role}

 <br />

 {l.latitude}
 ,
 {l.longitude}

</div>

))}
</div>
</main>
);

}*/


"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import dynamicImport from "next/dynamic";

export default function Analytics() {
  const [
    visitors,
    setVisitors,
  ] = useState<any[]>([]);

  const [
    logins,
    setLogins,
  ] = useState<any[]>([]);

  const [
    rsvps,
    setRsvps,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);
const VisitorsMap =
  dynamicImport(
    () =>
      import(
        "@/component/admin/VisitorsMap"
      ),
    {
      ssr: false,
    }
  );
  /* =====================================================
     CHARGEMENT
  ===================================================== */

  async function loadData() {
    try {
      const {
        data: visitorsData,
      } = await supabase
        .from("visitor_logs")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      const {
        data: loginData,
      } = await supabase
        .from("login_logs")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      const {
        data: rsvpData,
      } = await supabase
        .from("rsvps")
        .select("*");

      setVisitors(
        visitorsData || []
      );

      setLogins(
        loginData || []
      );

      setRsvps(
        rsvpData || []
      );
    } catch (error) {
      console.error(
        "Erreur Analytics :",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     REALTIME
  ===================================================== */

  useEffect(() => {
    loadData();

    const channel =
      supabase
        .channel("analytics")

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "visitor_logs",
          },
          () => {
            loadData();
          }
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "login_logs",
          },
          () => {
            loadData();
          }
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rsvps",
          },
          () => {
            loadData();
          }
        )

        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  }, []);

  /* =====================================================
     STATISTIQUES VISITEURS
  ===================================================== */

  const mobileCount =
    visitors.filter(
      (v) =>
        v.device === "mobile"
    ).length;

  const tabletCount =
    visitors.filter(
      (v) =>
        v.device === "tablet"
    ).length;

  const desktopCount =
    visitors.filter(
      (v) =>
        v.device === "desktop"
    ).length;

  const locationCount =
    visitors.filter(
      (v) =>
        v.latitude !== null &&
        v.longitude !== null
    ).length;

  /* =====================================================
     PAYS
  ===================================================== */

  const countries =
    visitors.reduce(
      (
        result: Record<
          string,
          number
        >,
        visitor
      ) => {
        const country =
          visitor.country ||
          "Inconnu";

        result[country] =
          (result[country] || 0) +
          1;

        return result;
      },
      {}
    );

  const sortedCountries =
    Object.entries(countries)
      .sort(
        (a, b) =>
          Number(b[1]) -
          Number(a[1])
      );

  /* =====================================================
     VILLES
  ===================================================== */

  const cities =
    visitors.reduce(
      (
        result: Record<
          string,
          number
        >,
        visitor
      ) => {
        const city =
          visitor.city ||
          "Inconnue";

        result[city] =
          (result[city] || 0) +
          1;

        return result;
      },
      {}
    );

  const sortedCities =
    Object.entries(cities)
      .sort(
        (a, b) =>
          Number(b[1]) -
          Number(a[1])
      );

  /* =====================================================
     CHARGEMENT
  ===================================================== */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#F8F6F1]
        "
      >
        Chargement...
      </main>
    );
  }

  /* =====================================================
     AFFICHAGE
  ===================================================== */

  return (
    <main
      className="
        min-h-screen
        bg-[#F8F6F1]
        p-6
        md:p-8
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        {/* TITRE */}

        <h1
          className="
            mb-8
            font-serif
            text-4xl
            font-bold
            text-[#556B5D]
          "
        >
          📊 Analytics
        </h1>

        {/* =================================================
            STATISTIQUES
        ================================================= */}

        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <StatCard
            icon="👥"
            value={visitors.length}
            label="Visites"
          />

          <StatCard
            icon="📱"
            value={mobileCount}
            label="Mobiles"
          />

          <StatCard
            icon="💻"
            value={desktopCount}
            label="Ordinateurs"
          />

          <StatCard
            icon="📍"
            value={locationCount}
            label="Visites géolocalisées"
          />
        </div>

        {/* =================================================
            AUTRES STATISTIQUES
        ================================================= */}

        <div
          className="
            mt-4
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <StatCard
            icon="📲"
            value={tabletCount}
            label="Tablettes"
          />

          <StatCard
            icon="📨"
            value={rsvps.length}
            label="RSVP"
          />

          <StatCard
            icon="🔑"
            value={logins.length}
            label="Connexions"
          />

          <StatCard
            icon="✅"
            value={
              rsvps.filter(
                (r) =>
                  r.checked_in
              ).length
            }
            label="Présents"
          />
        </div>

        {/* =================================================
            PAYS + VILLES
        ================================================= */}

        <div
          className="
            mt-8
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          {/* PAYS */}

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >
            <h2
              className="
                mb-5
                text-xl
                font-bold
                text-[#556B5D]
              "
            >
              🌍 Visiteurs par pays
            </h2>

            {sortedCountries.length ===
            0 ? (
              <p className="text-gray-500">
                Aucune donnée.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedCountries.map(
                  ([country, count]) => (
                    <div
                      key={country}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#F8F6F1]
                        p-3
                      "
                    >
                      <span>
                        🌍 {country}
                      </span>

                      <span
                        className="
                          font-bold
                          text-[#667C63]
                        "
                      >
                        {count}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* VILLES */}

          <div
            className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
          >
            <h2
              className="
                mb-5
                text-xl
                font-bold
                text-[#556B5D]
              "
            >
              📍 Visiteurs par ville
            </h2>

            {sortedCities.length ===
            0 ? (
              <p className="text-gray-500">
                Aucune donnée.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedCities.map(
                  ([city, count]) => (
                    <div
                      key={city}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#F8F6F1]
                        p-3
                      "
                    >
                      <span>
                        📍 {city}
                      </span>

                      <span
                        className="
                          font-bold
                          text-[#667C63]
                        "
                      >
                        {count}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

<div
  className="
    mt-8
    overflow-hidden
    rounded-3xl
    border
    bg-white
    p-4
    shadow-sm
  "
>
  <div className="px-2 pb-4">
    <h2
      className="
        text-xl
        font-bold
        text-[#556B5D]
      "
    >
      🌍 Carte des visiteurs
    </h2>

    <p
      className="
        mt-1
        text-sm
        text-gray-500
      "
    >
      {locationCount} visite(s)
      avec une position disponible
    </p>
  </div>

  <VisitorsMap
    visitors={visitors}
  />
</div>
        {/* =================================================
            VISITEURS
        ================================================= */}

        <div
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            bg-white
            shadow-sm
          "
        >
          <div className="p-6">
            <h2
              className="
                text-xl
                font-bold
                text-[#556B5D]
              "
            >
              👥 Derniers visiteurs
            </h2>
          </div>

          <div className="overflow-auto">
            <table
              className="
                w-full
                min-w-[900px]
              "
            >
              <thead>
                <tr
                  className="
                    bg-[#A8B5A2]
                    text-left
                    text-white
                  "
                >
                  <th className="p-4">
                    Page
                  </th>

                  <th className="p-4">
                    Appareil
                  </th>

                  <th className="p-4">
                    Ville
                  </th>

                  <th className="p-4">
                    Pays
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
                {visitors.map(
                  (visitor) => (
                    <tr
                      key={
                        visitor.id
                      }
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >
                      <td className="p-4">
                        {visitor.page ||
                          "—"}
                      </td>

                      <td className="p-4">
                        {visitor.device ===
                        "mobile"
                          ? "📱 Mobile"
                          : visitor.device ===
                            "tablet"
                          ? "📲 Tablette"
                          : visitor.device ===
                            "desktop"
                          ? "💻 Desktop"
                          : "❓ Inconnu"}
                      </td>

                      <td className="p-4">
                        {visitor.city ||
                          "Non disponible"}
                      </td>

                      <td className="p-4">
                        {visitor.country ||
                          "Non disponible"}
                      </td>

                      <td className="p-4">
                        {visitor.latitude ??
                          "—"}
                      </td>

                      <td className="p-4">
                        {visitor.longitude ??
                          "—"}
                      </td>

                      <td className="p-4">
                        {visitor.created_at
                          ? new Date(
                              visitor.created_at
                            ).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            CONNEXIONS
        ================================================= */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2
            className="
              mb-6
              text-xl
              font-bold
              text-[#556B5D]
            "
          >
            🔑 Dernières connexions
          </h2>

          <div className="space-y-4">
            {logins.map(
              (login) => (
                <div
                  key={login.id}
                  className="
                    border-b
                    pb-4
                  "
                >
                  <div className="font-semibold">
                    {login.email}
                  </div>

                  <div className="text-sm text-gray-500">
                    {login.role}
                  </div>

                  <div className="text-sm text-gray-500">
                    📍{" "}
                    {login.latitude ??
                      "—"}
                    {" , "}
                    {login.longitude ??
                      "—"}
                  </div>

                  <div className="text-xs text-gray-400">
                    {login.created_at
                      ? new Date(
                          login.created_at
                        ).toLocaleString()
                      : ""}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: number;
  label: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="text-3xl">
        {icon}
      </div>

      <div
        className="
          mt-3
          text-3xl
          font-bold
          text-[#556B5D]
        "
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-sm
          text-gray-500
        "
      >
        {label}
      </div>
    </div>
  );
}