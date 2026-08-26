"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GuestbookPage() {

 const [firstName,setFirstName] =
  useState("");

 const [lastName,setLastName] =
  useState("");

 const [message,setMessage] =
  useState("");

 const [success,setSuccess] =
  useState(false);

 async function submitMessage() {

  const { error } =
   await supabase
    .from("guestbook")
    .insert({
      first_name: firstName,
      last_name: lastName,
      message
    });

  if (!error) {

   setSuccess(true);

   setFirstName("");
   setLastName("");
   setMessage("");

  }

 }

 return (

  <main className="max-w-2xl mx-auto p-6">

   <h1
    className="
    text-4xl
    font-bold
    mb-6
    "
   >
    ❤️ Livre d'Or
   </h1>

   <input
    placeholder="Prénom"
    value={firstName}
    onChange={(e)=>
      setFirstName(e.target.value)
    }
    className="border p-3 rounded-xl w-full mb-4"
   />

   <input
    placeholder="Nom"
    value={lastName}
    onChange={(e)=>
      setLastName(e.target.value)
    }
    className="border p-3 rounded-xl w-full mb-4"
   />

   <textarea
    placeholder="Votre message..."
    value={message}
    onChange={(e)=>
      setMessage(e.target.value)
    }
    className="border p-3 rounded-xl w-full mb-4"
   />

   <button
    onClick={submitMessage}
    className="
    bg-[#A8B5A2]
    text-white
    px-6
    py-3
    rounded-xl
    "
   >
    Envoyer
   </button>

   {success && (

    <p className="mt-4">

     ✅ Merci !
     Votre message sera publié après validation.

    </p>

   )}

  </main>

 );

}