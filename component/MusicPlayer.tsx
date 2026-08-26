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
}