
"use client";

import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { PenLine, UserRound, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function GuestBook() {
 /*const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Marie",
      message:
        "Que cette journée soit le début d'une vie remplie d'amour, de bonheur et de complicité. Félicitations ❤️",
    },
    {
      id: 2,
      name: "Jean",
      message:
        "Tous mes vœux de bonheur. Que votre amour grandisse chaque jour davantage.",
    },
  ]);*/

const [messages, setMessages] =
  useState<any[]>([]);

const [firstName, setFirstName] =
  useState("");

const [lastName, setLastName] =
  useState("");

const [message, setMessage] =
  useState("");

const [success, setSuccess] =
  useState(false);

const [loading, setLoading] =
  useState(false);


useEffect(() => {
  loadMessages();
}, []);

async function loadMessages() {

  const { data } =
    await supabase
      .from("guestbook")
      .select("*")
      .eq("approved", true)
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  setMessages(data || []);

}
 /*async function submitMessage() {

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

  }}*/


async function submitMessage(
  e: React.FormEvent
) {

  e.preventDefault();

  if (
    !firstName ||
    !message
  ) return;

  setLoading(true);

  const { error } =
    await supabase
      .from("guestbook")
      .insert({

        first_name:
          firstName,

        last_name:
          lastName,

        message,

        approved: false,

      });

  setLoading(false);

  if (!error) {

    setSuccess(true);

    setFirstName("");
    setLastName("");
    setMessage("");

  }

}
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F7F2] via-[#F4F2EB] to-[#E9F0E7] py-24 px-6">
	 <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-[#DCE8D8] blur-3xl opacity-40"/>
        <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-[#F8F5ED] blur-3xl opacity-60"/>
      </div>



      <div className="relative mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[0.4em] text-[#72836C] text-sm">
            Livre d'Or
          </p>

          <h2 className="mt-4 text-6xl font-serif text-[#435141] font-light">
            Vos mots nous accompagneront
          </h2>

          <div className="mx-auto mt-6 h-px w-240 bg-[#C3A76A]" />

          <p className="mt-8 text-[#6E6E66] max-w-2xl mx-auto leading-8">
            Nous serions profondément touchés de découvrir quelques mots de votre part.
            Vos pensées et vos souhaits feront partie des plus beaux souvenirs de cette journée.
          </p>

        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[420px_1fr]">

          <motion.form
            onSubmit={submitMessage}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[34px] border border-[#DAD6CC] bg-white/60 backdrop-blur-xl p-10 shadow-2xl"
          >

            <h3 className="text-3xl font-serif text-[#435141] mb-8">
              Écrire un message
            </h3>

            <div className="space-y-6">

              <div className="flex items-center rounded-2xl border border-[#DDD8CF] px-5 h-14 bg-white/80">
                <UserRound size={18} className="text-[#7B8A74]" />
                <input
                  className="ml-4 w-full bg-transparent outline-none"
                  placeholder="Votre prénom"
                 value={firstName}
onChange={(e)=>
 setFirstName(
  e.target.value
 )
}
                />
              </div>
			  
			  <div
 className="
 flex
 items-center
 rounded-2xl
 border
 border-[#DDD8CF]
 px-5
 h-14
 bg-white/80
 "
>

 <UserRound
  size={18}
  className="text-[#7B8A74]"
 />

 <input
  className="
  ml-4
  w-full
  bg-transparent
  outline-none
  "
  placeholder="Votre nom"
  value={lastName}
  onChange={(e)=>
   setLastName(
    e.target.value
   )
  }
 />

</div>

              <div className="rounded-2xl border border-[#DDD8CF] bg-white/80 p-5">
                <textarea
                  rows={7}
                  className="w-full resize-none bg-transparent outline-none"
                  placeholder="Écrivez quelques mots aux mariés..."
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                />
              </div>

              <button
                className="w-full rounded-full bg-[#667C63] py-4 text-white tracking-[0.2em] uppercase hover:bg-[#587055] transition"
              >
                <span className="flex justify-center items-center gap-3">
                  <PenLine size={18}/>
                  {loading
					 ? "Publication..."
					 : "Envoyer"}
                </span>
              </button>
 {success && (

 <div
  className="
  mt-4
  rounded-xl
  bg-green-100
  p-4
  text-green-700
  "
 >

  ❤️ Merci pour votre message.

  <br />

  Il sera publié après validation
  des mariés.

 </div>

)}
            </div>

          </motion.form>

          <div className="space-y-8">

            {messages.map((item)=>(
              <motion.div
                key={item.id}
                initial={{ opacity:0,y:30 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-[#DDD8CF] p-10 shadow-xl"
              >

                <Quote
                  className="text-[#C5A66B]"
                  size={38}
                />

                <p className="mt-6 text-[#555] leading-8 italic text-lg">
                  {item.message}
                </p>

                <div className="mt-8 flex items-center">

                  <div className="h-px flex-1 bg-[#D9D4CA]" />

                  <span className="px-6 text-[#6D7D68] tracking-widest uppercase text-sm">
                   {item.first_name}
                   {" "}
                   {item.last_name}
                  </span>

                  <div className="h-px flex-1 bg-[#D9D4CA]" />

                </div>

              </motion.div>
            ))}

          </div>

        </div>
       </div>
      </div>

    </section>
  );
}