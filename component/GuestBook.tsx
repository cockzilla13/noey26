"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PenLine,
  UserRound,
  Quote,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { trackVisitor } from "@/lib/trackVisitor";
trackVisitor
type GuestMessage = {
  id: string | number;
  first_name: string;
  last_name: string | null;
  message: string;
  created_at?: string;
};

export default function GuestBook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  trackVisitor("guestbook");
    loadMessages();
  }, []);

  async function loadMessages() {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .eq("approved", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Erreur chargement livre d'or :", error);
      return;
    }

    setMessages(data || []);
  }

  async function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!firstName.trim() || !message.trim()) {
      setError("Veuillez renseigner votre prénom et votre message.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase
      .from("guestbook")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        message: message.trim(),
        approved: false,
      });

    setLoading(false);

    if (error) {
      console.error("Erreur envoi message :", error);
      setError(
        "Une erreur est survenue. Veuillez réessayer dans quelques instants."
      );
      return;
    }

    setSuccess(true);

    setFirstName("");
    setLastName("");
    setMessage("");
  }

  return (
    <section
      id="guestbook"
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#F9F7F2]
        via-[#F4F2EB]
        to-[#E9F0E7]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-32
      "
    >
      {/* =========================================
          DÉCOR
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-10
          h-64
          w-64
          rounded-full
          bg-[#DCE8D8]
          opacity-40
          blur-3xl

          sm:h-80
          sm:w-80

          lg:left-10
          lg:top-20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-150px]
          right-[-100px]
          h-80
          w-80
          rounded-full
          bg-[#F8F5ED]
          opacity-60
          blur-3xl

          sm:h-96
          sm:w-96
        "
      />

      {/* =========================================
          CONTENU
      ========================================= */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* =========================================
            TITRE
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center

            sm:mb-16

            lg:mb-20
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#72836C]

              sm:text-sm
              sm:tracking-[0.4em]
            "
          >
            Livre d'Or
          </p>

          <h2
            className="
              mt-4
              font-serif
              text-3xl
              font-light
              leading-tight
              text-[#435141]

              sm:text-4xl

              md:text-5xl

              lg:text-6xl
            "
          >
            Vos mots nous accompagneront
          </h2>

          {/* Ligne décorative */}

          <div
            className="
              mx-auto
              mt-5
              h-px
              w-24
              bg-[#C3A76A]

              sm:mt-6
              sm:w-32
            "
          />

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-6
              text-[#6E6E66]

              sm:mt-8
              sm:text-base
              sm:leading-7

              lg:text-lg
              lg:leading-8
            "
          >
            Nous serions profondément touchés de découvrir quelques mots
            de votre part. Vos pensées et vos souhaits feront partie des
            plus beaux souvenirs de cette journée.
          </p>
        </motion.div>

        {/* =========================================
            FORMULAIRE + MESSAGES
        ========================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-10

            lg:grid-cols-[minmax(320px,400px)_1fr]
            lg:gap-14

            xl:gap-16
          "
        >

          {/* =======================================
              FORMULAIRE
          ======================================= */}

          <motion.form
            onSubmit={submitMessage}
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              h-fit
              rounded-2xl
              border
              border-[#DAD6CC]
              bg-white/60
              p-5
              shadow-xl
              backdrop-blur-xl

              sm:rounded-3xl
              sm:p-7

              lg:rounded-[34px]
              lg:p-8

              xl:p-10
            "
          >
            <h3
              className="
                mb-6
                font-serif
                text-2xl
                text-[#435141]

                sm:mb-8
                sm:text-3xl
              "
            >
              Écrire un message
            </h3>

            <div className="space-y-4 sm:space-y-5">

              {/* Prénom */}

              <div
                className="
                  flex
                  min-h-[54px]
                  items-center
                  rounded-xl
                  border
                  border-[#DDD8CF]
                  bg-white/80
                  px-4

                  sm:rounded-2xl
                  sm:px-5
                "
              >
                <UserRound
                  size={18}
                  className="shrink-0 text-[#7B8A74]"
                />

                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  placeholder="Votre prénom"
                  className="
                    ml-3
                    min-w-0
                    w-full
                    bg-transparent
                    text-sm
                    text-[#435141]
                    outline-none
                    placeholder:text-gray-400

                    sm:ml-4
                    sm:text-base
                  "
                />
              </div>

              {/* Nom */}

              <div
                className="
                  flex
                  min-h-[54px]
                  items-center
                  rounded-xl
                  border
                  border-[#DDD8CF]
                  bg-white/80
                  px-4

                  sm:rounded-2xl
                  sm:px-5
                "
              >
                <UserRound
                  size={18}
                  className="shrink-0 text-[#7B8A74]"
                />

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Votre nom"
                  className="
                    ml-3
                    min-w-0
                    w-full
                    bg-transparent
                    text-sm
                    text-[#435141]
                    outline-none
                    placeholder:text-gray-400

                    sm:ml-4
                    sm:text-base
                  "
                />
              </div>

              {/* Message */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#DDD8CF]
                  bg-white/80
                  p-4

                  sm:rounded-2xl
                  sm:p-5
                "
              >
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Écrivez quelques mots aux mariés..."
                  className="
                    min-h-[150px]
                    w-full
                    resize-none
                    bg-transparent
                    text-sm
                    leading-6
                    text-[#435141]
                    outline-none
                    placeholder:text-gray-400

                    sm:min-h-[170px]
                    sm:text-base
                    sm:leading-7
                  "
                />
              </div>

              {/* Erreur */}

              {error && (
                <div
                  className="
                    rounded-xl
                    bg-red-50
                    p-4
                    text-sm
                    leading-6
                    text-red-600
                  "
                >
                  {error}
                </div>
              )}

              {/* Bouton */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  min-h-[54px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[#667C63]
                  px-5
                  py-4
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-lg
                  transition-all

                  hover:bg-[#587055]
                  hover:shadow-xl

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:text-sm
                  sm:tracking-[0.2em]
                "
              >
                <span className="flex items-center justify-center gap-3">
                  <PenLine size={18} />

                  {loading
                    ? "Publication..."
                    : "Envoyer"}
                </span>
              </button>

              {/* Succès */}

              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    rounded-xl
                    bg-green-50
                    p-4
                    text-sm
                    leading-6
                    text-green-700
                  "
                >
                  ❤️ Merci pour votre message.

                  <br />

                  Il sera publié après validation
                  des mariés.
                </motion.div>
              )}
            </div>
          </motion.form>

          {/* =======================================
              MESSAGES
          ======================================= */}

          <div className="space-y-5 sm:space-y-7">

            {messages.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-[#DDD8CF]
                  bg-white/50
                  p-8
                  text-center
                  text-sm
                  text-gray-500
                  shadow-lg
                  backdrop-blur-xl

                  sm:rounded-3xl
                  sm:p-10
                "
              >
                Soyez les premiers à laisser un mot
                aux mariés ❤️
              </div>
            )}

            {messages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.08, 0.4),
                }}
                className="
                  rounded-2xl
                  border
                  border-[#DDD8CF]
                  bg-white/70
                  p-5
                  shadow-lg
                  backdrop-blur-xl

                  sm:rounded-3xl
                  sm:p-7

                  lg:p-8

                  xl:p-10
                "
              >
                <Quote
                  className="text-[#C5A66B]"
                  size={32}
                />

                <p
                  className="
                    mt-4
                    text-base
                    italic
                    leading-7
                    text-[#555]

                    sm:mt-6
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {item.message}
                </p>

                {/* Signature */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3

                    sm:mt-8
                    sm:gap-5
                  "
                >
                  <div className="h-px flex-1 bg-[#D9D4CA]" />

                  <span
                    className="
                      max-w-[65%]
                      text-center
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-[#6D7D68]

                      sm:max-w-none
                      sm:text-xs
                      sm:tracking-[0.2em]
                    "
                  >
                    {item.first_name}
                    {item.last_name
                      ? ` ${item.last_name}`
                      : ""}
                  </span>

                  <div className="h-px flex-1 bg-[#D9D4CA]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}