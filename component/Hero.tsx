"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiBigDiamondRing } from "react-icons/gi";
import WeddingCountdown from "./Countdown";
import { trackVisitor } from "@/lib/trackVisitor";

const images = [
  "/images/couple.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo5.jpg",
  "/images/photo12.jpg",
];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  /* =========================================
     TRACKING VISITEUR
  ========================================= */

  useEffect(() => {

    // Enregistre la visite de la page d'accueil
    // avec :
    // - latitude
    // - longitude
    // - ville
    // - pays
    // - appareil / navigateur
    //
    // Le trackVisitor gère lui-même les erreurs.
    
    trackVisitor("home");

  }, []);


  /* =========================================
     SLIDESHOW
  ========================================= */

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrent((old) =>
        (old + 1) % images.length
      );

    }, 15000);

    return () =>
      clearInterval(timer);

  }, []);


  return (

    <section
      id="hero"
      className="
        relative
        min-h-[100svh]
        w-full
        overflow-hidden
      "
    >

      {/* =========================================
          IMAGE DE FOND
      ========================================= */}

      <AnimatePresence mode="wait">

        <motion.div
          key={current}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 2,
          }}
          className="
            absolute
            inset-0
          "
        >

          <Image
            src={images[current]}
            alt="Les futurs mariés"
            fill
            priority={current === 0}
            quality={90}
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

        </motion.div>

      </AnimatePresence>


      {/* =========================================
          VOILE SOMBRE
      ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/35
        "
      />


      {/* =========================================
          DÉGRADÉ
      ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/40
          via-black/10
          to-[#F8F6F2]
        "
      />


      {/* =========================================
          CONTENU
      ========================================= */}

      <div
        className="
          relative
          z-20
          flex
          min-h-[100svh]
          flex-col
          items-center
          justify-center
          px-4
          py-24
          text-center

          sm:px-6
          sm:py-28

          lg:px-8
          lg:py-32
        "
      >

        {/* SURTITRE */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="
            text-xs
            font-medium
            uppercase
            tracking-[0.35em]
            text-white

            sm:text-sm
            sm:tracking-[0.5em]
          "
        >
          Notre Mariage
        </motion.p>


        {/* =========================================
            DONALD KEVIN
        ========================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            mt-4
            font-serif
            text-6xl
            leading-none
            text-[#556B5D]

            sm:mt-5
            sm:text-7xl

            md:text-8xl

            lg:text-9xl
          "
        >
          Donald Kevin
        </motion.h1>


        {/* =========================================
            ALLIANCE
        ========================================= */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            my-3
            flex
            items-center
            justify-center
            text-[#C8A96A]

            sm:my-5
          "
        >

          <GiBigDiamondRing
            size={36}
            className="
              text-[#C3A76A]
              sm:h-10
              sm:w-10
            "
          />

        </motion.div>


        {/* =========================================
            MARIE
        ========================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 1,
          }}
          className="
            font-serif
            text-6xl
            leading-none
            text-[#556B5D]

            sm:text-7xl

            md:text-8xl

            lg:text-9xl
          "
        >
          Marie
        </motion.h1>


        {/* =========================================
            DATE
        ========================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 1,
          }}
          className="
            mt-5
            text-base
            tracking-[0.2em]
            text-white

            sm:mt-7
            sm:text-xl
            sm:tracking-[0.3em]

            md:text-2xl
          "
        >
          12 Décembre 2026
        </motion.p>


        {/* =========================================
            CITATION
        ========================================= */}

        <motion.blockquote
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
            duration: 1,
          }}
          className="
            mt-6
            max-w-[90%]
            text-center
            text-sm
            italic
            leading-6
            text-[#FEFEE2]

            sm:mt-8
            sm:max-w-2xl
            sm:text-base
            sm:leading-7

            md:text-lg
            md:leading-8
          "
        >

          « Aimer, ce n'est pas se regarder l'un l'autre,
          c'est regarder ensemble dans la même direction ;
          participer, contribuer et construire côte à côte
          un avenir radieux. »

          <br />

          <span
            className="
              mt-2
              inline-block
              text-xs
              not-italic
              text-[#C8A96A]

              sm:text-sm
            "
          >
            — Inspiré d'Antoine de Saint-Exupéry
          </span>

        </motion.blockquote>


        {/* =========================================
            COMPTE À REBOURS
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.5,
            duration: 0.8,
          }}
          className="
            mt-6
            w-full
            max-w-[360px]

            sm:mt-8
            sm:max-w-md

            md:max-w-lg
          "
        >

          <WeddingCountdown />

        </motion.div>


        {/* =========================================
            SÉPARATEUR
        ========================================= */}

        <div
          className="
            mx-auto
            mt-6
            h-px
            w-full
            max-w-[280px]
            bg-white/30

            sm:mt-8
            sm:max-w-md
          "
        />


        {/* =========================================
            BOUTON
        ========================================= */}

        <motion.a
          href="#story"
          whileHover={{
            scale: 1.04,
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            mt-7
            inline-flex
            min-h-[52px]
            w-full
            max-w-[300px]
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-white/30
            bg-white/15
            px-6
            py-3
            text-sm
            font-medium
            text-white
            shadow-2xl
            backdrop-blur-xl
            transition-all

            sm:mt-9
            sm:max-w-[320px]
            sm:px-8
            sm:py-4
            sm:text-base
          "
        >

          Découvrir notre histoire

          <motion.span
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            aria-hidden="true"
          >
            ↓
          </motion.span>

        </motion.a>

      </div>

    </section>

  );

}