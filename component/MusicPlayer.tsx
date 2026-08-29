/*"use client";

import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
    } else {
      audio.current.play();
    }

    setPlaying(!playing);
  }

  return (
    <>
      <audio
        ref={audio}
        src="/music/audioWS.mp3"
        loop
      />

      <button
        onClick={toggle}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[#556B5D] text-white shadow-xl"
      >
        {playing ? "❚❚" : "▶️"}
      </button>
    </>
  );
}*/

/*
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("music-playing");

    if (saved === "true") {
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current
        .play()
        .catch(() => console.log("Lecture bloquée jusqu'à une interaction utilisateur."));
    } else {
      audioRef.current.pause();
    }

    localStorage.setItem("music-playing", playing.toString());
  }, [playing]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/audioWS.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ x: 120 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed right-5 bottom-6 z-[100]"
      >
        <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-full shadow-2xl overflow-hidden">

          <AnimatePresence>

            {opened && (

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-3 px-5 py-4"
              >

                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-12 h-12 rounded-full bg-[#8FA68E] text-sage flex items-center justify-center hover:scale-110 transition"
                >
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  onClick={() => setMuted(!muted)}
                  className="w-12 h-12 rounded-full bg-[#8FA68E] text-sage flex items-center justify-center hover:scale-110 transition"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

           

              </motion.div>

            )}

          </AnimatePresence>

          <button
            onClick={() => setOpened(!opened)}
            className="w-14 h-14 flex items-center justify-center text-sage"
          >
            <motion.div
              animate={{
                rotate: playing ? 360 : 0
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Music2 size={26} />
            </motion.div>
          </button>

        </div>
      </motion.div>
    </>
  );
}*/

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [opened, setOpened] = useState(false);

  // Récupère l'état précédent
  useEffect(() => {
    try {
      const saved = localStorage.getItem("music-playing");

      if (saved === "true") {
        setPlaying(true);
      }
    } catch {
      // localStorage indisponible
    }
  }, []);

  // Lecture / pause
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio
        .play()
        .catch(() => {
          // Les navigateurs peuvent bloquer
          // la lecture automatique.
          setPlaying(false);
        });
    } else {
      audio.pause();
    }

    try {
      localStorage.setItem(
        "music-playing",
        playing.toString()
      );
    } catch {
      // localStorage indisponible
    }
  }, [playing]);

  // Mute
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = muted;
  }, [muted]);

  // Ferme le panneau avec Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpened(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        playsInline
      >
        <source
          src="/music/audioWS.mp3"
          type="audio/mpeg"
        />
      </audio>

      <motion.div
        initial={{
          opacity: 0,
          x: 80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.5,
        }}
        className="
          fixed
          right-3
          sm:right-5
          bottom-3
          sm:bottom-5
          md:bottom-6
          z-[100]
          max-w-[calc(100vw-1.5rem)]
          sm:max-w-none
        "
        style={{
          paddingBottom:
            "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className="
            flex
            items-center
            rounded-full
            border
            border-white/30
            bg-white/20
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
          "
        >
          <AnimatePresence initial={false}>
            {opened && (
              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: "auto",
                  opacity: 1,
                }}
                exit={{
                  width: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-3
                  px-2
                  sm:px-4
                  py-2
                  overflow-hidden
                "
              >
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={() =>
                    setPlaying((value) => !value)
                  }
                  aria-label={
                    playing
                      ? "Mettre la musique en pause"
                      : "Lire la musique"
                  }
                  className="
                    flex
                    h-10
                    w-10
                    sm:h-12
                    sm:w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#8FA68E]
                    text-white
                    shadow-md
                    transition
                    hover:scale-105
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white/70
                  "
                >
                  {playing ? (
                    <Pause
                      size={18}
                      className="sm:hidden"
                    />
                  ) : (
                    <Play
                      size={18}
                      className="sm:hidden"
                    />
                  )}

                  {playing ? (
                    <Pause
                      size={20}
                      className="hidden sm:block"
                    />
                  ) : (
                    <Play
                      size={20}
                      className="hidden sm:block"
                    />
                  )}
                </button>

                {/* Mute */}
                <button
                  type="button"
                  onClick={() =>
                    setMuted((value) => !value)
                  }
                  aria-label={
                    muted
                      ? "Activer le son"
                      : "Couper le son"
                  }
                  className="
                    flex
                    h-10
                    w-10
                    sm:h-12
                    sm:w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#8FA68E]
                    text-white
                    shadow-md
                    transition
                    hover:scale-105
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white/70
                  "
                >
                  {muted ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton principal */}
          <button
            type="button"
            onClick={() =>
              setOpened((value) => !value)
            }
            aria-label={
              opened
                ? "Fermer les contrôles audio"
                : "Ouvrir les contrôles audio"
            }
            aria-expanded={opened}
            className="
              flex
              h-12
              w-12
              sm:h-14
              sm:w-14
              shrink-0
              items-center
              justify-center
              text-[#435141]
              transition
              hover:bg-white/10
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-white/70
              focus:ring-inset
            "
          >
            <motion.div
              animate={{
                rotate: playing ? 360 : 0,
              }}
              transition={{
                duration: 6,
                repeat: playing ? Infinity : 0,
                ease: "linear",
              }}
            >
              <Music2
                size={22}
                className="sm:hidden"
              />

              <Music2
                size={26}
                className="hidden sm:block"
              />
            </motion.div>
          </button>
        </div>
      </motion.div>
    </>
  );
}