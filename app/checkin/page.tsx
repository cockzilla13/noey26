/*"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { getUserRole } from "@/lib/auth";

export default function CheckInPage() {

  const [result, setResult] =
    useState("");

  const [guest, setGuest] =
	useState<any>(null);
	
  const [loading, setLoading] =
     useState(true);


 
  useEffect(() => {
   


   
	checkAuth();
	const reader =
  document.getElementById(
    "reader"
  );

if (!reader) {

  console.log(
    "reader introuvable"
  );

  return;
}
    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

    scanner.render(
      async (decodedText) => {

        setResult(decodedText);

        try {

          const invitationCode =
            decodedText
              .split("/")
              .pop();

          const { data, error } =
            await supabase
              .from("rsvps")
              .select("*")
              .eq(
                "invitation_code",
                invitationCode
              )
              .single();

          if (error || !data) {

            alert(
              "Invité introuvable"
            );

            return;
          }
		  
		  //  on valide si il est déjà là.
		  if (data.checked_in) {

			 alert(
			  "QR déjà utilisé"
			 );

			 return;
			}
  
          await supabase
            .from("rsvps")
            .update({
              checked_in: true,
              checked_in_at:
                new Date()
                  .toISOString(),
            })
            .eq(
              "id",
              data.id
            );


				setGuest({
		  firstName:
			data.first_name,
		  lastName:
			data.last_name,
		  guests:
			data.guests_count,
		});

        } catch (err) {

          console.error(err);

        }

      },
      () => {}
    );

    return () => {
      scanner.clear();
    };

  }, []);
  
  
			  
	async function checkAuth() {

	  const {
		data: { session }
	  } =
	  await supabase.auth.getSession();

	  if (!session) {

		window.location.href =
		  "/checkin/login";

		return;
	  }

	  const userEmail =
		session.user.email;

	  const { data } =
		await supabase
		  .from("checkin_staff")
		  .select("*")
		  .eq(
			"email",
			userEmail
		  )
		  .single();

	  if (!data) {

	
		await supabase.auth.signOut();

		window.location.href =
		  "/checkin/login";

		return;
	  }

	  setLoading(false);

	}		
	

	  async function logout() {

		  await supabase.auth.signOut();

		  window.location.href =
			"/checkin/login";

		}
		
		
  return (
    <main className="min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-8">
        Scanner QR Invitation
      </h1>


 {
 guest && (

  <div
   className="
    mt-8
    rounded-2xl
    bg-green-100
    p-6
   "
  >

   <h2>
    ✅ Présence confirmée
   </h2>

   <p>
   Prenom : {guest.firstName}
    {" "}
   Nom: {guest.lastName}
   </p>

   <p>
    👥
    {" "}
    {guest.guests}
    {" "}
    personnes
   </p>
  
  		 <Link
          href="/checkin/list"
          className="p-6 rounded-2xl border"
         >
          ✅ Check-list
        </Link>
  </div>

 )
}

      <div id="reader" />

      {result && (
        <div className="mt-6">
          QR :
          {" "}
          {result}
        </div>
      )}


     <button
 onClick={logout}
 className="
 bg-[#A8B5A2]
 hover:bg-[#96A38F]
 text-white
 px-4
 py-2
 rounded-xl
 "
>
 Déconnexion
</button>


    </main>
  );
}*/

