/*"use client";

import Countdown from "react-countdown";

export default function WeddingCountdown() {
  return (
    <Countdown
      date={new Date("2026-12-19T15:00:00")}
      renderer={({ days, hours, minutes, seconds }) => (
        <div className="flex justify-center gap-6 mt-10 flex-wrap">

          <div className="bg-white rounded-3xl shadow-lg p-6 w-24">
            <h2 className="text-4xl font-bold">{days}</h2>
            <p>Jours</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 w-24">
            <h2 className="text-4xl font-bold">{hours}</h2>
            <p>Heures</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 w-24">
            <h2 className="text-4xl font-bold">{minutes}</h2>
            <p>Minutes</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 w-24">
            <h2 className="text-4xl font-bold">{seconds}</h2>
            <p>Secondes</p>
          </div>

        </div>
      )}
    />
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const weddingDate = new Date("2026-12-12T15:00:00");

function calculateTimeLeft(): TimeLeft {

  const difference = weddingDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft(calculateTimeLeft());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const finished =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (finished) {

    return (

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        className="mt-12"

      >

        <div className="rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 px-10 py-8 shadow-2xl">

          <h2 className="text-3xl text-white font-serif">

            ❤️ Aujourd'hui est notre grand jour ❤️

          </h2>

        </div>

      </motion.div>

    );

  }

  return (

    <div className="mt-14">

      <div className="flex flex-wrap justify-center gap-6">

        <TimeCard value={timeLeft.days} label="Jours" />

        <TimeCard value={timeLeft.hours} label="Heures" />

        <TimeCard value={timeLeft.minutes} label="Minutes" />

        <TimeCard value={timeLeft.seconds} label="Secondes" />

      </div>

    </div>

  );

}

interface CardProps {

  value: number;

  label: string;

}

function TimeCard({ value, label }: CardProps) {

  return (

    <motion.div

      whileHover={{

        y: -5,

        scale: 1.05,

      }}

      className="
        relative
        w-28
        h-32
        rounded-[28px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-2xl
        shadow-2xl
        overflow-hidden
      "

    >

      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5" />

      <div className="relative h-full flex flex-col items-center justify-center">

        <AnimatePresence mode="popLayout">

          <motion.div

            key={value}

            initial={{

              y: -30,

              opacity: 0,

            }}

            animate={{

              y: 0,

              opacity: 1,

            }}

            exit={{

              y: 30,

              opacity: 0,

            }}

            transition={{

              duration: .35,

            }}

            className="text-5xl font-bold text-white"

          >

            {value.toString().padStart(2, "0")}

          </motion.div>

        </AnimatePresence>

        <div className="mt-4 uppercase tracking-[4px] text-xs text-white/80">

          {label}

        </div>

      </div>

    </motion.div>

  );

}