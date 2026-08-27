"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GlassWater,
  UtensilsCrossed,
  Music4,
  PartyPopper,
  MapPin,
  Shirt,
  CalendarDays,
  Navigation,
  Sparkles,
} from "lucide-react";
  /*
   * Lieu du mariage
   */
  const mapsQuery = encodeURIComponent(
	 `"3°02'15.7"N 9°57'49.5"E"`
  );
const events = [
  {
    time: "15:00",
    title: "Cérémonie",
    description:
      "Nous échangerons nos vœux entourés de nos familles et de nos proches.",
    icon: Building2,
  },
  {
    time: "17:30",
    title: "Cocktail",
    description:
      "Un moment convivial pour partager un verre et immortaliser cette journée.",
    icon: GlassWater,
  },
  {
    time: "19:00",
    title: "Réception",
    description:
      "Dîner de mariage, discours et nombreuses surprises vous attendent.",
    icon: UtensilsCrossed,
  },
  {
    time: "21:30",
    title: "Première danse",
    description:
      "L'ouverture officielle du bal des mariés.",
    icon: Music4,
  },
  {
    time: "22:00",
    title: "Soirée dansante",
    description:
      "Place à la fête jusqu'au bout de la nuit !",
    icon: PartyPopper,
  },
];

export default function Program() {
  return (
    <section
      id="programme"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F8F6F2]
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
          -left-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-[#DDE8D8]
          opacity-40
          blur-3xl

          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-32
          h-72
          w-72
          rounded-full
          bg-[#E9D8B6]
          opacity-40
          blur-3xl

          sm:h-96
          sm:w-96
        "
      />

      {/* =========================================
          PETITES ÉTOILES DÉCORATIVES
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 hidden opacity-10 sm:block">
        <Sparkles
          className="
            absolute
            left-[8%]
            top-[8%]
            h-8
            w-8
            animate-pulse
            text-[#C8A96A]

            lg:h-12
            lg:w-12
          "
        />

        <Sparkles
          className="
            absolute
            right-[8%]
            top-[18%]
            h-7
            w-7
            animate-pulse
            text-[#C8A96A]

            lg:h-10
            lg:w-10
          "
        />

        <Sparkles
          className="
            absolute
            bottom-[15%]
            left-[10%]
            h-7
            w-7
            animate-pulse
            text-[#C8A96A]
          "
        />

        <Sparkles
          className="
            absolute
            bottom-[8%]
            right-[10%]
            h-8
            w-8
            animate-pulse
            text-[#C8A96A]
          "
        />
      </div>

      {/* =========================================
          CONTENU
      ========================================= */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">
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
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="
              font-serif
              text-4xl
              leading-tight
              text-[#556B5D]

              sm:text-5xl

              lg:text-6xl
            "
          >
            Programme
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-gray-600

              sm:mt-6
              sm:text-base
              sm:leading-7

              lg:text-lg
              lg:leading-8
            "
          >
            Chaque instant de cette journée a été imaginé avec amour.
            Nous serions honorés de partager ces précieux moments avec vous.
          </p>
        </motion.div>

        {/* =========================================
            TIMELINE
        ========================================= */}

        <div className="relative mt-14 sm:mt-20 lg:mt-24">

          {/* Ligne mobile */}

          <div
            className="
              absolute
              bottom-0
              left-4
              top-0
              w-[2px]
              rounded-full
              bg-gradient-to-b
              from-[#D6C09B]
              via-[#A8B5A2]
              to-[#D6C09B]

              sm:left-5

              md:hidden
            "
          />

          {/* Ligne desktop */}

          <div
            className="
              absolute
              bottom-0
              left-1/2
              top-0
              hidden
              w-[3px]
              -translate-x-1/2
              rounded-full
              bg-gradient-to-b
              from-[#D6C09B]
              via-[#A8B5A2]
              to-[#D6C09B]

              md:block
            "
          />

          {events.map((event, index) => {
            const Icon = event.icon;
            const left = index % 2 === 0;

            return (
              <motion.div
                key={`${event.time}-${event.title}`}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`
                  relative
                  mb-8
                  flex
                  w-full
                  pl-10

                  sm:mb-10
                  sm:pl-12

                  md:mb-16
                  md:pl-0
                  ${
                    left
                      ? "md:justify-start"
                      : "md:justify-end"
                  }
                `}
              >
                {/* Point mobile */}

                <div
                  className="
                    absolute
                    left-4
                    top-7
                    z-20
                    flex
                    h-4
                    w-4
                    -translate-x-1/2
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F8F6F2]
                    bg-[#C8A96A]
                    shadow-md

                    sm:left-5
                  "
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                {/* Point desktop */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    z-20
                    hidden
                    h-8
                    w-8
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-[#F8F6F2]
                    bg-[#C8A96A]
                    shadow-xl

                    md:flex
                  "
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                {/* Carte */}

                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.01,
                  }}
                  className="
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/40
                    bg-white/40
                    shadow-xl
                    backdrop-blur-2xl

                    sm:rounded-3xl

                    md:w-[44%]
                    lg:w-[45%]
                  "
                >
                  {/* En-tête */}

                  <div
                    className="
                      bg-gradient-to-r
                      from-[#556B5D]
                      to-[#8EA78A]
                      p-5
                      text-white

                      sm:p-6
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-white/20
                          backdrop-blur-xl

                          sm:h-14
                          sm:w-14

                          lg:h-16
                          lg:w-16
                        "
                      >
                        <Icon
                          size={24}
                          className="sm:h-7 sm:w-7"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.25em]
                            opacity-80

                            sm:text-sm
                            sm:tracking-[0.3em]
                          "
                        >
                          {event.time}
                        </p>

                        <h3
                          className="
                            mt-1
                            font-serif
                            text-xl

                            sm:text-2xl

                            lg:text-3xl
                          "
                        >
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Corps */}

                  <div
                    className="
                      p-5

                      sm:p-6

                      lg:p-8
                    "
                  >
                    <p
                      className="
                        text-sm
                        leading-6
                        text-gray-600

                        sm:text-base
                        sm:leading-7

                        lg:leading-8
                      "
                    >
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================
            DRESS CODE
        ========================================= */}

        <motion.div
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div
            className="
              rounded-2xl
              border
              border-white/40
              bg-white/40
              p-5
              shadow-xl
              backdrop-blur-2xl

              sm:rounded-3xl
              sm:p-8

              lg:rounded-[36px]
              lg:p-10
            "
          >
            {/* Header */}

            <div
              className="
                flex
                flex-col
                items-center
                text-center

                sm:flex-row
                sm:items-center
                sm:text-left
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#556B5D]
                  text-white

                  sm:h-16
                  sm:w-16
                "
              >
                <Shirt size={26} />
              </div>

              <div className="mt-4 sm:ml-4 sm:mt-0">
                <h3
                  className="
                    font-serif
                    text-2xl
                    text-[#556B5D]

                    sm:text-3xl
                  "
                >
                  Dress Code
                </h3>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  Élégance • Nature • Raffinement
                </p>
              </div>
            </div>

            {/* Couleurs */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-4

                sm:grid-cols-3
                sm:gap-5

                lg:gap-8
              "
            >
              {/* Blanc cassé */}

              <div
                className="
                  rounded-2xl
                  bg-[#F8F5EF]
                  p-6
                  shadow-lg

                  sm:rounded-3xl
                  sm:p-8
                "
              >
                <div
                  className="
                    mx-auto
                    mb-4
                    h-14
                    w-14
                    rounded-full
                    border
                    border-gray-200
                    bg-[#F8F5EF]

                    sm:h-16
                    sm:w-16
                  "
                />

                <h4
                  className="
                    text-center
                    text-lg
                    font-semibold
                    text-[#556B5D]

                    sm:text-xl
                  "
                >
                  Blanc cassé
                </h4>
              </div>

              {/* Vert sauge */}

              <div
                className="
                  rounded-2xl
                  bg-[#A5B49C]
                  p-6
                  text-white
                  shadow-lg

                  sm:rounded-3xl
                  sm:p-8
                "
              >
                <div
                  className="
                    mx-auto
                    mb-4
                    h-14
                    w-14
                    rounded-full
                    border
                    border-white
                    bg-[#A5B49C]

                    sm:h-16
                    sm:w-16
                  "
                />

                <h4
                  className="
                    text-center
                    text-lg
                    font-semibold

                    sm:text-xl
                  "
                >
                  Vert Sauge
                </h4>
              </div>

              {/* Champagne */}

              <div
                className="
                  rounded-2xl
                  bg-[#D8C29A]
                  p-6
                  shadow-lg

                  sm:rounded-3xl
                  sm:p-8
                "
              >
                <div
                  className="
                    mx-auto
                    mb-4
                    h-14
                    w-14
                    rounded-full
                    border
                    border-white
                    bg-[#D8C29A]

                    sm:h-16
                    sm:w-16
                  "
                />

                <h4
                  className="
                    text-center
                    text-lg
                    font-semibold
                    text-[#556B5D]

                    sm:text-xl
                  "
                >
                  Champagne
                </h4>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            LIEU
        ========================================= */}

        <motion.div
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div
            className="
              rounded-2xl
              border
              border-white/40
              bg-white/40
              p-5
              shadow-xl
              backdrop-blur-2xl

              sm:rounded-3xl
              sm:p-8

              lg:rounded-[36px]
              lg:p-10
            "
          >
            {/* Informations */}

            <div
              className="
                flex
                flex-col
                items-center
                text-center

                sm:flex-row
                sm:items-center
                sm:text-left
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C8A96A]
                  text-white

                  sm:h-16
                  sm:w-16
                "
              >
                <MapPin size={26} />
              </div>

              <div className="mt-4 sm:ml-5 sm:mt-0">
                <h3
                  className="
                    font-serif
                    text-2xl
                    text-[#556B5D]

                    sm:text-3xl
                  "
                >
                  Mpolongwe – Kribi
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                  Cérémonie : 15h00
                  <br />
                  Réception : 19h00
                </p>
              </div>
            </div>

            {/* Boutons */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
                sm:gap-4

                lg:mt-10
              "
            >
              <a
                href="https://www.google.com/maps/search/Mpolongwe+-+Kribi"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#556B5D]
                  px-6
                  py-3
                  text-sm
                  text-white
                  shadow-xl
                  transition
                  hover:scale-[1.02]

                  sm:w-auto
                  sm:px-7
                  sm:text-base
                "
              >
			  
                <Navigation size={19} />
                Itinéraire Google Maps
              </a>

              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+Donald+Kevin+%26+Marie"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#556B5D]
                  px-6
                  py-3
                  text-sm
                  text-[#556B5D]
                  transition
                  hover:bg-[#556B5D]
                  hover:text-white

                  sm:w-auto
                  sm:px-7
                  sm:text-base
                "
              >
                <CalendarDays size={19} />
                Google Calendar
              </a>

              <a
                href="/calendar/mariage.ics"
                className="
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A96A]
                  px-6
                  py-3
                  text-sm
                  text-[#C8A96A]
                  transition
                  hover:bg-[#C8A96A]
                  hover:text-white

                  sm:w-auto
                  sm:px-7
                  sm:text-base
                "
              >
                Télécharger le fichier .ics
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}