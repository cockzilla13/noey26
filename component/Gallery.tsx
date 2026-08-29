/*"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.jpg",
  "/images/photo6.webp",
  "/images/photo7.webp",
  "/images/photo8.webp",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-28 bg-[#FFF8E7]"
    >
      <h2 className="text-center text-5xl font-serif text-[#556B5D]">
        Notre Galerie
      </h2>

      <p className="text-center mt-6 text-gray-600">
        Quelques instants précieux de notre histoire.
      </p>

      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">

        {photos.map((photo, index) => (

          <motion.div
            key={index}
            whileHover={{
              scale:1.04,
              rotate:1
            }}
            transition={{duration:.3}}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >

            <Image
              src={photo}
              alt=""
              width={600}
              height={800}
              className="w-full h-[450px] object-cover"
            />

          </motion.div>

        ))}

      </div>

    </section>
  );
}*/
/*
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "./Lightbox";

const images = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.webp",
  "/images/photo6.webp",
  "/images/photo7.webp",
  "/images/photo8.webp",
    "/images/photo9.jpg",
  "/images/photo10.webp",
  "/images/photo11.jpg",
  "/images/photo12.jpg",
];

export default function Gallery() {

  const [selected, setSelected] = useState<number | null>(null);

  return (

    <section
      id="gallery"
	  className="py-28 px-6 bg-[#F8F6F2]"
    >

 
   <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
                 

	  
      <div className="max-w-7xl mx-auto">

        <motion.h2

          initial={{ opacity:0, y:30 }}

          whileInView={{ opacity:1, y:0 }}
      
	        transition={{duration:.10}}
          viewport={{ once:true }}

          className="text-center font-serif text-5xl text-[#556B5D]"

        >

          Notre Galerie

        </motion.h2>

        <motion.p

          initial={{ opacity:0 }}

          whileInView={{ opacity:1 }}

          transition={{ delay:.2 }}

          className="text-center mt-5 text-gray-500"

        >

          Quelques instants de notre histoire.

        </motion.p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-16">

          {images.map((image,index)=>(

            <motion.div

              key={image}

              whileHover={{

                scale:1.02

              }}

              className="mb-5 break-inside-avoid cursor-pointer"

              onClick={()=>setSelected(index)}

            >

              <div className="overflow-hidden rounded-[30px] shadow-xl">

                <Image

                  src={image}

                  alt={'Photo ${index+1}'}

                  width={800}

                  height={1000}

                  className="w-full object-cover transition duration-700 hover:scale-110"

                />

              </div>

            </motion.div>

          ))}
   
		 </div>
		 
        </div>
	     {/* ========================= *}

{/* VIDEO DE KRIBI *}

{/* ========================= *}

<video

autoPlay

muted

loop

playsInline

className="overflow-hidden rounded-[30px] shadow-xl"

>

<source

src="/videos/kribi2.mp4"

type="video/mp4"

/>

</video>
      </div>

      {selected !== null && (

        <Lightbox

          images={images}

          current={selected}

          onClose={()=>setSelected(null)}

        />

      )}

    </section>

  );

}*/
/*"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";

const images = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.webp",
  "/images/photo6.webp",
  "/images/photo7.webp",
  "/images/photo8.webp",
  "/images/photo9.jpg",
  "/images/photo10.webp",
  "/images/photo11.jpg",
  "/images/photo12.jpg",
];

const videos = [
  "/videos/kribi1.mp4",
  "/videos/kribi2.mp4",
];

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay={visible}
      muted
      loop
      playsInline
      preload="none"
      className="
        block
        aspect-video
        h-auto
        w-full
        object-cover
      "
    >
      {visible && (
        <source
          src={src}
          type="video/mp4"
        />
      )}

      Votre navigateur ne prend pas en charge la lecture vidéo.
    </video>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="
        w-full
        overflow-hidden
        bg-[#F8F6F2]
        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:py-28
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* =========================================
            TITRE
        ========================================= *}

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
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-2xl text-center"
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
            Notre Galerie
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-gray-500

              sm:mt-5
              sm:text-base
            "
          >
            Quelques instants de notre histoire.
          </p>
        </motion.div>

        {/* =========================================
            GALERIE PHOTOS
        ========================================= *}

        <div
          className="
            mt-12
            columns-1
            gap-4

            sm:columns-2
            sm:gap-5

            lg:mt-16
            lg:columns-3
          "
        >
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: Math.min(index * 0.05, 0.4),
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="
                mb-4
                break-inside-avoid
                cursor-pointer

                sm:mb-5
              "
              onClick={() => setSelected(index)}
            >
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-lg

                  sm:rounded-3xl
                "
              >
                <Image
                  src={image}
                  alt={`Photo ${index + 1} de notre mariage`}
                  width={800}
                  height={1000}
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 50vw,
                    33vw
                  "
                  className="
                    h-auto
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/10
                  "
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================================
            VIDÉOS
        ========================================= *}

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
            mt-16
            grid
            grid-cols-1
            gap-6

            sm:mt-20
            sm:gap-8

            lg:mt-24
            lg:grid-cols-2
          "
        >
          {videos.map((video, index) => (
            <div
              key={video}
              className="
                overflow-hidden
                rounded-2xl
                bg-black
                shadow-2xl

                sm:rounded-3xl
              "
            >
              <LazyVideo src={video} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* =========================================
          LIGHTBOX
      ========================================= *}

      {selected !== null && (
        <Lightbox
          images={images}
          current={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}*/

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";

