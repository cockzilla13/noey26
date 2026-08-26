/*"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Wine,
  UtensilsCrossed,
  Music4,
  MapPin,
  Clock
} from "lucide-react";

export default function Program() {
  return (
    <section
      id="programme"
      className="bg-[#F8F6F2] py-28 px-6"
    >
      <div className=" mx-auto  flex h-full flex-col items-center justify-center text-center px-6">

        <motion.h2
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.8}}
          className="text-center text-5xl font-serif text-[#556B5D]"
        >
          Le Grand Jour
        </motion.h2>

        <p className="text-center mt-5 text-gray-600">
          Nous serions honorés de partager cette journée avec vous.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-20">

          <Card
            icon={<Building2 size={42}/>}
            title="Cérémonie"
            hour="15 h 00"
            text="Échange de nos vœux et célébration de notre union."
          />

          <Card
            icon={<Wine size={42}/>}
            title="Cocktail"
            hour="17 h 00"
            text="Moment convivial avec les invités."
          />

          <Card
            icon={<UtensilsCrossed size={42}/>}
            title="Réception"
            hour="19 h 00"
            text="Dîner et festivités."
          />

          <Card
            icon={<Music4 size={42}/>}
            title="Soirée dansante"
            hour="20 h 30"
            text="Place à la fête jusqu'au bout de la nuit."
          />

        </div>
			 <div className="mt-24">

			<h2 className="text-center text-4xl font-serif text-[#556B5D]">

			Lieu de la cérémonie

			</h2>

			<p className="text-center mt-4">

			📍 Mpolongwe • Kribi

			</p>

					
		</div>
      </div><div className="rounded-3xl overflow-hidden shadow-xl mt-10">

					<iframe

					src="https://www.google.com/maps?q=Mpolongwe+Kribi&output=embed"

					width="100%"

					height="500"

					loading="lazy"

					style={{border:0}}

					></iframe>
			   
						   <a

					href="https://www.google.com/maps/search/Mpolongwe+-+Kribi"

					target="_blank"

					className="inline-block mt-10 bg-[#556B5D] text-white px-8 py-4 rounded-full"

					>

					Ouvrir dans Google Maps

					</a>
				  </div>

    </section>
  );
}

function Card({
  icon,
  title,
  hour,
  text
}:any){

return(

<div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all">

<div className="text-[#C8A96A]">

{icon}

</div>

<h3 className="text-3xl mt-6 text-[#556B5D]">

{title}

</h3>

<div className="flex items-center mt-4 gap-2">

<Clock size={20}/>

{hour}

</div>

<p className="mt-5 text-gray-600">

{text}

</p>

</div>

)

}*"use client";

import { motion } from "framer-motion";
import {
  Church,
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
    title: "Cérémonie Religieuse",
    description:
      "Nous échangerons nos vœux devant Dieu entourés de nos familles et de nos proches.",
    icon: Church,
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
      id="program"
      className="relative overflow-hidden  bg-[#F8F6F2] py-28"
    >
	
	  <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
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
</div>
    </section>

  );

}*/


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
      {/* Décor */}
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
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Sparkles className="absolute top-9 left-116 w-12 h-12 text-sfelted-500 animate-pulse" />
		 <Sparkles className="absolute top-9 left-350 w-12 h-12 text-sfelted-500 animate-pulse" />
        <Sparkles className="absolute bottom-20 right-116 w-10 h-10 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-20 left-116 w-10 h-10 text-yellow-400 animate-pulse" />
      </div>
        {/* Timeline */}

        <div className="relative mt-24">

          {/* Ligne centrale */}

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
                {/* Point central */}

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

                {/* Carte */}

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
                  {/* En-tête */}

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

                  {/* Corps */}

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


        {/* ================= Dress Code ================= */}

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

        {/* ================= Lieu ================= */}

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

}