/*"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  guests_count: number;
  checked_in: boolean;
  checked_in_at: string | null;
};

export default function CheckInPage() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scannerRef =
    useRef<Html5QrcodeScanner | null>(null);

  const scannedRef =
    useRef(false);

  /*
   * ==============================
   * AUTHENTIFICATION
   * ==============================
   *

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href =
        "/checkin/login";

      return;
    }

    const email = session.user.email;

    if (!email) {
      await supabase.auth.signOut();

      window.location.href =
        "/checkin/login";

      return;
    }

    /*
     * Vérification du staff.
     *
     * La RPC effectuera également cette
     * vérification côté serveur.
     *
    const { data, error } =
      await supabase
        .from("checkin_staff")
        .select("email")
        .eq("email", email)
        .single();

    if (error || !data) {
      await supabase.auth.signOut();

      window.location.href =
        "/checkin/login";

      return;
    }

    setLoading(false);
  }

  /*
   * ==============================
   * INITIALISATION SCANNER
   * =============================
   *

  useEffect(() => {
    if (loading) {
      return;
    }

    const timeout =
      setTimeout(() => {
        initializeScanner();
      }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);

  /*
   * ==============================
   * SCANNER
   * ==============================
   *

  function initializeScanner() {
    const reader =
      document.getElementById("reader");

    if (!reader) {
      console.error(
        "Élément #reader introuvable"
      );

      return;
    }

    if (scannerRef.current) {
      return;
    }

    scannedRef.current = false;

    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,

          qrbox: (
            viewfinderWidth,
            viewfinderHeight
          ) => {
            const minEdge =
              Math.min(
                viewfinderWidth,
                viewfinderHeight
              );

            const size =
              Math.min(
                280,
                Math.floor(
                  minEdge * 0.75
                )
              );

            return {
              width: size,
              height: size,
            };
          },

          aspectRatio: 1,

          rememberLastUsedCamera: true,
        },
        false
      );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        if (
          scannedRef.current ||
          processing
        ) {
          return;
        }

        scannedRef.current = true;

        setProcessing(true);
        setErrorMessage("");
        setResult(decodedText);

        await handleScan(
          decodedText
        );
      },
      () => {
        /*
         * Les erreurs de scan sont normales.
         * On ne les affiche donc pas.
         *
      }
    );
  }

  /*
   * ==============================
   * TRAITEMENT QR
   * ==============================
   *

  async function handleScan(
    decodedText: string
  ) {
    try {
      /*
       * Exemple :
       *
       * https://monsite.com/invitation/ABC123
       *
       * => ABC123
       *

      const invitationCode =
        decodedText
          .split("/")
          .filter(Boolean)
          .pop();

      if (!invitationCode) {
        showError(
          "QR invalide ou code d'invitation introuvable."
        );

        return;
      }

      /*
       * IMPORTANT :
       *
       * On ne fait plus de SELECT puis UPDATE
       * depuis le navigateur.
       *
       * Tout est réalisé dans une RPC Supabase
       * côté serveur.
       *
      const {
        data,
        error,
      } = await supabase.rpc(
        "checkin_guest",
        {
          p_invitation_code:
            invitationCode,
        }
      );

      if (error) {
        console.error(
          "Erreur RPC check-in :",
          error
        );

        /*
         * Messages spécifiques
         * envoyés par PostgreSQL.
         *

        if (
          error.message.includes(
            "GUEST_NOT_FOUND"
          )
        ) {
          showError(
            "Invité introuvable."
          );

          return;
        }

        if (
          error.message.includes(
            "ALREADY_CHECKED_IN"
          )
        ) {
          showError(
            "Ce QR a déjà été utilisé."
          );

          return;
        }

        if (
          error.message.includes(
            "UNAUTHORIZED"
          )
        ) {
          showError(
            "Vous n'êtes pas autorisé à effectuer un check-in."
          );

          return;
        }

        showError(
          "Impossible de confirmer la présence."
        );

        return;
      }

      if (!data) {
        showError(
          "Aucune information retournée."
        );

        return;
      }

      /*
       * Invité validé.
       *

      setGuest({
        id: data.id,
        first_name:
          data.first_name,
        last_name:
          data.last_name,
        guests_count:
          Number(
            data.guests_count
          ) || 1,
        checked_in:
          data.checked_in,
        checked_in_at:
          data.checked_in_at,
      });

    } catch (error) {
      console.error(
        "Erreur traitement QR :",
        error
      );

      showError(
        "Une erreur est survenue pendant le check-in."
      );
    } finally {
      setProcessing(false);
    }
  }

  /*
   * ==============================
   * ERREUR
   * ==============================
   *

  function showError(
    message: string
  ) {
    setErrorMessage(message);
    setProcessing(false);
  }

  /*
   * ==============================
   * NOUVEAU SCAN
   * ==============================
   *
  function scanAnother() {
    setGuest(null);
    setResult("");
    setErrorMessage("");
    setProcessing(false);

    scannedRef.current = false;
  }

  /*
   * ==============================
   * LOGOUT
   * ==============================
   *

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/checkin/login";
  }

  /*
   * ==============================
   * LOADING
   * ==============================
   *

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          w-full
          bg-gradient-to-b
          from-[#F8F5ED]
          via-[#F4F2EB]
          to-[#E9F0E7]
          px-4
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-[#D8D4CC]
              border-t-[#435141]
            "
          />

          <p
            className="
              text-sm
              font-medium
              text-[#435141]
              sm:text-base
            "
          >
            Vérification des accès...
          </p>

        </div>
      </main>
    );
  }

  /*
   * ==============================
   * INTERFACE
   * ==============================
   *

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-gradient-to-b
        from-[#F8F5ED]
        via-[#F4F2EB]
        to-[#E9F0E7]
        px-3
        py-5
        sm:px-5
        sm:py-8
        md:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
        "
      >

        {/* HEADER *}

        <header
          className="
            mb-6
            text-center
            sm:mb-8
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#B9A77C]
              sm:text-xs
              sm:tracking-[0.3em]
            "
          >
            Espace Staff
          </p>

          <h1
            className="
              mt-2
              font-serif
              text-3xl
              font-semibold
              text-[#435141]
              sm:text-4xl
              md:text-5xl
            "
          >
            📷 Scanner une invitation
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#6E6E66]
              sm:text-base
            "
          >
            Scannez le QR code présent
            sur l'invitation.
          </p>

        </header>

        {/* CONTENU *}

        <div
          className="
            grid
            gap-5
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-start
          "
        >

          {/* SCANNER *}

          <section
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-[#DDD8CF]
              bg-white
              p-3
              shadow-lg
              sm:p-5
              md:p-6
            "
          >

            <div
              className="
                mb-4
                text-center
                sm:mb-5
              "
            >

              <h2
                className="
                  text-lg
                  font-semibold
                  text-[#435141]
                  sm:text-xl
                "
              >
                Scanner QR
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#888A83]
                  sm:text-sm
                "
              >
                Placez le QR code devant
                la caméra
              </p>

            </div>

            {/* CAMERA *}

            <div
              className="
                mx-auto
                w-full
                max-w-[520px]
                overflow-hidden
                rounded-2xl
                bg-black
              "
            >
              <div
                id="reader"
                className="w-full"
              />
            </div>

            {/* QR *}

            {result && (
              <div
                className="
                  mt-4
                  rounded-xl
                  bg-[#F8F5ED]
                  p-3
                  text-center
                  sm:p-4
                "
              >

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-[#999A94]
                  "
                >
                  QR détecté
                </p>

                <p
                  className="
                    mt-1
                    break-all
                    text-xs
                    text-[#435141]
                  "
                >
                  {result}
                </p>

              </div>
            )}

            {/* VERIFICATION *}

            {processing && (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#F8F5ED]
                  p-3
                  text-sm
                  text-[#435141]
                "
              >
                <span className="animate-pulse">
                  🔎
                </span>

                Vérification de
                l'invitation...
              </div>
            )}

          </section>

          {/* PANNEAU *}

          <aside className="space-y-4">

            {/* SUCCÈS *}

            {guest && (
              <div
                className="
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-green-200
                  bg-green-50
                  p-5
                  shadow-md
                  sm:p-6
                "
              >

                <div
                  className="
                    text-center
                  "
                >

                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-green-500
                      text-3xl
                      text-white
                      shadow-md
                    "
                  >
                    ✓
                  </div>

                  <h2
                    className="
                      mt-4
                      text-xl
                      font-bold
                      text-green-800
                      sm:text-2xl
                    "
                  >
                    Présence confirmée
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-green-700
                    "
                  >
                    L'invité est maintenant
                    enregistré comme présent.
                  </p>

                </div>

                {/* INVITÉ *}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    bg-white
                    p-4
                    shadow-sm
                  "
                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wide
                      text-[#999A94]
                    "
                  >
                    Invité
                  </p>

                  <p
                    className="
                      mt-1
                      break-words
                      text-lg
                      font-semibold
                      text-[#435141]
                    "
                  >
                    {guest.first_name}{" "}
                    {guest.last_name}
                  </p>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#F8F5ED]
                      px-3
                      py-3
                    "
                  >

                    <span
                      className="
                        text-sm
                        text-[#6E6E66]
                      "
                    >
                      👥 Nombre de personnes
                    </span>

                    <strong
                      className="
                        text-lg
                        text-[#435141]
                      "
                    >
                      {guest.guests_count}
                    </strong>

                  </div>

                </div>

                {/* ACTIONS *}

                <div
                  className="
                    mt-5
                    space-y-3
                  "
                >

                  <button
                    type="button"
                    onClick={scanAnother}
                    className="
                      min-h-12
                      w-full
                      rounded-xl
                      bg-[#A8B5A2]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-[#96A38F]
                      active:scale-[0.98]
                    "
                  >
                    📷 Scanner un autre invité
                  </button>

                  <Link
                    href="/checkin/list"
                    className="
                      flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#A8B5A2]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#435141]
                      transition
                      hover:bg-[#A8B5A2]
                      hover:text-white
                    "
                  >
                    📋 Voir les présents
                  </Link>

                </div>

              </div>
            )}

            {/* ERREUR *}

            {errorMessage && !guest && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-red-100
                      text-xl
                    "
                  >
                    ⚠️
                  </div>

                  <div>

                    <h2
                      className="
                        font-semibold
                        text-red-800
                      "
                    >
                      Scan impossible
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-5
                        text-red-700
                      "
                    >
                      {errorMessage}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={scanAnother}
                  className="
                    mt-4
                    min-h-11
                    w-full
                    rounded-xl
                    bg-red-500
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  📷 Réessayer
                </button>

              </div>
            )}

            {/* CONSEILS *}

            {!guest &&
              !errorMessage && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-[#DDD8CF]
                    bg-white/70
                    p-5
                    shadow-sm
                    sm:p-6
                  "
                >

                  <h2
                    className="
                      font-semibold
                      text-[#435141]
                    "
                  >
                    💡 Conseils
                  </h2>

                  <ul
                    className="
                      mt-3
                      space-y-2
                      text-sm
                      leading-5
                      text-[#6E6E66]
                    "
                  >

                    <li>
                      • Gardez le QR code
                      entièrement visible.
                    </li>

                    <li>
                      • Évitez les reflets
                      sur l'écran.
                    </li>

                    <li>
                      • Maintenez le téléphone
                      stable.
                    </li>

                    <li>
                      • Chaque QR ne peut être
                      utilisé qu'une seule fois.
                    </li>

                  </ul>

                </div>
              )}

            {/* LOGOUT *}

            <button
              type="button"
              onClick={logout}
              className="
                min-h-11
                w-full
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              🚪 Déconnexion
            </button>

          </aside>

        </div>

        {/* FOOTER *}

        <footer
          className="
            mt-7
            text-center
            sm:mt-10
          "
        >
          <p
            className="
              text-[11px]
              text-[#999A94]
              sm:text-xs
            "
          >
            🔒 Espace réservé au personnel
            du mariage
          </p>
        </footer>

      </div>
    </main>
  );
}*/

