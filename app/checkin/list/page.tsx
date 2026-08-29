/*"use client";

import { useEffect, useState }
from "react";

import { supabase }
from "@/lib/supabase";

export default function CheckinList() {

const [guests, setGuests] =
useState<any[]>([]);

const [count, setCount] =
useState(0);

const [peopleCount, setPeopleCount] =
useState(0);

const [peopleTotCount, setPeopleTotCount] =
useState(0);

const [lastCheckin, setLastCheckin] =
useState<any>(null);

  const [loading, setLoading] =
     useState(true);

	

 useEffect(() => {

  checkAuth();
  loadGuests();
//  dk
  const channel =
    supabase
      .channel(
        "checkin-realtime"
      )
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
//

 }, []);

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



  // dk listcount
  
	   const guestsData =
		data || [];

	  setGuests(guestsData);

	  setCount(
		guestsData.length
	  );

	  const totalPeople =
		guestsData.reduce(
		  (sum, guest) =>
			sum +
			(guest.guests_count || 1),
		  0
		);

	  setPeopleCount(
		totalPeople
	  );
  
		  if (
		 guestsData.length > 0
		) {

		 setLastCheckin(
		   guestsData[0]
		 );

		}
  // end
  
    setGuests(data || []);
  const { count } =
    await supabase
      .from("rsvps")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("checked_in", true);

  setCount(count || 0);
 

 }
    
	  async function checkAuth() {

		  const {
			data: { session }
		  } =
		  await supabase.auth.getSession();

		  if (!session) {

			window.location.href =
			  "/checkin/login";

			return;
		  }

		  setLoading(false);

		}
		
		if (loading) {

		  return (
			<div>
			  Vérification...
			</div>
		  );

		}
		
		  async function logout() {

		  await supabase.auth.signOut();

		  window.location.href =
			"/checkin/login";

		}
		

 return (

  <main className="p-6">

   <h1>
    Invités présents
   </h1>
   
		<div
	  className="
		mt-4
		mb-6
		rounded-xl
		bg-[#A8B5A2]
		p-4
		text-white
	  "
	>
	  <h2 className="text-xl font-bold">
		✅ Présents : {count}
	  </h2>
	</div>
   {
    guests.map(
      (guest) => (

      <div
       key={guest.id}
       className="
       border-b
       py-3
       "
      >

       <strong>
        {guest.first_name}
        {" "}
        {guest.last_name}
       </strong>

       <div>
        👥
        {" "}
        {guest.guests_count}
       </div>

       <div>
        {new Date(
          guest.checked_in_at
        ).toLocaleString()}
       </div>

      </div>

    ))
   }
<div
 className="
 grid
 gap-4
 mt-6
 mb-6
 md:grid-cols-2
 "
>

 <div
  className="
  rounded-2xl
  bg-[#A8B5A2]
  p-5
  text-white
  "
 >

  <h2
   className="
   text-3xl
   font-bold
   "
  >
   {count}
  </h2>

  <p>
   RSVP présents
  </p>

 </div>


 
 
 <div
  className="
  rounded-2xl
  bg-[#D8C7A3]
  p-5
  "
 >

  <h2
   className="
   text-3xl
   font-bold
   "
  >
   {peopleCount}
  </h2>

  <p>
   Personnes totales invitées
  </p>

 </div>

</div>


{
 lastCheckin && (

  <div
   className="
   mb-6
   rounded-xl
   border
   p-4
   "
  >

   <strong>
    Dernier invité arrivé :
   </strong>

   <br />

   {lastCheckin.first_name}
   {" "}
   {lastCheckin.last_name}

  </div>

 )
}       <button
 onClick={logout}
 className="
 bg-red-500
 text-white
 px-4
 py-2
 rounded-xl
 "
>
 Déconnexion
</button>
  </main>

 );

}*/

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CheckinList() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<any>(null);

  async function loadGuests() {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("checked_in", true)
      .order("checked_in_at", {
        ascending: false,
      });

    if (error) {
      console.error("Erreur chargement invités :", error);
      return;
    }

    const guestsData = data || [];

    setGuests(guestsData);
    setLastCheckin(guestsData[0] || null);
  }

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/checkin/login";
      return;
    }

    setLoading(false);
  }

  useEffect(() => {
    checkAuth();
    loadGuests();

    const channel = supabase
      .channel("checkin-realtime")
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

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);

    await supabase.auth.signOut();

    window.location.href = "/checkin/login";
  }

  /*
   * Statistiques calculées directement depuis les données
   * déjà récupérées.
   */
  const count = guests.length;

  const peopleCount = guests.reduce(
    (sum, guest) =>
      sum + (Number(guest.guests_count) || 1),
    0
  );

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          w-full
          bg-[#F8F5ED]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-4
              h-9
              w-9
              animate-spin
              rounded-full
              border-4
              border-[#DDD8CF]
              border-t-[#435141]
            "
          />

          <p className="text-sm font-medium text-[#435141] sm:text-base">
            Vérification...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-gradient-to-b
        from-[#F8F5ED]
        via-[#F4F2EB]
        to-[#E9F0E7]
        px-3
        py-5
        sm:px-5
        sm:py-7
        md:px-8
        lg:px-10
      "
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* =========================
            HEADER
        ========================== */}

        <header
          className="
            mb-6
            flex
            flex-col
            gap-4
            sm:mb-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#B9A77C]
                sm:text-xs
                sm:tracking-[0.3em]
              "
            >
              Espace Staff
            </p>

            <h1
              className="
                mt-2
                font-serif
                text-3xl
                font-semibold
                leading-tight
                text-[#435141]
                sm:text-4xl
                md:text-5xl
              "
            >
              Invités présents
            </h1>

            <p className="mt-2 text-sm text-[#6E6E66] sm:text-base">
              Suivi des invités arrivés au mariage.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="
              min-h-11
              w-full
              rounded-xl
              bg-red-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-red-600
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            {loggingOut
              ? "Déconnexion..."
              : "🚪 Déconnexion"}
          </button>
        </header>

        {/* =========================
            STATISTIQUES
        ========================== */}

        <section
          className="
            mb-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >

          {/* RSVP */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              bg-[#A8B5A2]
              p-5
              text-white
              shadow-md
              sm:p-6
            "
          >
            <div className="flex items-center justify-between gap-4">

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-white/75
                    sm:text-sm
                  "
                >
                  RSVP présents
                </p>

                <h2
                  className="
                    mt-1
                    text-3xl
                    font-bold
                    sm:text-4xl
                  "
                >
                  {count}
                </h2>

                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  groupes enregistrés
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/20
                  text-2xl
                  sm:h-14
                  sm:w-14
                "
              >
                👥
              </div>

            </div>
          </div>

          {/* PERSONNES */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              bg-[#D8C7A3]
              p-5
              text-[#435141]
              shadow-md
              sm:p-6
            "
          >
            <div className="flex items-center justify-between gap-4">

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-[#6E6044]
                    sm:text-sm
                  "
                >
                  Personnes présentes
                </p>

                <h2
                  className="
                    mt-1
                    text-3xl
                    font-bold
                    sm:text-4xl
                  "
                >
                  {peopleCount}
                </h2>

                <p className="mt-1 text-xs text-[#6E6044] sm:text-sm">
                  personnes présentes
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/30
                  text-2xl
                  sm:h-14
                  sm:w-14
                "
              >
                🍽️
              </div>

            </div>
          </div>

        </section>

        {/* =========================
            DERNIER ARRIVÉ
        ========================== */}

        {lastCheckin && (
          <section
            className="
              mb-6
              rounded-2xl
              border
              border-[#DDD8CF]
              bg-white
              p-4
              shadow-sm
              sm:p-5
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#A8B5A2]/20
                  text-xl
                "
              >
                🟢
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-[#999A94]
                    sm:text-xs
                  "
                >
                  Dernier invité arrivé
                </p>

                <p
                  className="
                    mt-1
                    break-words
                    text-base
                    font-semibold
                    text-[#435141]
                    sm:text-lg
                  "
                >
                  {lastCheckin.first_name}{" "}
                  {lastCheckin.last_name}
                </p>

                {lastCheckin.checked_in_at && (
                  <p className="mt-1 text-xs text-[#888A83] sm:text-sm">
                    {new Date(
                      lastCheckin.checked_in_at
                    ).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>

            </div>
          </section>
        )}

        {/* =========================
            LISTE
        ========================== */}

        <section>

          <div
            className="
              mb-4
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-[#435141]
                  sm:text-xl
                "
              >
                Liste des présents
              </h2>

              <p className="text-xs text-[#888A83] sm:text-sm">
                Mise à jour automatique en temps réel
              </p>
            </div>

            <span
              className="
                w-fit
                rounded-full
                bg-[#A8B5A2]/20
                px-3
                py-1
                text-xs
                font-medium
                text-[#435141]
              "
            >
              {count} présent{count > 1 ? "s" : ""}
            </span>
          </div>

          {/* Aucun invité */}

          {guests.length === 0 && (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#D8D4CC]
                bg-white/60
                p-8
                text-center
                sm:p-12
              "
            >
              <div className="text-4xl sm:text-5xl">
                🕊️
              </div>

              <h3
                className="
                  mt-3
                  text-base
                  font-semibold
                  text-[#435141]
                  sm:text-lg
                "
              >
                Aucun invité présent
              </h3>

              <p className="mt-1 text-sm text-[#888A83]">
                Les invités apparaîtront ici dès leur check-in.
              </p>
            </div>
          )}

          {/* Liste */}

          {guests.length > 0 && (
            <div className="space-y-3">

              {guests.map((guest) => (

                <article
                  key={guest.id}
                  className="
                    rounded-2xl
                    border
                    border-[#DDD8CF]
                    bg-white
                    p-4
                    shadow-sm
                    transition
                    hover:shadow-md
                    sm:p-5
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >

                    {/* IDENTITÉ */}

                    <div className="flex min-w-0 items-center gap-3">

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#A8B5A2]
                          text-sm
                          font-semibold
                          text-white
                          sm:h-12
                          sm:w-12
                        "
                      >
                        {guest.first_name?.charAt(0)}
                        {guest.last_name?.charAt(0)}
                      </div>

                      <div className="min-w-0">

                        <h3
                          className="
                            break-words
                            text-base
                            font-semibold
                            text-[#435141]
                            sm:text-lg
                          "
                        >
                          {guest.first_name}{" "}
                          {guest.last_name}
                        </h3>

                        <p className="mt-0.5 text-xs text-[#888A83] sm:text-sm">
                          👥{" "}
                          {Number(
                            guest.guests_count
                          ) || 1}{" "}
                          {Number(
                            guest.guests_count
                          ) > 1
                            ? "personnes"
                            : "personne"}
                        </p>

                      </div>
                    </div>

                    {/* HEURE */}

                    <div
                      className="
                        rounded-xl
                        bg-[#F8F5ED]
                        px-3
                        py-2
                        sm:min-w-[180px]
                        sm:text-right
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wide
                          text-[#999A94]
                        "
                      >
                        Check-in
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          font-medium
                          text-[#435141]
                          sm:text-sm
                        "
                      >
                        {guest.checked_in_at
                          ? new Date(
                              guest.checked_in_at
                            ).toLocaleString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>

        {/* =========================
            FOOTER
        ========================== */}

        <footer
          className="
            mt-8
            border-t
            border-[#DDD8CF]
            pt-5
            text-center
            sm:mt-10
          "
        >
          <p className="text-[11px] text-[#999A94] sm:text-xs">
            🔄 Les check-ins sont synchronisés automatiquement
          </p>
        </footer>

      </div>
    </main>
  );
}