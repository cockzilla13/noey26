/*"use client";

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
} from "lucide-react";

const events = [
  {
    time: "15:00",
    title: "Cérémonie ",
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
    title: "Soirée Dansante",
    description:
      "Place à la fête jusqu'au bout de la nuit !",
    icon: PartyPopper,
  },
];

export default function Program() {
  return (
  
    <section
      id="programme"
     // className="relative  flex h-full flex-col items-center justify-center text-center bg-[#F8F6F2] py-28"
	  className="relative  flex h-full flex-col items-center justify-center text-center bg-[#F8F6F2] py-32"
    >
	
	<div className="ligt"/>
      {/* Décor *}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#DDE8D8] blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#E9D8B6] blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center text-5xl md:text-6xl font-serif text-[#556B5D]"
        >
          Programme
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .2 }}
          viewport={{ once: true }}
          className="mt-6 max-w-3xl mx-auto text-center text-gray-600 leading-8"
        >
          Chaque instant de cette journée a été imaginé avec amour.
          Nous serions honorés de partager ces précieux moments avec vous.
        </motion.p>

        {/* Timeline *}

        <div className="relative mt-24">

          {/* Ligne centrale *}

          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#D6C09B] via-[#A8B5A2] to-[#D6C09B] -translate-x-1/2 rounded-full" />
		  
		  
		  {events.map((event, index) => {
            const Icon = event.icon;
            const left = index % 2 === 0;

            return (
              <motion.div
                key={event.title}
                initial={{
                  opacity: 0,
                  x: left ? -80 : 80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                className={`relative mb-20 flex ${
                  left ? "justify-start" : "justify-end"
                }`}
              >
                {/* Point central *}

                <div
                  className="
                    hidden md:flex
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-8
                    h-8
                    rounded-full
                    bg-[#C8A96A]
                    border-4
                    border-[#F8F6F2]
                    shadow-xl
                    items-center
                    justify-center
                    z-20
                  "
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Carte *}

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="
                    w-full
                    md:w-[45%]
                    rounded-[32px]
                    bg-white/25
                    backdrop-blur-2xl
                    border
                    border-white/30
                    shadow-2xl
                    overflow-hidden
                  "
                >
                  {/* En-tête *}

                  <div className="bg-gradient-to-r from-[#556B5D] to-[#8EA78A] p-6 text-white">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-16
                          h-16
                          rounded-full
                          bg-white/20
                          backdrop-blur-xl
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Icon size={30} />
                      </div>

                      <div>

                        <p className="uppercase tracking-[4px] text-sm opacity-80">
                          {event.time}
                        </p>

                        <h3 className="font-serif text-3xl">
                          {event.title}
                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* Corps *}

                  <div className="p-8">

                    <p className="leading-8 text-gray-600">
                      {event.description}
                    </p>

                  </div>

                </motion.div>

              </motion.div>
            );
          })}
		  </div>


        {/* ================= Dress Code ================= *}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="rounded-[36px] bg-white/25 backdrop-blur-2xl border border-white/30 shadow-2xl p-10">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-full bg-[#556B5D] flex items-center justify-center text-white">

                <Shirt size={28} />

              </div>

              <div>

                <h3 className="text-3xl font-serif text-[#556B5D]">

                  Dress Code

                </h3>

                <p className="text-gray-500">

                  Élégance • Nature • Raffinement

                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="rounded-3xl bg-[#F8F5EF] p-8 shadow-lg">

                <div className="w-16 h-16 rounded-full bg-[#F8F5EF] border mx-auto mb-5" />

                <h4 className="text-center text-xl font-semibold text-[#556B5D]">

                  Blanc cassé

                </h4>

              </div>

              <div className="rounded-3xl bg-[#A5B49C] p-8 shadow-lg text-white">

                <div className="w-16 h-16 rounded-full bg-[#A5B49C] border border-white mx-auto mb-5" />

                <h4 className="text-center text-xl font-semibold">

                  Vert Sauge

                </h4>

              </div>

              <div className="rounded-3xl bg-[#D8C29A] p-8 shadow-lg">

                <div className="w-16 h-16 rounded-full bg-[#D8C29A] border border-white mx-auto mb-5" />

                <h4 className="text-center text-xl font-semibold text-[#556B5D]">

                  Champagne

                </h4>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ================= Lieu ================= *}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >

          <div className="rounded-[36px] bg-white/25 backdrop-blur-2xl border border-white/30 shadow-2xl p-10">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-[#C8A96A] flex items-center justify-center text-white">

                <MapPin size={28} />

              </div>

              <div>

                <h3 className="text-3xl font-serif text-[#556B5D]">

                  Mpolongwe – Kribi

                </h3>

                <p className="text-gray-600 mt-2">

                  Cérémonie : 15h00
                  <br />
                  Réception : 19h00

                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="https://www.google.com/maps/search/Mpolongwe+-+Kribi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#556B5D] px-8 py-4 text-white shadow-xl transition hover:scale-105"
              >
                <Navigation size={20} />
                Itinéraire Google Maps
              </a>

              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+Donald+Kevin+%26+Marie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#556B5D] px-8 py-4 text-[#556B5D] transition hover:bg-[#556B5D] hover:text-white"
              >
                <CalendarDays size={20} />
                Google Calendar
              </a>

              <a
                href="/calendar/mariage.ics"
                className="inline-flex items-center gap-3 rounded-full border border-[#C8A96A] px-8 py-4 text-[#C8A96A] transition hover:bg-[#C8A96A] hover:text-white"
              >
                Télécharger le fichier .ics
              </a>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}*/

