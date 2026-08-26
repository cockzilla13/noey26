"use client";

import Link from "next/link";
import { useEffect,useState }
from "react";

import { supabase }
from "@/lib/supabase";

export default function AdminGuestbook() {

 const [messages,setMessages] =
  useState<any[]>([]);

 async function load() {

  const { data } =
   await supabase
    .from("guestbook")
    .select("*")
    .order(
      "created_at",
      { ascending:false }
    );

  setMessages(data || []);

 }

 useEffect(() => {
  load();
 }, []);

 async function approve(id:string) {

  await supabase
   .from("guestbook")
   .update({
     approved:true
   })
   .eq("id",id);

  load();

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
    ❤️ Modération Livre d'Or
   </h1>

   {messages.map((m) => (

    <div
     key={m.id}
     className="
     border
     rounded-xl
     p-4
     mb-4
     "
    >

     <h3>

      {m.first_name}
      {" "}
      {m.last_name}

     </h3>

     <p>{m.message}</p>

     <p>

      Etat :
      {" "}
      {m.approved
       ? "✅"
       : "⏳"}

     </p>

     {!m.approved && (

      <button
       onClick={() =>
        approve(m.id)
       }
       className="
       bg-green-600
       text-white
       px-4
       py-2
       rounded-xl
       "
      >
       Approuver
      </button>

     )}

    </div>

   ))}

  </main>

 );

}