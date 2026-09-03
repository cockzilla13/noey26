"use client";

import { FormEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Mail,
  MapPin,
  Phone,
  Send,
  UserRound,
  Users,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import InvitationQRCode from "./InvitationQRCode";
//import { trackVisitor }
//from "@/lib/trackVisitor";

export default function RSVP() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invitationCode, setInvitationCode] =
    useState<string | null>(null);
  const [error, setError] = useState("");

// watch
//useEffect(() => {

//trackVisitor("rsvp");
//},[]);
//
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const firstName = String(
      form.get("first_name") || ""
    ).trim();

    const lastName = String(
      form.get("last_name") || ""
    ).trim();

    const phone = String(
      form.get("phone") || ""
    ).trim();

    const email = String(
      form.get("email") || ""
    ).trim();

    const attending =
      form.get("attending") === "yes";

    const guestsCount = Number(
      form.get("guests_count") || 1
    );

    const guestNames = String(
      form.get("guest_names") || ""
    ).trim();

    const mealPreference = String(
      form.get("meal_preference") || ""
    );

    const transport = String(
      form.get("transport") || ""
    );

    const message = String(
      form.get("message") || ""
    ).trim();

    try {
      /* =========================
         ENREGISTREMENT SUPABASE
      ========================= */

      const { data, error } = await supabase.rpc(
        "create_rsvp",
        {
          p_first_name: firstName,
          p_last_name: lastName,
          p_phone: phone,
          p_email: email,
          p_attending: attending,
          p_guests_count: guestsCount,
          p_guest_names: guestNames,
          p_meal_preference: mealPreference,
          p_transport: transport,
          p_message: message,
        }
      );

      if (error) {
        console.error("Erreur RSVP :", error);

        setError(
          "Une erreur est survenue. Veuillez réessayer."
        );

        return;
      }

      const generatedInvitationCode =
        data?.[0]?.invitation_code;

      if (!generatedInvitationCode) {
        setError(
          "Votre confirmation a été enregistrée, mais le code invitation n'a pas pu être généré."
        );

        return;
      }

      setInvitationCode(
        generatedInvitationCode
      );

      /* =========================
         NOTIFICATION WHATSAPP
      ========================= */

      try {
        await fetch(
          "/api/whatsapp-notification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              phone,
              email,
              attending,
              guestsCount,
              invitationCode:
                generatedInvitationCode,
            }),
          }
        );
      } catch (notificationError) {
        console.error(
          "Notification WhatsApp indisponible :",
          notificationError
        );
      }

      /* =========================
         NOTIFICATION EMAIL ADMIN
      ========================= */

      try {
        await fetch(
          "/api/email-notification",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              phone,
              email,
              attending,
              guestsCount,
              invitationCode:
                generatedInvitationCode,
            }),
          }
        );
      } catch (emailError) {
        console.error(
          "Notification email indisponible :",
          emailError
        );
      }

      /* =========================
         SUCCÈS
      ========================= */

      setSuccess(true);

    } catch (err) {
      console.error(err);

      setError(
        "Impossible d'envoyer votre confirmation. Vérifiez votre connexion et réessayez."
      );

    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     ÉCRAN DE SUCCÈS
  ===================================================== */

  if (success) {
    return (
      <section
        id="rsvp"
        className="
          relative
          overflow-hidden
          bg-[#F8F6F2]
          px-4
          py-20
          sm:px-6
          sm:py-24
          md:py-32
        "
      >
        {/* Décoration */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#DDE8D8] opacity-50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#E9D8B6] opacity-40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              rounded-[28px]
              border
              border-white/60
              bg-white/80
              p-6
              text-center
              shadow-2xl
              backdrop-blur-xl

              sm:rounded-[36px]
              sm:p-10

              md:p-14
            "
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DDE8D8] text-4xl">
              💚
            </div>

            <h2
              className="
                mt-6
                font-serif
                text-3xl
                text-[#556B5D]

                sm:text-4xl
                md:text-5xl
              "
            >
              Merci pour votre confirmation
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[#5E625B]

                sm:text-base
                sm:leading-8
              "
            >
              Votre présence au mariage de
              Donald Kevin & Marie est bien
              enregistrée.
            </p>

            {invitationCode && (
              <div className="mt-8 sm:mt-10">
                <InvitationQRCode
                  invitationCode={
                    invitationCode
                  }
                />
              </div>
            )}

            {invitationCode && (
              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-[#D8C7A3]/20
                  p-5

                  sm:p-6
                "
              >
                <p className="text-sm text-[#777064]">
                  🎟️ Votre code invitation
                </p>

                <p
                  className="
                    mt-2
                    break-all
                    text-xl
                    font-bold
                    tracking-[0.2em]
                    text-[#A8B5A2]

                    sm:text-2xl
                  "
                >
                  {invitationCode}
                </p>
              </div>
            )}

            <p className="mt-8 text-sm text-gray-500">
              Conservez précieusement votre
              code invitation.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  /* =====================================================
     FORMULAIRE
  ===================================================== */

  return (
    <section
      id="rsvp"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#F8F6F2]
        via-[#F8F6F2]
        to-[#E9F0E7]

        px-4
        py-20

        sm:px-6
        sm:py-24

        md:py-32
      "
    >
      {/* Décoration */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#DDE8D8] opacity-40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#E9D8B6] opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* =========================
            TITRE
        ========================= */}

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
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-12 text-center sm:mb-16 md:mb-20"
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
            RSVP
          </p>

          <h2
            className="
              mt-4
              font-serif
              text-4xl
              leading-tight
              text-[#435141]

              sm:text-5xl
              md:text-6xl
            "
          >
            Confirmez votre présence
          </h2>

          <div className="mx-auto mt-6 h-px w-24 bg-[#C3A76A] sm:w-32" />

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-[#6E6E66]

              sm:text-base
              sm:leading-8
            "
          >
            Nous avons hâte de partager cette
            merveilleuse journée avec vous.
            Merci de confirmer votre présence
            avant le grand jour.
          </p>
        </motion.div>

        {/* =========================
            INFORMATIONS
        ========================= */}

        <div
          className="
            mb-10
            grid
            gap-4

            sm:grid-cols-3
            sm:gap-5

            lg:mb-14
          "
        >
          <InfoCard
            icon={<CalendarCheck size={22} />}
            title="12 Décembre 2026"
            text="Le grand jour"
          />

          <InfoCard
            icon={<MapPin size={22} />}
            title="Mpolongwe"
            text="Kribi"
          />

          <InfoCard
            icon={<Users size={22} />}
            title="Famille & proches"
            text="Une journée inoubliable"
          />
        </div>

        {/* =========================
            FORMULAIRE
        ========================= */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            rounded-[28px]
            border
            border-white/60
            bg-white/70
            p-5
            shadow-2xl
            backdrop-blur-xl

            sm:rounded-[34px]
            sm:p-8

            md:p-10

            lg:p-12
          "
        >
          <div
            className="
              grid
              gap-8

              lg:grid-cols-2
            "
          >
            {/* =========================
                INFORMATIONS PERSONNELLES
            ========================= */}

            <div className="space-y-5">
              <h3
                className="
                  mb-6
                  font-serif
                  text-2xl
                  text-[#556B5D]

                  sm:text-3xl
                "
              >
                Vos informations
              </h3>

              {/* Prénom */}

              <Field
                icon={<UserRound size={18} />}
                label="Prénom"
              >
                <input
                  required
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Votre prénom"
                  className="input"
                />
              </Field>

              {/* Nom */}

              <Field
                icon={<UserRound size={18} />}
                label="Nom"
              >
                <input
                  required
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Votre nom"
                  className="input"
                />
              </Field>

              {/* Téléphone */}

              <Field
                icon={<Phone size={18} />}
                label="Téléphone"
              >
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+237 ..."
                  className="input"
                />
              </Field>

              {/* Email */}

              <Field
                icon={<Mail size={18} />}
                label="E-mail"
              >
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="votre@email.com"
                  className="input"
                />
              </Field>

              {/* Présence */}

              <div>
                <label
                  htmlFor="attending"
                  className="label"
                >
                  ❤️ Votre présence
                </label>

                <select
                  id="attending"
                  name="attending"
                  className="select"
                >
                  <option value="yes">
                    Oui, je serai présent(e) ❤️
                  </option>

                  <option value="no">
                    Désolé(e), je ne pourrai pas venir
                  </option>
                </select>
              </div>
            </div>

            {/* =========================
                ORGANISATION
            ========================= */}

            <div className="space-y-5">
              <h3
                className="
                  mb-6
                  font-serif
                  text-2xl
                  text-[#556B5D]

                  sm:text-3xl
                "
              >
                Préparatifs
              </h3>

              {/* Nombre */}

              <div>
                <label
                  htmlFor="guests_count"
                  className="label"
                >
                  👥 Nombre de personnes
                </label>

                <input
                  required
                  min={1}
                  max={10}
                  name="guests_count"
                  id="guests_count"
                  type="number"
                  defaultValue={1}
                  className="input"
                />
              </div>

              {/* Accompagnants */}

              <div>
                <label
                  htmlFor="guest_names"
                  className="label"
                >
                  👥 Nom des accompagnants
                </label>

                <textarea
                  id="guest_names"
                  name="guest_names"
                  rows={3}
                  placeholder="Prénom et nom des accompagnants..."
                  className="textarea"
                />
              </div>

              {/* Repas */}

              <div>
                <label
                  htmlFor="meal_preference"
                  className="label"
                >
                  🍽️ Préférence alimentaire
                </label>

                <select
                  id="meal_preference"
                  name="meal_preference"
                  className="select"
                >
                  <option value="">
                    Sélectionner
                  </option>

                  <option value="standard">
                    Menu standard
                  </option>

                  <option value="vegetarian">
                    Végétarien
                  </option>

                  <option value="other">
                    Autre
                  </option>
                </select>
              </div>

              {/* Transport */}

              <div>
                <label
                  htmlFor="transport"
                  className="label"
                >
                  🚌 Transport
                </label>

                <select
                  id="transport"
                  name="transport"
                  className="select"
                >
                  <option value="none">
                    Je viens par mes propres moyens
                  </option>

                  <option value="bus">
                    Je souhaite utiliser le transport prévu
                  </option>
                </select>
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="label"
                >
                  💌 Message aux mariés
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Un petit mot pour les mariés..."
                  className="textarea"
                />
              </div>
            </div>
          </div>

          {/* ERREUR */}

          {error && (
            <div
              role="alert"
              className="
                mt-8
                rounded-2xl
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

          {/* BOUTON */}

          <button
            disabled={loading}
            type="submit"
            className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#667C63]
              px-6
              py-4
              text-sm
              font-semibold
              tracking-[0.12em]
              text-white
              shadow-xl
              transition

              hover:bg-[#587055]

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:mt-10
              sm:text-base
            "
          >
            <Send size={18} />

            {loading
              ? "Enregistrement..."
              : "Confirmer ma présence"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* =====================================================
   FIELD
===================================================== */

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">
        {label}
      </label>

      <div
        className="
          flex
          min-h-14
          items-center
          rounded-2xl
          border
          border-[#DDD8CF]
          bg-white/80
          px-4
          transition

          focus-within:border-[#A8B5A2]
          focus-within:ring-2
          focus-within:ring-[#A8B5A2]/20
        "
      >
        <span className="shrink-0 text-[#7B8A74]">
          {icon}
        </span>

        {children}
      </div>
    </div>
  );
}

/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-3xl
        border
        border-white/60
        bg-white/60
        p-5
        shadow-lg
        backdrop-blur-xl

        sm:p-6
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#DDE8D8]
          text-[#556B5D]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-[#556B5D]">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}