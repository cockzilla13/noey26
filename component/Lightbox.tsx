"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

interface LightboxProps {
  images: string[];
  current: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  current,
  onClose,
}: LightboxProps) {

  const [index, setIndex] = useState(current);

  useEffect(() => {
    setIndex(current);
  }, [current]);

  useEffect(() => {

    function handleKey(e: KeyboardEvent) {

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {

        setIndex((old) => (old + 1) % images.length);

      }

      if (e.key === "ArrowLeft") {

        setIndex((old) => (old - 1 + images.length) % images.length);

      }

    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);

  }, [images.length, onClose]);

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-lg"

      >

        {/* Fermer */}

        <button

          onClick={onClose}

          className="absolute top-6 right-6 z-50
          w-12 h-12 rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-white
          hover:bg-white/20 transition"

        >

          <X size={24} />

        </button>

        {/* Gauche */}

        <button

          onClick={() =>
            setIndex((old) => (old - 1 + images.length) % images.length)
          }

          className="absolute left-6 top-1/2 -translate-y-1/2 z-50
          w-14 h-14 rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-white"

        >

          <ChevronLeft size={28} />

        </button>

        {/* Droite */}

        <button

          onClick={() =>
            setIndex((old) => (old + 1) % images.length)
          }

          className="absolute right-6 top-1/2 -translate-y-1/2 z-50
          w-14 h-14 rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-white"

        >

          <ChevronRight size={28} />

        </button>

        {/* Image */}

        <div className="flex items-center justify-center h-full px-6">

          <AnimatePresence mode="wait">

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                scale: .95
              }}

              animate={{
                opacity: 1,
                scale: 1
              }}

              exit={{
                opacity: 0,
                scale: .95
              }}

              transition={{
                duration: .35
              }}

              className="relative
              w-full
              max-w-6xl
              h-[80vh]"

            >

              <Image

                src={images[index]}

                alt={'Photo ${index + 1}'}

                fill

                className="object-contain rounded-3xl"

                priority

              />

            </motion.div>

          </AnimatePresence>

        </div>

        {/* Compteur */}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">

          <div className="px-5 py-2 rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          text-white">

            {index + 1} / {images.length}

          </div>

        </div>

      </motion.div>

    </AnimatePresence>

  );

}