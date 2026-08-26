/*"use client";

import { motion } from "framer-motion";

export default function FloatingPetals() {
  const petals = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            y: -100,
            x: '${Math.random() * 100}vw',
            opacity: 0.8,
          }}
          animate={{
            y: "110vh",
            rotate: 360,
            x: '${Math.random() * 100}vw',
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          🌿
        </motion.div>
      ))}
    </div>
  );
}*/
/*"use client";

import { motion } from "framer-motion";

const petals = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: '${5 + i * 5}%',
  duration: 10 + (i % 5) * 2,
  delay: i * 0.4,
  size: 18 + (i % 4) * 6,
}));

export default function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -100,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            rotate: 360,
            x: [0, 20, -20, 15, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
          style={{
            left: petal.left,
            fontSize: petal.size,
            position: "absolute",
          }}
        >
          🍃 🍃 🍃
        </motion.div>
      ))}
    </div>
  );
}*/

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const leaves = Array.from({ length: 24 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100,
  size: 24 + Math.random() * 28,
  duration: 12 + Math.random() * 10,
  delay: Math.random() * 12,
  rotate: Math.random() * 360,
}));

export default function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">

      {leaves.map((leaf) => (

        <motion.div
          key={leaf.id}
          initial={{
            y: -120,
            x: 0,
            rotate: leaf.rotate,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [0, 20, -20, 30, -10, 0],
            rotate: leaf.rotate + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: "linear",
            delay: leaf.delay,
          }}
          style={{
            position: "absolute",
            left: '${leaf.left}%',
          }}
        >
          <Image
            src="/eucalyptus.svg"
            alt=""
            width={leaf.size}
            height={leaf.size}
            draggable={false}
			className="opacity-80 leaf-glow"
           // className="drop-shadow-xl opacity-80"
          />
		   <Image
            src="/petaleBl.svg"
            alt=""
            width={leaf.size}
            height={leaf.size}
            draggable={false}
			//className="opacity-80 leaf-glow"
            className="drop-shadow-xl opacity-80"
          />
		   /*<Image
            src="/petalevr.svg"
            alt=""
            width={leaf.size}
            height={leaf.size}
            draggable={false}
			//className="opacity-80 leaf-glow"
            className="drop-shadow-xl opacity-80"
          />*/
		   <Image
            src="/particLDr.svg"
            alt=""
            width={leaf.size}
            height={leaf.size}
            draggable={false}
			//className="opacity-80 leaf-glow"
            className="drop-shadow-xl opacity-80"
          />
        </motion.div>

      ))}

    </div>
  );
}