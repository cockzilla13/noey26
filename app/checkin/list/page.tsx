"use client";

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

}