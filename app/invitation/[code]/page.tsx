/*
import SmartEventButtons from "@/component/SmartEventButtons";
//import page from "@/component/page";

interface InvitationPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { code } = await params;

  return (
    <main className="min-h-screen bg-[#F8F6F1] px-6 py-16">

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-[#B9A77C]">
          Invitation officielle
        </p>

        <h1 className="mt-6 text-5xl font-serif text-[#A8B5A2]">
          Donald Kevin
          <span className="mx-3 text-[#D8C7A3]">
            & 
          </span>
           Marie
        </h1>

        <p className="mt-6 text-lg text-[#5E625B]">
          Nous avons le plaisir de vous inviter
          à célébrer notre mariage.
        </p>

        <div className="mt-12 rounded-[32px] bg-white/80 p-8 shadow-xl backdrop-blur-xl">

          <p className="text-sm text-[#888278]">
            Code de l'invitation
          </p>

          <p className="mt-3 text-2xl font-bold tracking-[0.2em] text-[#A8B5A2]">
            {code}
          </p>

          <div className="mt-8 space-y-4 text-[#5E625B]">

            <p>
              📅 <strong>12 décembre 2026</strong>
            </p>

            <p>
              📍 <strong>Mpolongwe — Kribi</strong>
            </p>

            <p>
              🕒 <strong>15h00</strong>
            </p>

          </div>
<SmartEventButtons />

        </div>

      </div>

    </main>
  );
}*/

import SmartEventButtons from "@/component/SmartEventButtons";
import { Heart, MapPin, CalendarDays, Clock } from "lucide-react";

interface InvitationPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { code } = await params;

  const invitationCode = decodeURIComponent(code);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        from-[#F8F6F1]
        via-[#F8F6F1]
        to-[#E9F0E7]
        px-4
        py-12

        sm:px-6
        sm:py-16

        md:py-24
      "
    >
      {/* =========================
          DÉCORATIONS
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-[#DDE8D8]
          opacity-50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-[#E9D8B6]
          opacity-40
          blur-3xl
        "
      />

      {/* =========================
          CONTENU
      ========================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-3xl
        "
      >
        {/* =========================
            EN-TÊTE
        ========================= */}

        <div className="text-center">
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#B9A77C]

              sm:text-sm
              sm:tracking-[0.4em]
            "
          >
            Invitation officielle
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#C8A96A] sm:w-16" />

            <Heart
              size={18}
              fill="#C8A96A"
              className="text-[#C8A96A]"
            />

            <div className="h-px w-10 bg-[#C8A96A] sm:w-16" />
          </div>

          <h1
            className="
              mt-6
              font-serif
              text-4xl
              leading-tight
              text-[#556B5D]

              sm:text-5xl

              md:text-6xl
            "
          >
            Donald Kevin

            <span
              className="
                mx-2
                text-[#C8A96A]

                sm:mx-3
              "
            >
              &
            </span>

            Marie
          </h1>

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
            Nous avons le plaisir de vous inviter
            à célébrer avec nous cette journée
            exceptionnelle.
          </p>
        </div>

        {/* =========================
            CARTE INVITATION
        ========================= */}

        <div
          className="
            mt-10
            rounded-[28px]
            border
            border-white/60
            bg-white/75
            p-5
            shadow-2xl
            backdrop-blur-xl

            sm:mt-12
            sm:rounded-[36px]
            sm:p-8

            md:p-10
          "
        >
          {/* Code */}

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888278]">
              Code de l'invitation
            </p>

            <div
              className="
                mx-auto
                mt-3
                inline-flex
                max-w-full
                rounded-full
                bg-[#F3F0E8]
                px-5
                py-2.5

                sm:px-6
              "
            >
              <p
                className="
                  break-all
                  text-lg
                  font-bold
                  tracking-[0.15em]
                  text-[#A8B5A2]

                  sm:text-2xl
                  sm:tracking-[0.2em]
                "
              >
                {invitationCode}
              </p>
            </div>
          </div>

          {/* Séparateur */}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#DDD8CF]" />

            <Heart
              size={16}
              className="text-[#C8A96A]"
              fill="#C8A96A"
            />

            <div className="h-px flex-1 bg-[#DDD8CF]" />
          </div>

          {/* Informations */}

          <div className="grid gap-4 sm:grid-cols-3">
            <InvitationInfo
              icon={<CalendarDays size={21} />}
              title="Date"
              value="12 décembre 2026"
            />

            <InvitationInfo
              icon={<MapPin size={21} />}
              title="Lieu"
              value="Mpolongwe — Kribi"
            />

            <InvitationInfo
              icon={<Clock size={21} />}
              title="Cérémonie"
              value="15h00"
            />
          </div>

          {/* =========================
              BOUTONS
          ========================= */}

          <div className="mt-8">
            <SmartEventButtons />
          </div>

          {/* =========================
              MESSAGE
          ========================= */}

          <div
            className="
              mt-8
              rounded-3xl
              bg-[#F8F6F1]
              p-5
              text-center

              sm:p-6
            "
          >
            <p className="font-serif text-lg text-[#556B5D]">
              Nous avons hâte de partager
              ce moment avec vous. ❤️
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Merci de conserver précieusement
              votre code invitation.
            </p>
          </div>
        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-xs text-[#99958B]">
          Donald Kevin & Marie
          <span className="mx-2">•</span>
          12 décembre 2026
        </p>
      </div>
    </main>
  );
}

/* =====================================================
   INFORMATION
===================================================== */

function InvitationInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        bg-[#F8F6F1]
        p-4

        sm:block
        sm:text-center
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#DDE8D8]
          text-[#556B5D]

          sm:mx-auto
        "
      >
        {icon}
      </div>

      <div className="min-w-0 sm:mt-3">
        <p className="text-xs uppercase tracking-wider text-gray-400">
          {title}
        </p>

        <p className="mt-1 text-sm font-medium text-[#556B5D]">
          {value}
        </p>
      </div>
    </div>
  );
}