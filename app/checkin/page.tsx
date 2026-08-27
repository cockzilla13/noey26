"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { getUserRole } from "@/lib/auth";

export default function CheckInPage() {

  const [result, setResult] =
    useState("");

  const [guest, setGuest] =
	useState<any>(null);
	
  const [loading, setLoading] =
     useState(true);


 
  useEffect(() => {
   


   
	checkAuth();
	const reader =
  document.getElementById(
    "reader"
  );

if (!reader) {

  console.log(
    "reader introuvable"
  );

  return;
}
    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

    scanner.render(
      async (decodedText) => {

        setResult(decodedText);

        try {

          const invitationCode =
            decodedText
              .split("/")
              .pop();

          const { data, error } =
            await supabase
              .from("rsvps")
              .select("*")
              .eq(
                "invitation_code",
                invitationCode
              )
              .single();

          if (error || !data) {

            alert(
              "Invité introuvable"
            );

            return;
          }
		  
		  //  on valide si il est déjà là.
		  if (data.checked_in) {

			 alert(
			  "QR déjà utilisé"
			 );

			 return;
			}
  
          await supabase
            .from("rsvps")
            .update({
              checked_in: true,
              checked_in_at:
                new Date()
                  .toISOString(),
            })
            .eq(
              "id",
              data.id
            );


				setGuest({
		  firstName:
			data.first_name,
		  lastName:
			data.last_name,
		  guests:
			data.guests_count,
		});

        } catch (err) {

          console.error(err);

        }

      },
      () => {}
    );

    return () => {
      scanner.clear();
    };

  }, []);
  
  
			  
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

	  const userEmail =
		session.user.email;

	  const { data } =
		await supabase
		  .from("checkin_staff")
		  .select("*")
		  .eq(
			"email",
			userEmail
		  )
		  .single();

	  if (!data) {

	
		await supabase.auth.signOut();

		window.location.href =
		  "/checkin/login";

		return;
	  }

	  setLoading(false);

	}		
	

	  async function logout() {

		  await supabase.auth.signOut();

		  window.location.href =
			"/checkin/login";

		}
		
		
  return (
    <main className="min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-8">
        Scanner QR Invitation
      </h1>


 {
 guest && (

  <div
   className="
    mt-8
    rounded-2xl
    bg-green-100
    p-6
   "
  >

   <h2>
    ✅ Présence confirmée
   </h2>

   <p>
   Prenom : {guest.firstName}
    {" "}
   Nom: {guest.lastName}
   </p>

   <p>
    👥
    {" "}
    {guest.guests}
    {" "}
    personnes
   </p>
  
  		 <Link
          href="/checkin/list"
          className="p-6 rounded-2xl border"
         >
          ✅ Check-list
        </Link>
  </div>

 )
}

      <div id="reader" />

      {result && (
        <div className="mt-6">
          QR :
          {" "}
          {result}
        </div>
      )}


     <button
 onClick={logout}
 className="
 bg-[#A8B5A2]
 hover:bg-[#96A38F]
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