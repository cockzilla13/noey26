"use client";

import { motion } from "framer-motion";

export default function Story() {
  return (
    <section
      id="story"
      className="bg-[#F8F6F2] py-24 px-6"
    >
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">

        <motion.h2
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.8}}
	      className="text-center text-5xl  font-serif text-[#556B5D]"
        >
          Notre Histoire
        </motion.h2>

        <div className="w-24 h-1 bg-[#C8A96A] mx-auto mt-6 rounded-full"/>

        <motion.div
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{delay:.3}}
          className="mt-16 space-y-10 leading-9 text-lg text-gray-700"
        >

          <p>

			Le <strong>15 décembre 2024</strong>, lors d'un anniversaire à Yaoundé, deux chemins se sont croisés presque par hasard.

			Une simple rencontre est devenue une conversation, puis une complicité.

					  </p>

					  <p>

			Comme toutes les belles histoires, la nôtre a connu des moments de doute et une période d'éloignement.

			Mais le temps nous a appris que certaines personnes sont destinées à se retrouver.

					  </p>

					  <p>

			Notre amour s'est construit avec patience, confiance, pardon et respect.

			Jour après jour, nous avons choisi de regarder dans la même direction et de bâtir ensemble notre avenir.

					  </p>

					  <p>

			Le <strong>19 décembre 2026</strong>, entourés de nos familles et de nos amis, nous célébrerons cette promesse d'amour en nous disant « Oui ».

					  </p>
						
        </motion.div>
   
              		<div className="mt-24">

								<div className="border-l-4 border-[#C8A96A] ml-8 pl-10 space-y-16">

								<div>

								<h3 className="text-2xl text-[#556B5D] font-semibold">

								15 décembre 2024

								</h3>

								<p>

								Notre première rencontre à Yaoundé.

								</p>

								</div>

								<div>

								<h3 className="text-2xl text-[#556B5D] font-semibold">

								2025

								</h3>

								<p>

								Notre amour grandit malgré les défis.

								</p>

								</div>

								<div>

								<h3 className="text-2xl text-[#556B5D] font-semibold">

								2026

								</h3>

								<p>

								Les préparatifs du mariage commencent.

								</p>

								</div>

								<div>

								<h3 className="text-2xl text-[#556B5D] font-semibold">

								19 décembre 2026

								</h3>

								<p>

								Notre grand Oui.

								</p>

								</div>

								</div>

								</div>
   
   
   {/* ========================= */}

{/* VIDEO DE KRIBI */}

{/* ========================= */}

<video

autoPlay

muted

loop

playsInline

className="overflow-hidden rounded-[30px] shadow-xl"

>

<source

src="/videos/kribi1.mp4"

type="video/mp4"

/>

</video>
      </div>
    </section>
  );
}