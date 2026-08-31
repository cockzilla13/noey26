"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const videos = ["/videos/kribi1-web.mp4"];

/* =====================================================
VIDEO LAZY LOAD
===================================================== */

function LazyVideo({ src }: { src: string }) {
const videoRef = useRef<HTMLVideoElement>(null);

const [visible, setVisible] = useState(false);
const [loaded, setLoaded] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
const video = videoRef.current;

if (!video) return;

if (!("IntersectionObserver" in window)) {
  setVisible(true);
  return;
}

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setVisible(true);
      observer.disconnect();
    }
  },
  {
    rootMargin: "500px 0px",
    threshold: 0.01,
  }
);

observer.observe(video);

return () => {
  observer.disconnect();
};

}, []);

useEffect(() => {
const video = videoRef.current;

if (!video || !visible) return;

video.load();

const playPromise = video.play();

if (playPromise !== undefined) {
  playPromise.catch(() => {
    // Autoplay éventuellement bloqué.
  });
}

}, [visible]);

return (
<div className="relative aspect-video w-full overflow-hidden bg-[#111]">
{/* =====================================================
CHARGEMENT
===================================================== */}

  {!loaded && !error && (
    <div
      className="
        absolute
        inset-0
        z-10
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#1a1a1a]
        to-[#050505]
      "
    >
      <div
        className="
          h-8
          w-8
          animate-spin
          rounded-full
          border-2
          border-white/20
          border-t-white/80
        "
      />
    </div>
  )}

  {/* =====================================================
      ERREUR
  ===================================================== */}

  {error && (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        flex-col
        items-center
        justify-center
        bg-[#111]
        px-6
        text-center
        text-white
      "
    >
      <span className="text-3xl">🎥</span>

      <p className="mt-3 text-sm text-white/70">
        Cette vidéo ne peut pas être chargée.
      </p>
    </div>
  )}

  {/* =====================================================
      VIDÉO
  ===================================================== */}

  <video
    ref={videoRef}
    src={visible ? src : undefined}
    autoPlay={visible}
    muted
    loop
    playsInline
    controls
    preload="metadata"
    poster="/images/video-poster.jpg"
    onLoadedMetadata={() => setLoaded(true)}
    onCanPlay={() => setLoaded(true)}
    onError={() => setError(true)}
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
  >
    Votre navigateur ne prend pas en charge la lecture vidéo.
  </video>
</div>

);
}

/* =====================================================
STORY
===================================================== */

export default function Story() {
return (
<section
id="story"
className="
bg-[#F8F6F2]
px-6
py-24
"
>
{/* =====================================================
CONTENEUR PRINCIPAL CENTRÉ
===================================================== */}

  <div
    className="
      relative
      z-20
      mx-auto
      flex
      w-full
      max-w-4xl
      flex-col
      items-center
      justify-center
      text-center
    "
  >
    {/* =====================================================
        TITRE
    ===================================================== */}

    <motion.h2
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
      }}
      className="
        font-serif
        text-4xl
        text-[#556B5D]

        sm:text-5xl
      "
    >
      Notre Histoire
    </motion.h2>

    {/* Ligne décorative */}

    <div
      className="
        mx-auto
        mt-6
        h-1
        w-24
        rounded-full
        bg-[#C8A96A]
      "
    />

    {/* =====================================================
        HISTOIRE
    ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        delay: 0.3,
        duration: 0.8,
      }}
      viewport={{
        once: true,
      }}
      className="
        mx-auto
        mt-16
        w-full
        max-w-2xl
        space-y-8
        text-center
        text-lg
        leading-8
        text-gray-700

        sm:space-y-10
        sm:leading-9
      "
    >
      <p>
        Le <strong>15 décembre 2024</strong>, lors d'un anniversaire à
        Yaoundé, deux chemins se sont croisés presque par hasard.
      </p>

      <p>
        Une simple rencontre, plusieurs danses, une jovialité partagée,
        une petite crise respiratoire, une intervention spontanée suivie
        d'une conversation, puis une complicité.
      </p>

      <p>
        Comme toutes les belles histoires, la nôtre a connu des moments de
        doute et une période d'éloignement.
      </p>

      <p>
        Mais le temps nous a appris que certaines personnes sont destinées
        à se retrouver.
      </p>

      <p>
        Notre amour s'est construit avec patience, confiance, pardon et
        respect.
      </p>

      <p>
        Jour après jour, nous avons choisi de regarder dans la même
        direction et de bâtir ensemble notre avenir.
      </p>

      <p>
        Le <strong>12 décembre 2026</strong>, entourés de nos familles et
        de nos amis, nous célébrerons cette promesse d'amour en nous disant
        « Oui ».
      </p>
    </motion.div>

    {/* =====================================================
        CHRONOLOGIE
    ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
      }}
      className="
        mx-auto
        mt-24
        w-full
        max-w-2xl
        text-left
      "
    >
      <div
        className="
          ml-3
          space-y-14
          border-l-2
          border-[#C8A96A]
          pl-7

          sm:ml-8
          sm:space-y-16
          sm:border-l-4
          sm:pl-10
        "
      >
        {/* =================================================
            2024
        ================================================= */}

        <div className="relative">
          <span
            className="
              absolute
              -left-[38px]
              top-1
              h-4
              w-4
              rounded-full
              border-2
              border-[#C8A96A]
              bg-[#F8F6F2]

              sm:-left-[50px]
            "
          />

          <h3
            className="
              text-2xl
              font-semibold
              text-[#556B5D]
            "
          >
            15 décembre 2024
          </h3>

          <p className="mt-2 text-gray-700">
            Notre première rencontre à Yaoundé.
          </p>
        </div>

        {/* =================================================
            2025
        ================================================= */}

        <div className="relative">
          <span
            className="
              absolute
              -left-[38px]
              top-1
              h-4
              w-4
              rounded-full
              border-2
              border-[#C8A96A]
              bg-[#F8F6F2]

              sm:-left-[50px]
            "
          />

          <h3
            className="
              text-2xl
              font-semibold
              text-[#556B5D]
            "
          >
            2025
          </h3>

          <p className="mt-2 text-gray-700">
            Notre amour grandit malgré les défis.
          </p>
        </div>

        {/* =================================================
            2026
        ================================================= */}

        <div className="relative">
          <span
            className="
              absolute
              -left-[38px]
              top-1
              h-4
              w-4
              rounded-full
              border-2
              border-[#C8A96A]
              bg-[#F8F6F2]

              sm:-left-[50px]
            "
          />

          <h3
            className="
              text-2xl
              font-semibold
              text-[#556B5D]
            "
          >
            2026
          </h3>

          <p className="mt-2 text-gray-700">
            Les préparatifs du mariage commencent.
          </p>
        </div>

        {/* =================================================
            MARIAGE
        ================================================= */}

        <div className="relative">
          <span
            className="
              absolute
              -left-[38px]
              top-1
              h-4
              w-4
              rounded-full
              border-2
              border-[#C8A96A]
              bg-[#F8F6F2]

              sm:-left-[50px]
            "
          />

          <h3
            className="
              text-2xl
              font-semibold
              text-[#556B5D]
            "
          >
            12 décembre 2026
          </h3>

          <p className="mt-2 text-gray-700">
            Notre grand « Oui ».
          </p>
        </div>
      </div>
    </motion.div>

    {/* =====================================================
        VIDÉO KRIBI 1
    ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        mx-auto
        mt-20
        w-full
        max-w-3xl
      "
    >
      {videos.map((video) => (
        <motion.div
          key={video}
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            overflow-hidden
            rounded-2xl
            bg-black
            shadow-2xl

            sm:rounded-3xl
          "
        >
          <LazyVideo src={video} />
        </motion.div>
      ))}
    </motion.div>

    {/* =====================================================
        VIDÉO KRIBI 3
    =====================================================

    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        mx-auto
        mt-10
        w-full
        max-w-3xl
        overflow-hidden
        rounded-2xl
        bg-black
        shadow-2xl

        sm:rounded-3xl
      "
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        className="
          aspect-video
          h-auto
          w-full
          object-cover
        "
      >
        <source
          src="/videos/kribi3.mp4"
          type="video/mp4"
        />

        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
    </motion.div> */}
  </div>
</section>

);
}