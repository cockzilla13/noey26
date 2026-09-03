/*import { supabase }
from "@/lib/supabase";

export async function trackVisitor(
 page: string
) {

 try {

  if (
   !navigator.geolocation
  ) {

   await supabase
    .from("visitor_logs")
    .insert({

     page,

     device:
      navigator.userAgent

    });

   return;

  }

  navigator.geolocation
   .getCurrentPosition(

    async (position) => {

     await supabase
      .from("visitor_logs")
      .insert({

       page,

       latitude:
        position.coords.latitude,

       longitude:
        position.coords.longitude,

       device:
        navigator.userAgent

      });

    }

   );

 } catch (err) {

  console.error(err);

 }

}*/


import { supabase } from "@/lib/supabase";

/* =====================================================
   DÉTECTION APPAREIL
===================================================== */

function getDevice(): string {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const ua =
    navigator.userAgent.toLowerCase();

  if (
    /ipad|tablet|android(?!.*mobile)/i.test(
      ua
    )
  ) {
    return "tablet";
  }

  if (
    /mobi|android|iphone|ipod|windows phone/i.test(
      ua
    )
  ) {
    return "mobile";
  }

  return "desktop";
}

/* =====================================================
   GÉOLOCALISATION
===================================================== */

function getLocation(): Promise<{
  latitude: number | null;
  longitude: number | null;
}> {
  return new Promise((resolve) => {
    if (
      typeof navigator ===
        "undefined" ||
      !navigator.geolocation
    ) {
      console.log(
        "Géolocalisation non supportée"
      );

      resolve({
        latitude: null,
        longitude: null,
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          "GPS obtenu :",
          position.coords.latitude,
          position.coords.longitude
        );

        resolve({
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        });
      },

      (error) => {
        console.warn(
          "GPS indisponible :",
          error.code,
          error.message
        );

        resolve({
          latitude: null,
          longitude: null,
        });
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

/* =====================================================
   VILLE + PAYS
===================================================== */

async function getCityAndCountry(
  latitude: number,
  longitude: number
) {
  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?format=jsonv2` +
      `&lat=${encodeURIComponent(
        latitude
      )}` +
      `&lon=${encodeURIComponent(
        longitude
      )}` +
      `&zoom=10` +
      `&addressdetails=1`;

    console.log(
      "Recherche ville/pays :",
      url
    );

    const response =
      await fetch(url, {
        headers: {
          Accept:
            "application/json",
        },
      });

    if (!response.ok) {
      console.warn(
        "Nominatim erreur HTTP :",
        response.status
      );

      return {
        city: null,
        country: null,
      };
    }

    const data =
      await response.json();

    console.log(
      "Réponse Nominatim :",
      data
    );

    const address =
      data?.address || {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.suburb ||
      null;

    const country =
      address.country ||
      null;

    console.log(
      "Ville détectée :",
      city
    );

    console.log(
      "Pays détecté :",
      country
    );

    return {
      city,
      country,
    };
  } catch (error) {
    console.error(
      "Erreur Nominatim :",
      error
    );

    return {
      city: null,
      country: null,
    };
  }
}

/* =====================================================
   TRACK VISITEUR
===================================================== */

export async function trackVisitor(
  page: string
) {
  try {
    console.log(
      "========== TRACK VISITOR =========="
    );

    console.log(
      "Page :",
      page
    );

    /* =========================
       ÉVITER LES DOUBLONS
    ========================= */

    const storageKey =
      `visitor_tracked_${page}`;

    if (
      typeof window !==
        "undefined" &&
      sessionStorage.getItem(
        storageKey
      )
    ) {
      console.log(
        "Visiteur déjà enregistré pour cette session."
      );

      return;
    }

    /* =========================
       APPAREIL
    ========================= */

    const device =
      getDevice();

    console.log(
      "Appareil :",
      device
    );

    /* =========================
       GPS
    ========================= */

    const location =
      await getLocation();

    console.log(
      "Position :",
      location
    );

    /* =========================
       VILLE / PAYS
    ========================= */

    let city: string | null =
      null;

    let country: string | null =
      null;

    if (
      location.latitude !== null &&
      location.longitude !== null
    ) {
      const result =
        await getCityAndCountry(
          location.latitude,
          location.longitude
        );

      city =
        result.city;

      country =
        result.country;
    }

    /* =========================
       DONNÉES FINALES
    ========================= */

    const visitorData = {
      page,

      latitude:
        location.latitude,

      longitude:
        location.longitude,

      city,

      country,

      device,
    };

    console.log(
      "Données envoyées à Supabase :",
      visitorData
    );

    /* =========================
       INSERT SUPABASE
    ========================= */

    const {
      data,
      error,
    } = await supabase
      .from("visitor_logs")
      .insert(
        visitorData
      );
     /* =========================
       INSERT SUPABASE correction pour l'insert
    ========================= .select();  */ 

    if (error) {
      console.error(
        "❌ ERREUR SUPABASE visitor_logs :",
        error
      );

      return;
    }

    console.log(
      "✅ Visiteur enregistré :",
      data
    );

    /* =========================
       SESSION OK
    ========================= */

    if (
      typeof window !==
      "undefined"
    ) {
      sessionStorage.setItem(
        storageKey,
        "true"
      );
    }

    console.log(
      "========== FIN TRACK =========="
    );
  } catch (error) {
    console.error(
      "❌ ERREUR TRACK VISITOR :",
      error
    );
  }
}