"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Html5Qrcode,
  Html5QrcodeScanner,
} from "html5-qrcode";

import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  guests_count: number;
  checked_in: boolean;
  checked_in_at: string | null;
};

export default function CheckInPage() {
  const [guest, setGuest] =
    useState<Guest | null>(null);

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [dragActive, setDragActive] =
    useState(false);

  const scannerRef =
    useRef<Html5QrcodeScanner | null>(null);

  const fileScannerRef =
    useRef<Html5Qrcode | null>(null);

  const scannedRef =
    useRef(false);

  /*
   * ========================================
   * AUTHENTIFICATION
   * ========================================
   */

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href =
        "/checkin/login";

      return;
    }

    const email =
      session.user.email;

    if (!email) {
      await supabase.auth.signOut();

      window.location.href =
        "/checkin/login";

      return;
    }

    /*
     * Vérification du staff.
     */
    const { data, error } =
      await supabase
        .from("checkin_staff")
        .select("email")
        .eq("email", email)
        .single();

    if (error || !data) {
      await supabase.auth.signOut();

      window.location.href =
        "/checkin/login";

      return;
    }

    setLoading(false);
  }

  /*
   * ========================================
   * INITIALISATION DU SCANNER CAMERA
   * ========================================
   */

  useEffect(() => {
    if (loading) {
      return;
    }

    const timeout =
      setTimeout(() => {
        initializeCameraScanner();
      }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);

  function initializeCameraScanner() {
    const reader =
      document.getElementById(
        "reader"
      );

    if (!reader) {
      console.error(
        "Élément #reader introuvable"
      );

      return;
    }

    if (scannerRef.current) {
      return;
    }

    scannedRef.current = false;

    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,

          qrbox: (
            viewfinderWidth,
            viewfinderHeight
          ) => {
            const minEdge =
              Math.min(
                viewfinderWidth,
                viewfinderHeight
              );

            const size =
              Math.min(
                280,
                Math.floor(
                  minEdge * 0.75
                )
              );

            return {
              width: size,
              height: size,
            };
          },

          aspectRatio: 1,

          rememberLastUsedCamera: true,
        },
        false
      );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        if (
          scannedRef.current ||
          processing ||
          guest
        ) {
          return;
        }

        scannedRef.current = true;

        setProcessing(true);
        setErrorMessage("");
        setResult(decodedText);

        await handleDecodedQr(
          decodedText
        );
      },
      () => {
        /*
         * Les erreurs de détection sont
         * normales pendant le scan.
         */
      }
    );
  }

  /*
   * ========================================
   * EXTRACTION DU CODE QR
   * ========================================
   */

  function extractInvitationCode(
    decodedText: string
  ) {
    const value =
      decodedText.trim();

    if (!value) {
      return null;
    }

    /*
     * Cas 1 :
     * URL complète
     *
     * https://monsite.com/invitation/ABC123
     *
     * => ABC123
     */

    try {
      const url =
        new URL(value);

      const parts =
        url.pathname
          .split("/")
          .filter(Boolean);

      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    } catch {
      /*
       * Ce n'est pas une URL.
       */
    }

    /*
     * Cas 2 :
     * Le QR contient directement
     * le code d'invitation.
     */

    const parts =
      value
        .split("/")
        .filter(Boolean);

    return (
      parts[parts.length - 1] ||
      null
    );
  }

  /*
   * ========================================
   * TRAITEMENT DU QR
   * ========================================
   */

  async function handleDecodedQr(
    decodedText: string
  ) {
    try {
      const invitationCode =
        extractInvitationCode(
          decodedText
        );

      if (!invitationCode) {
        showError(
          "QR invalide ou code d'invitation introuvable."
        );

        return;
      }

      /*
       * IMPORTANT :
       *
       * Aucun SELECT / UPDATE direct
       * depuis le navigateur.
       *
       * La validation est effectuée
       * par la RPC Supabase sécurisée.
       */

      const {
        data,
        error,
      } = await supabase.rpc(
        "checkin_guest",
        {
          p_invitation_code:
            invitationCode,
        }
      );

      if (error) {
        console.error(
          "Erreur RPC check-in :",
          error
        );

        const message =
          error.message || "";

        /*
         * QR inexistant
         */

        if (
          message.includes(
            "GUEST_NOT_FOUND"
          )
        ) {
          showError(
            "Invité introuvable."
          );

          return;
        }

        /*
         * QR déjà utilisé
         */

        if (
          message.includes(
            "ALREADY_CHECKED_IN"
          )
        ) {
          showError(
            "Ce QR a déjà été utilisé."
          );

          return;
        }

        /*
         * Staff non autorisé
         */

        if (
          message.includes(
            "UNAUTHORIZED"
          )
        ) {
          showError(
            "Vous n'êtes pas autorisé à effectuer un check-in."
          );

          return;
        }

        showError(
          "Impossible de confirmer la présence."
        );

        return;
      }

      if (!data) {
        showError(
          "Aucune information retournée."
        );

        return;
      }

      /*
       * Check-in confirmé.
       */

      setGuest({
        id: data.id,
        first_name:
          data.first_name,
        last_name:
          data.last_name,
        guests_count:
          Number(
            data.guests_count
          ) || 1,
        checked_in:
          data.checked_in,
        checked_in_at:
          data.checked_in_at,
      });

    } catch (error) {
      console.error(
        "Erreur traitement QR :",
        error
      );

      showError(
        "Une erreur est survenue pendant le check-in."
      );
    } finally {
      setProcessing(false);
    }
  }

  /*
   * ========================================
   * MESSAGE ERREUR
   * ========================================
   */

  function showError(
    message: string
  ) {
    setErrorMessage(message);
    setProcessing(false);
  }

  /*
   * ========================================
   * SCAN IMAGE / DRAG & DROP
   * ========================================
   */

  async function handleFile(
    file: File
  ) {
    if (!file) {
      return;
    }

    if (
      !file.type.startsWith("image/")
    ) {
      showError(
        "Veuillez déposer une image contenant un QR code."
      );

      return;
    }

    if (
      processing ||
      guest
    ) {
      return;
    }

    setProcessing(true);
    setErrorMessage("");
    setResult("");

    /*
     * On empêche le scanner caméra
     * de continuer pendant le scan
     * d'une image.
     */

    await stopCameraScanner();

    try {
      /*
       * Création du scanner image.
       */

      const fileReader =
        document.getElementById(
          "file-reader"
        );

      if (!fileReader) {
        throw new Error(
          "Zone file-reader introuvable."
        );
      }

      if (!fileScannerRef.current) {
        fileScannerRef.current =
          new Html5Qrcode(
            "file-reader"
          );
      }

      const decodedText =
        await fileScannerRef.current.scanFile(
          file,
          true
        );

      setResult(decodedText);

      scannedRef.current = true;

      await handleDecodedQr(
        decodedText
      );

    } catch (error) {
      console.error(
        "Erreur scan image :",
        error
      );

      showError(
        "Impossible de lire le QR code sur cette image."
      );
    }
  }

  /*
   * ========================================
   * INPUT FICHIER
   * ========================================
   */

  function handleFileInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    /*
     * Permet de sélectionner à nouveau
     * le même fichier.
     */

    event.target.value = "";
  }

  /*
   * ========================================
   * DRAG ENTER
   * ========================================
   */

  function handleDragEnter(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(true);
  }

  /*
   * ========================================
   * DRAG LEAVE
   * ========================================
   */

  function handleDragLeave(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);
  }

  /*
   * ========================================
   * DRAG OVER
   * ========================================
   */

  function handleDragOver(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect =
      "copy";

    setDragActive(true);
  }

  /*
   * ========================================
   * DROP
   * ========================================
   */

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  /*
   * ========================================
   * STOP CAMERA
   * ========================================
   */

  async function stopCameraScanner() {
    if (!scannerRef.current) {
      return;
    }

    try {
      await scannerRef.current.clear();
    } catch (error) {
      console.warn(
        "Erreur arrêt caméra :",
        error
      );
    }

    scannerRef.current = null;
  }

  /*
   * ========================================
   * NOUVEAU SCAN
   * ========================================
   */

  async function scanAnother() {
    setGuest(null);
    setResult("");
    setErrorMessage("");
    setProcessing(false);

    scannedRef.current = false;

    /*
     * Nettoyage du scanner image.
     */

    if (fileScannerRef.current) {
      try {
        await fileScannerRef.current.clear();
      } catch {
        // Rien à faire.
      }

      fileScannerRef.current =
        null;
    }

    /*
     * Réinitialisation du scanner caméra.
     */

    const reader =
      document.getElementById(
        "reader"
      );

    if (reader) {
      reader.innerHTML = "";
    }

    setTimeout(() => {
      initializeCameraScanner();
    }, 150);
  }

  /*
   * ========================================
   * LOGOUT
   * ========================================
   */

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/checkin/login";
  }

  /*
   * ========================================
   * LOADING
   * ========================================
   */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          w-full
          bg-gradient-to-b
          from-[#F8F5ED]
          via-[#F4F2EB]
          to-[#E9F0E7]
          px-4
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-[#D8D4CC]
              border-t-[#435141]
            "
          />

          <p
            className="
              text-sm
              font-medium
              text-[#435141]
              sm:text-base
            "
          >
            Vérification des accès...
          </p>

        </div>
      </main>
    );
  }

  /*
   * ========================================
   * INTERFACE
   * ========================================
   */

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-gradient-to-b
        from-[#F8F5ED]
        via-[#F4F2EB]
        to-[#E9F0E7]
        px-3
        py-5
        sm:px-5
        sm:py-8
        md:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
        "
      >

        {/* ==================================
            HEADER
        ================================== */}

        <header
          className="
            mb-6
            text-center
            sm:mb-8
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#B9A77C]
              sm:text-xs
              sm:tracking-[0.3em]
            "
          >
            Espace Staff
          </p>

          <h1
            className="
              mt-2
              font-serif
              text-3xl
              font-semibold
              text-[#435141]
              sm:text-4xl
              md:text-5xl
            "
          >
            📷 Check-in des invités
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-[#6E6E66]
              sm:text-base
            "
          >
            Scannez le QR code avec la caméra
            ou déposez directement l'image
            du QR code depuis votre ordinateur.
          </p>

        </header>

        {/* ==================================
            CONTENU
        ================================== */}

        <div
          className="
            grid
            gap-5
            lg:grid-cols-[minmax(0,1fr)_380px]
            lg:items-start
          "
        >

          {/* ==================================
              SCANNER CAMERA
          ================================== */}

          <section
            className="
              rounded-[28px]
              border
              border-[#DDD8CF]
              bg-white
              p-3
              shadow-lg
              sm:p-5
              md:p-6
            "
          >

            <div
              className="
                mb-4
                text-center
                sm:mb-5
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#EEF2EC]
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-[#435141]
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-green-500
                  "
                />

                Caméra
              </div>

              <h2
                className="
                  mt-3
                  text-lg
                  font-semibold
                  text-[#435141]
                  sm:text-xl
                "
              >
                Scanner avec la caméra
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#888A83]
                  sm:text-sm
                "
              >
                Téléphone, tablette ou ordinateur
              </p>

            </div>

            {/* CAMERA */}

            <div
              className="
                mx-auto
                w-full
                max-w-[560px]
                overflow-hidden
                rounded-2xl
                bg-black
              "
            >
              <div
                id="reader"
                className="w-full"
              />
            </div>

            {/* RESULTAT */}

            {result && (
              <div
                className="
                  mt-4
                  rounded-xl
                  bg-[#F8F5ED]
                  p-3
                  text-center
                  sm:p-4
                "
              >

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-[#999A94]
                  "
                >
                  QR détecté
                </p>

                <p
                  className="
                    mt-1
                    break-all
                    text-xs
                    text-[#435141]
                  "
                >
                  {result}
                </p>

              </div>
            )}

            {/* TRAITEMENT */}

            {processing && (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#F8F5ED]
                  p-3
                  text-sm
                  text-[#435141]
                "
              >
                <span className="animate-pulse">
                  🔎
                </span>

                Vérification de l'invitation...
              </div>
            )}

          </section>

          {/* ==================================
              COLONNE DROITE
          ================================== */}

          <aside className="space-y-4">

            {/* ==================================
                DROP ZONE
            ================================== */}

            {!guest && (
              <div
                onDragEnter={
                  handleDragEnter
                }
                onDragLeave={
                  handleDragLeave
                }
                onDragOver={
                  handleDragOver
                }
                onDrop={
                  handleDrop
                }
                className={`
                  rounded-[28px]
                  border-2
                  border-dashed
                  p-5
                  text-center
                  transition
                  sm:p-6
                  ${
                    dragActive
                      ? `
                        border-[#A8B5A2]
                        bg-[#EEF2EC]
                        scale-[1.01]
                      `
                      : `
                        border-[#D5D0C6]
                        bg-white/80
                        hover:border-[#A8B5A2]
                        hover:bg-white
                      `
                  }
                `}
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#F8F5ED]
                    text-3xl
                  "
                >
                  {dragActive
                    ? "📥"
                    : "🖼️"}
                </div>

                <h2
                  className="
                    mt-4
                    text-base
                    font-semibold
                    text-[#435141]
                    sm:text-lg
                  "
                >
                  {dragActive
                    ? "Déposez le QR ici"
                    : "Scanner depuis une image"}
                </h2>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-xs
                    text-xs
                    leading-5
                    text-[#777970]
                    sm:text-sm
                  "
                >
                  Depuis un ordinateur,
                  glissez-déposez une capture
                  ou une photo contenant le QR code.
                </p>

                <label
                  className="
                    mt-4
                    inline-flex
                    min-h-11
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#A8B5A2]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#96A38F]
                    active:scale-[0.98]
                  "
                >
                  📂 Choisir une image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileInput
                    }
                    className="hidden"
                  />
                </label>

                {/* Scanner invisible pour les fichiers */}

                <div
                  id="file-reader"
                  className="
                    pointer-events-none
                    absolute
                    h-0
                    w-0
                    overflow-hidden
                    opacity-0
                  "
                />

              </div>
            )}

            {/* ==================================
                SUCCÈS
            ================================== */}

            {guest && (
              <div
                className="
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-green-200
                  bg-green-50
                  p-5
                  shadow-md
                  sm:p-6
                "
              >

                <div
                  className="
                    text-center
                  "
                >

                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-green-500
                      text-3xl
                      text-white
                      shadow-md
                    "
                  >
                    ✓
                  </div>

                  <h2
                    className="
                      mt-4
                      text-xl
                      font-bold
                      text-green-800
                      sm:text-2xl
                    "
                  >
                    Présence confirmée
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-green-700
                    "
                  >
                    Le check-in a été enregistré.
                  </p>

                </div>

                {/* INFORMATIONS */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    bg-white
                    p-4
                    shadow-sm
                  "
                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wide
                      text-[#999A94]
                    "
                  >
                    Invité
                  </p>

                  <p
                    className="
                      mt-1
                      break-words
                      text-lg
                      font-semibold
                      text-[#435141]
                    "
                  >
                    {guest.first_name}{" "}
                    {guest.last_name}
                  </p>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#F8F5ED]
                      px-3
                      py-3
                    "
                  >

                    <span
                      className="
                        text-sm
                        text-[#6E6E66]
                      "
                    >
                      👥 Personnes
                    </span>

                    <strong
                      className="
                        text-lg
                        text-[#435141]
                      "
                    >
                      {guest.guests_count}
                    </strong>

                  </div>

                </div>

                {/* ACTIONS */}

                <div
                  className="
                    mt-5
                    space-y-3
                  "
                >

                  <button
                    type="button"
                    onClick={
                      scanAnother
                    }
                    className="
                      min-h-12
                      w-full
                      rounded-xl
                      bg-[#A8B5A2]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-[#96A38F]
                      active:scale-[0.98]
                    "
                  >
                    📷 Scanner un autre invité
                  </button>

                  <Link
                    href="/checkin/list"
                    className="
                      flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#A8B5A2]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#435141]
                      transition
                      hover:bg-[#A8B5A2]
                      hover:text-white
                    "
                  >
                    📋 Voir les présents
                  </Link>

                </div>

              </div>
            )}

            {/* ==================================
                ERREUR
            ================================== */}

            {errorMessage && !guest && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-red-100
                      text-xl
                    "
                  >
                    ⚠️
                  </div>

                  <div>

                    <h2
                      className="
                        font-semibold
                        text-red-800
                      "
                    >
                      Scan impossible
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-5
                        text-red-700
                      "
                    >
                      {errorMessage}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={
                    scanAnother
                  }
                  className="
                    mt-4
                    min-h-11
                    w-full
                    rounded-xl
                    bg-red-500
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  📷 Réessayer
                </button>

              </div>
            )}

            {/* ==================================
                CONSEILS
            ================================== */}

            {!guest &&
              !errorMessage && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-[#DDD8CF]
                    bg-white/70
                    p-5
                    shadow-sm
                    sm:p-6
                  "
                >

                  <h2
                    className="
                      font-semibold
                      text-[#435141]
                    "
                  >
                    💡 Comment utiliser
                  </h2>

                  <div
                    className="
                      mt-4
                      space-y-3
                    "
                  >

                    <div
                      className="
                        flex
                        gap-3
                      "
                    >
                      <span>📱</span>

                      <p
                        className="
                          text-sm
                          leading-5
                          text-[#6E6E66]
                        "
                      >
                        <strong>
                          Téléphone :
                        </strong>{" "}
                        utilisez directement
                        la caméra.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        gap-3
                      "
                    >
                      <span>💻</span>

                      <p
                        className="
                          text-sm
                          leading-5
                          text-[#6E6E66]
                        "
                      >
                        <strong>
                          Ordinateur :
                        </strong>{" "}
                        utilisez la caméra ou
                        déposez une image du QR.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        gap-3
                      "
                    >
                      <span>🔒</span>

                      <p
                        className="
                          text-sm
                          leading-5
                          text-[#6E6E66]
                        "
                      >
                        Un QR déjà utilisé ne
                        peut pas être validé
                        une seconde fois.
                      </p>
                    </div>

                  </div>

                </div>
              )}

            {/* ==================================
                LOGOUT
            ================================== */}

            <button
              type="button"
              onClick={logout}
              className="
                min-h-11
                w-full
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              🚪 Déconnexion
            </button>

          </aside>

        </div>

        {/* FOOTER */}

        <footer
          className="
            mt-7
            text-center
            sm:mt-10
          "
        >
          <p
            className="
              text-[11px]
              text-[#999A94]
              sm:text-xs
            "
          >
            🔒 Espace réservé au personnel du mariage
          </p>
        </footer>

      </div>
    </main>
  );
}