"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Camera,
  Music,
  Gift,
  ChevronDown,
} from "lucide-react";

interface ProgramEvent {
  id: number;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  icon: React.ReactNode;
}

export default function Program2() {
  const [selected, setSelected] = useState<number | null>(null);

  const events = useMemo<ProgramEvent[]>(
    () => [
      {
        id: 1,
        time: "15:00",
        title: "Cérémonie de Mariage",
        subtitle: "Échange des vœux",
        description:
          "Nous serons honorés de célébrer notre union en votre présence.",
        location: "Kribi - Mpolongwe",
        icon: <Heart className="w-6 h-6 text-rose-500" />,
      },
      {
        id: 2,
        time: "17:00",
        title: "Séance Photos",
        subtitle: "Moments inoubliables",
        description:
          "Photos avec les mariés, les familles et tous les invités.",
        location: "Plage de Kribi",
        icon: <Camera className="w-6 h-6 text-sky-500" />,
      },
      {
        id: 3,
        time: "19:00",
        title: "Réception",
        subtitle: "Cocktail & Dîner",
        description:
          "Repas, animations, musique et ouverture officielle de la soirée.",
        location: "Salle de Réception",
        icon: <Gift className="w-6 h-6 text-amber-500" />,
      },
      {
        id: 4,
        time: "21:00",
        title: "Soirée Dansante",
        subtitle: "Fête jusqu'au bout de la nuit",
        description:
          "Danse, surprises et célébration avec tous nos invités.",
        location: "Salle principale",
        icon: <Music className="w-6 h-6 text-violet-500" />,
      },
    ],
    []
  );

  return (
    <section
      id="programme"
      className="relative  py-24 px-6 flex h-full flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-background via-emerald-50 to-background"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Sparkles className="absolute top-9 left-116 w-12 h-12 text-sage-500 animate-pulse" />
		 <Sparkles className="absolute top-9 left-350 w-12 h-12 text-sage-500 animate-pulse" />
        <Sparkles className="absolute bottom-20 right-116 w-10 h-10 text-gold-800 animate-pulse" />
        <Sparkles className="absolute bottom-20 left-116 w-10 h-10 text-gold-400 animate-pulse" />
		  <Sparkles className="absolute top-16 left-10 w-12 h-12 text-emerald-500 animate-pulse" />
        <Sparkles className="absolute bottom-20 right-112 w-10 h-10 text-yellow-400 animate-pulse" />
      </div>
    
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <span className="inline-flex items-center gap-2 rounded-full bg-[#A6B8AF] text-emerald-700 px-5 py-2 text-sm font-semibold">

            <Calendar className="w-4 h-4" />

            Programme officiel

          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">

            Notre Journée

          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">

            Découvrez le déroulement complet de cette journée exceptionnelle
            que nous partagerons avec vous.

          </p>

        </div>

        <div className="grid gap-8">
		
		
		
		{events.map((event) => (
            <div
              key={event.id}
              onClick={() =>
                setSelected(selected === event.id ? null : event.id)
              }
              className="
                group
                cursor-pointer
                rounded-3xl
                border
                border-white/40
                bg-white/70
                backdrop-blur-xl
                shadow-xl
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
                overflow-hidden
              "
            >
              <div className="p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div className="flex items-center gap-5">

                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                      {event.icon}
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-gray-900">
                        {event.title}
                      </h3>

                      <p className="text-emerald-600 font-medium">
                        {event.subtitle}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-6 text-gray-600">

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-500" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                      <span>{event.location}</span>
                    </div>

                  </div>

                </div>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    selected === event.id
                      ? "max-h-96 opacity-100 mt-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t pt-6">

                    <p className="text-gray-700 leading-8">
                      {event.description}
                    </p>

                  </div>
                </div>

                <div className="flex justify-center mt-6">

                  <ChevronDown
                    className={`w-6 h-6 text-emerald-600 transition-transform duration-500 ${
                      selected === event.id ? "rotate-180" : ""
                    }`}
                  />

                </div>

              </div>
            </div>
          ))}
		  
		  
		  
		  
		  </div>

        {/* Timeline Premium */}

        <div className="mt-24">

          <div className="text-center mb-12">

            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-4 py-2 font-semibold">
              <Sparkles className="w-4 h-4" />
              Les moments forts
            </span>

            <h3 className="mt-6 text-4xl font-bold text-gray-900">
              Une journée inoubliable
            </h3>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Chaque instant a été soigneusement préparé afin que cette journée
              soit remplie d'émotions, de joie et de souvenirs mémorables.
            </p>

          </div>

          <div className="relative">

            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-300 rounded-full" />

            <div className="space-y-12">

              {events.map((event, index) => (

                <div
                  key={`timeline-${event.id}`}
                  className="relative flex items-start gap-8"
                >

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 shadow-xl text-white font-bold">

                    {index + 1}

                  </div>

                  <div className="flex-1 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-lg p-8 hover:shadow-2xl transition-all duration-500">

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <h4 className="text-2xl font-bold text-gray-900">
                        {event.title}
                      </h4>

                      <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        {event.time}
                      </span>

                    </div>

                    <p className="mt-4 text-gray-700 leading-8">
                      {event.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-emerald-700 font-medium">

                      <MapPin className="w-5 h-5" />

                      {event.location}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
		
		
		
		{/* Section finale */}

        <div className="mt-24">

          <div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white p-12 shadow-2xl">

            <div className="max-w-3xl mx-auto text-center">

              <Heart className="mx-auto w-14 h-14 mb-6 fill-white" />

              <h3 className="text-4xl font-bold">
                Nous avons hâte de partager cette journée avec vous
              </h3>

              <p className="mt-6 text-lg text-emerald-50 leading-8">
                Votre présence est le plus beau cadeau que nous puissions
                recevoir. Merci de célébrer ce moment unique à nos côtés.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
<div className="flex flex-wrap gap-4 mt-8">

  <a
    href="https://www.google.com/maps/search/?api=1&query=Mpolongwe,+Kribi"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[#A8B5A2] hover:bg-[#96A38F] text-white px-6 py-3 transition-all duration-300"
  >
    📍 Itinéraire Kribi - Mpolongwe
  </a>

  <a
    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+Donald+%26+Marie&dates=20261219T150000/20261219T230000&location=Mpolongwe,+Kribi"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[#D6C6A8] hover:opacity-90 text-white px-6 py-3 transition-all duration-300"
  >
    📅 Ajouter à Google Calendar
  </a>

</div>
         

                <div className="rounded-full bg-white/20 backdrop-blur-md px-6 py-3">
                  🕒 Début à 15h00
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}
		
		