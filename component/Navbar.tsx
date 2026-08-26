/*"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F8F6F2]/90 backdrop-blur shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h2 className="text-2xl text-[#556B5D] font-serif">
          DK ❤️ M
        </h2>

        <ul className="hidden md:flex gap-10 text-[#C8A96A]">

          <li><a href="#hero">Accueil</a></li>

          <li><a href="#story">Notre histoire</a></li>

          <li><a href="#gallery">Galerie</a></li>

          <li><a href="#programme">Programme</a></li>

          <li><a href="#rsvp">RSVP</a></li>

        </ul>

      </div>
    </nav>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { title: "Accueil", href: "#hero" },
  { title: "Notre histoire", href: "#story" },
  { title: "Galerie", href: "#gallery" },
  { title: "Programme", href: "#programme" },
  { title: "RSVP", href: "#rsvp" },
  { title: "Livre d'or", href: "#guestbook" },
  { title: "connexion", href: "#localhost:3000/checkin/login" },
];

/*export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);*/
  export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

      const winScroll =
        document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((winScroll / height) * 100);

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
  

    <>

	  
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
    	  
						  <a
				href="#hero"
				className="group"
				>

				<div className="flex items-center gap-2">

				<span className="font-serif text-3xl text-[#556B5D]">
				D
				</span>

				<motion.span

				animate={{
				scale:[1,1.2,1]
				}}

				transition={{
				repeat:Infinity,
				duration:2
				}}

				className="text-[#C8A96A] text-xl"
				>
				♥️
				</motion.span>

				<span className="font-serif text-3xl text-[#556B5D]">
				M
				</span>

				</div>

				<div className="h-[2px] bg-[#C8A96A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"/>

				</a>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[#556B5D] hover:text-[#C6A56B] transition-colors duration-300 group"
              >
                {link.title}

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#C8A96A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
			
			
          </nav>

          {/* Bouton mobile */}
          <button
            className="lg:hidden text-[#556B5D]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#F8F6F2]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-serif text-[#556B5D] hover:text-[#C6A56B] transition"
              >
                {link.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}