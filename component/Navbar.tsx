/*
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { title: "Accueil", href: "#hero" },
  { title: "Notre histoire", href: "#story" },
  { title: "Galerie", href: "#gallery" },
  { title: "Programme", href: "#programme" },
  { title: "RSVP", href: "#rsvp" },
  { title: "Livre d'or", href: "#guestbook" },
  { title: "Staff", href: "#/app/checkin/login" },
 ];


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

          {/* Logo *}
    	  
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

<Link
 href="/checkin/login"
 className="
 text-[#435141]
 hover:text-[#C3A76A]
 transition
 "
>
 Staff
</Link>
          {/* Desktop *}
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

          {/* Bouton mobile *}
          <button
            className="lg:hidden text-[#556B5D]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Menu mobile *}
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
*/


//##################


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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percentage =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Bloque le scroll lorsque le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermer avec Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/20 bg-white/20 shadow-xl backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:h-[80px]
            lg:px-8
          "
        >
          {/* LOGO */}
          <a
            href="#hero"
            className="group shrink-0"
            onClick={() => setOpen(false)}
            aria-label="Retour à l'accueil"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-2xl text-[#556B5D] sm:text-3xl">
                D
              </span>

              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="text-lg text-[#C8A96A] sm:text-xl"
                aria-hidden="true"
              >
                ♥️
              </motion.span>

              <span className="font-serif text-2xl text-[#556B5D] sm:text-3xl">
                M
              </span>
            </div>

            <div className="h-[2px] origin-left scale-x-0 bg-[#C8A96A] transition-transform duration-300 group-hover:scale-x-100" />
          </a>

          {/* NAVIGATION DESKTOP */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  group
                  relative
                  whitespace-nowrap
                  text-sm
                  text-[#556B5D]
                  transition-colors
                  duration-300
                  hover:text-[#C6A56B]
                  xl:text-base
                "
              >
                {link.title}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[2px]
                    w-0
                    bg-[#C8A96A]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </nav>

          {/* BOUTON MOBILE */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-[#556B5D]
              transition
              hover:bg-[#556B5D]/10
              focus:outline-none
              focus:ring-2
              focus:ring-[#C8A96A]
              lg:hidden
            "
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* BARRE DE PROGRESSION */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#C8A96A]"
          style={{
            width: `${progress}%`,
          }}
        />
      </motion.header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="
              fixed
              inset-0
              z-40
              flex
              flex-col
              items-center
              justify-center
              overflow-y-auto
              bg-[#F8F6F2]/95
              px-6
              pb-[env(safe-area-inset-bottom)]
              pt-[env(safe-area-inset-top)]
              backdrop-blur-2xl
              lg:hidden
            "
          >
            <nav className="flex w-full max-w-sm flex-col items-center gap-6 sm:gap-8">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    w-full
                    rounded-xl
                    py-2
                    text-center
                    font-serif
                    text-2xl
                    text-[#556B5D]
                    transition
                    hover:text-[#C6A56B]
                    sm:text-3xl
                  "
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}