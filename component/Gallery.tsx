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

}