const images = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.webp",
  "/images/photo6.webp",
  "/images/photo7.webp",
  "/images/photo8.webp",
  "/images/photo9.jpg",
  "/images/photo10.webp",
  "/images/photo11.jpg",
  "/images/photo12.jpg",
];

const videos = [
  "/videos/kribi1-web.mp4",
  "/videos/kribi2-web.mp4",
];

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

    // Vérifie si IntersectionObserver est disponible
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

    /*
     * Certains navigateurs nécessitent que load()
     * soit appelé après que la vidéo soit rendue.
     */
    video.load();

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay éventuellement bloqué par le navigateur.
        // La vidéo reste utilisable avec les contrôles.
      });
    }
  }, [visible]);

  return (
    <div
      className="
        relative
        aspect-video
        w-full
        overflow-hidden
        bg-[#111]
      "
    >
      {/* Image de fond pendant le chargement */}
      {!loaded && !error && (
        <div
          className="
            absolute
            inset-0
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

      {/* Erreur */}
      {error && (
        <div
          className="
            absolute
            inset-0
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
          <span className="text-3xl">
            🎥
          </span>

          <p className="mt-3 text-sm text-white/70">
            Cette vidéo ne peut pas être chargée.
          </p>
        </div>
      )}

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
        onLoadedMetadata={() => {
          setLoaded(true);
        }}
        onCanPlay={() => {
          setLoaded(true);
        }}
        onError={() => {
          setError(true);
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        Votre navigateur ne prend pas en charge
        la lecture vidéo.
      </video>
    </div>
  );
}

/* =====================================================
   GALLERY
===================================================== */

export default function Gallery() {
  const [selected, setSelected] =
    useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="
        w-full
        overflow-hidden
        bg-[#F8F6F2]
        px-4
        py-16

        sm:px-6
        sm:py-20

        md:py-24

        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* =================================================
            TITRE
        ================================================= */}

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
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mx-auto
            max-w-2xl
            text-center
          "
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
            Notre Galerie
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-gray-500

              sm:mt-5
              sm:text-base
            "
          >
            Quelques instants de notre histoire.
          </p>
        </motion.div>

        {/* =================================================
            PHOTOS
        ================================================= */}

        <div
          className="
            mt-10
            columns-1
            gap-4

            sm:mt-12
            sm:columns-2
            sm:gap-5

            lg:mt-16
            lg:columns-3
          "
        >
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: Math.min(
                  index * 0.05,
                  0.4
                ),
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="
                mb-4
                break-inside-avoid
                cursor-pointer

                sm:mb-5
              "
              onClick={() =>
                setSelected(index)
              }
            >
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-lg

                  sm:rounded-3xl
                "
              >
                <Image
                  src={image}
                  alt={`Photo ${index + 1} de notre mariage`}
                  width={800}
                  height={1000}
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 50vw,
                    33vw
                  "
                  className="
                    h-auto
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/10
                  "
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* =================================================
            VIDEOS
        ================================================= */}

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
            mt-14
            grid
            grid-cols-1
            gap-6

            sm:mt-20
            sm:gap-8

            lg:mt-24
            lg:grid-cols-2
          "
        >
          {videos.map((video, index) => (
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
      </div>

      {/* =================================================
          LIGHTBOX
      ================================================= */}

      {selected !== null && (
        <Lightbox
          images={images}
          current={selected}
          onClose={() =>
            setSelected(null)
          }
        />
      )}
    </section>
  );
}