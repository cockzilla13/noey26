/*"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  onEnter: () => void;
}

export default function Loader({ onEnter }: LoaderProps) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">

      <motion.h1

        initial={{ opacity:0,y:30 }}

        animate={{ opacity:1,y:0 }}

        transition={{ duration:1 }}

        className="text-white text-6xl font-serif"

      >

        Donald Kevin

      </motion.h1>

      <motion.div

        animate={{ scale:[1,1.3,1] }}

        transition={{ repeat:Infinity,duration:2 }}

        className="text-[#C8A96A] text-5xl my-6"

      >

        ❤️

      </motion.div>

      <motion.h1

        initial={{ opacity:0,y:30 }}

        animate={{ opacity:1,y:0 }}

        transition={{ delay:.3 }}

        className="text-white text-6xl font-serif"

      >

        Marie

      </motion.h1>

      <p className="mt-8 text-white">

        19 Décembre 2026

      </p>

      <button

        onClick={onEnter}

        className="mt-14 px-10 py-4 rounded-full bg-[#556B5D] text-white"

      >

        Entrer dans notre univers

      </button>

    </div>
  );
}*/

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onFinish();
      }, 1200);

    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>

      {visible && (

        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5EF] via-[#EEF3EA] to-[#D9E5D4]" />

          {/* Blur */}
          <div className="absolute inset-0 backdrop-blur-xl" />

          {/* Halo */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [.25, .45, .25]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className="absolute w-96 h-96 rounded-full bg-[#9CB79A] blur-3xl"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: .8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              duration: 1.4
            }}
            className="relative flex flex-col items-center"
          >

            <motion.div

              animate={{
                rotate: [0, 3, -3, 0]
              }}

              transition={{
                duration: 6,
                repeat: Infinity
              }}

              className="relative"
            >

              <div className="w-40 h-40 rounded-full border border-white/40 bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">

                <div className="text-center">

                  <h1 className="font-serif text-6xl text-[#58725C] tracking-widest">
                    D
                    <span className="mx-2 text-[#B9925A]">
                      ♥️
                    </span>
                    M
                  </h1>

                </div>

              </div>

            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-[#5E715E] tracking-[8px] uppercase text-sm"
            >
              Donald Kevin & Marie
            </motion.h2>

       <motion.p

              initial={{ opacity: 0 }}

              animate={{
                opacity: [0,1,.6,1]
              }}

              transition={{
                delay: 1.6,
                duration: 2
              }}

              className="mt-3 text-[#8C8C8C] italic"
            >
                 Les familles Youmbi/Mbagofa & Zingui
            </motion.p>
            <motion.p

              initial={{ opacity: 0 }}

              animate={{
                opacity: [0,1,.6,1]
              }}

              transition={{
                delay: 1.6,
                duration: 2
              }}

              className="mt-3 text-[#8C8C8C] italic"
            >
              12 Décembre 2026 • Kribi
            </motion.p>

            {/* Barre */}

            <div className="mt-10 w-72 h-[3px] bg-white/30 rounded-full overflow-hidden">

              <motion.div

                initial={{ width: 0 }}

                animate={{
                  width: "100%"
                }}

                transition={{
                  duration: 4,
                  ease: "easeInOut"
                }}

                className="h-full bg-gradient-to-r from-[#A7BBA2] via-[#FFFFFF] to-[#C9AE79]"
              />
              

            </div>
    
          </motion.div>
 
        </motion.div>

      )}

    </AnimatePresence>
  );
}