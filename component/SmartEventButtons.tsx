"use client";

import { useEffect, useState } from "react";

type Device = "android" | "ios" | "desktop";

export default function SmartEventButtons() {
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent || "";

    const isAndroid = /Android/i.test(userAgent);

    const isIOS =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    if (isAndroid) {
      setDevice("android");
    } else if (isIOS) {
      setDevice("ios");
    } else {
      setDevice("desktop");
    }
  }, []);

  /*
   * Lieu du mariage
   */
  const mapsQuery = encodeURIComponent(
   //const destination = encodeURIComponent(
   // "/3.0377429,9.9638211/@3.0375554,9.964318,384m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D"
	// "Mpolongwe Kribi"
	 `"3°02'15.7"N 9°57'49.5"E"`
	
	//https://www.google.com/maps/dir//3.0377429,9.9638211/@3.0375554,9.964318,384m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D
  );

  /*
   * Google Maps
   */
  const googleMapsWeb =
  //`https://www.google.com/maps/dir/?api=1` +
    //  `&destination=${encodeURIComponent(destination)}`;
	  
    `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  /*
   * Android :
   * essaie d'ouvrir Google Maps.
   */
  const androidMaps =  
  //`https://www.google.com/maps/dir/?api=1 +
       // &destination=${encodeURIComponent(destination)} +
     //   &travelmode=driving`;
    `geo:0,0?q=${mapsQuery}`;

  /*
   * iPhone / iPad :
   * essaie d'ouvrir Google Maps.
   */
  const iosGoogleMaps =
      // `https://maps.apple.com/? +
     //   daddr=${encodeURIComponent(destination)} +
      //  dirflg=d`;
       
    `comgooglemaps://?q=${mapsQuery}`;

  /*
   * Google Calendar
   *
   * 19 décembre 2026
   * 15h00
   *
   * Adapte l'heure de fin si nécessaire.
   */
  const calendarUrl =
    "https://calendar.google.com/calendar/render" +
    "?action=TEMPLATE" +
    "&text=" +
    encodeURIComponent(
      "Mariage Donald Kevin & Marie"
    ) +
    "&dates=20261212T150000/20261213T020000" +
    "&location=" +
    encodeURIComponent(
      "Mpolongwe, Kribi, Cameroun"
    ) +
    "&details=" +
    encodeURIComponent(
      "Mariage de Donald Kevin & Marie. " +
      "Cérémonie à 15h00."
    );

  /*
   * Fichier .ics pour Apple Calendar.
   */
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mariage Donald Kevin Marie//FR",
    "BEGIN:VEVENT",
    "UID:mariage-donald-kevin-marie-20261212",
    "DTSTAMP:20260820T000000Z",
    "DTSTART:20261212T150000",
    "DTEND:20261213T020000",
    "SUMMARY:Mariage Donald Kevin & Marie",
    "LOCATION:Mpolongwe\\, Kribi\\, Cameroun",
    "DESCRIPTION:Mariage de Donald Kevin & Marie.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const icsUrl =
    `data:text/calendar;charset=utf-8,${encodeURIComponent(
      icsContent
    )}`;

  /*
   * Ouvre Maps selon l'appareil.
   */
  const handleMaps = () => {
    if (device === "android") {
      window.location.href = androidMaps;

      setTimeout(() => {
        window.open(
          googleMapsWeb,
          "_blank"
        );
      }, 800);

      return;
    }

    if (device === "ios") {
      window.location.href = iosGoogleMaps;

      setTimeout(() => {
        window.open(
          googleMapsWeb,
          "_blank"
        );
      }, 800);

      return;
    }

    window.open(
      googleMapsWeb,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
   * Ouvre le calendrier selon l'appareil.
   */
  const handleCalendar = () => {
    if (device === "ios") {
      window.location.href = icsUrl;
      return;
    }

    window.open(
      calendarUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

      {/* MAPS */}

      <button
        type="button"
        onClick={handleMaps}
        className="
          w-full
          max-w-xs
          rounded-2xl
          border
          border-[#D8C7A3]
          bg-[#A8B5A2]
          px-6
          py-4
          text-sm
          font-medium
          text-white
          shadow-lg
          transition
          duration-300
          hover:scale-[1.02]
          hover:shadow-xl
          active:scale-95
        "
      >
        📍
        <span className="ml-2">
          Voir le lieu
        </span>
      </button>

      {/* CALENDRIER */}

      <button
        type="button"
        onClick={handleCalendar}
        className="
          w-full
          max-w-xs
          rounded-2xl
          border
          border-[#D8C7A3]
          bg-[#F8F6F1]
          px-6
          py-4
          text-sm
          font-medium
          text-[#6F746C]
          shadow-lg
          transition
          duration-300
          hover:scale-[1.02]
          hover:shadow-xl
          active:scale-95
        "
      >
        📅
        <span className="ml-2">
          Ajouter au calendrier
        </span>
      </button>

    </div>
  );
}