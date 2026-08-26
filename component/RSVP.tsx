/*"use client";

import { useState } from "react";

export default function RSVP() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    personnes: "1",
    message: "",
  });

  const envoyer = () => {
    const texte = `
💍 Confirmation de présence

👤 Nom : ${form.nom}

📞 Téléphone : ${form.telephone}

👥 Nombre de personnes : ${form.personnes}

💬 Message :
${form.message}
    `;

    const url =
      "https://wa.me/237681434767?text=" +
      encodeURIComponent(texte);

    window.open(url, "_blank");
  };

  return (
    <section
      id="rsvp"
      className="py-28 bg-[#FFF8E7]"
    >
      <div className=" mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-5xl text-center font-serif text-[#556B5D]">
          Confirmez votre présence
        </h2>

        <p className="text-center mt-5 text-gray-600">
          Nous serions heureux de célébrer cette journée avec vous.
        </p>

        <input
          className="w-full mt-10 border rounded-xl p-4"
          placeholder="Nom et prénom"
          onChange={(e)=>
            setForm({...form,nom:e.target.value})
          }
        />

        <input
          className="w-full mt-5 border rounded-xl p-4"
          placeholder="Téléphone"
          onChange={(e)=>
            setForm({...form,telephone:e.target.value})
          }
        />

        <select
          className="w-full mt-5 border rounded-xl p-4"
          onChange={(e)=>
            setForm({...form,personnes:e.target.value})
          }
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <textarea
          className="w-full mt-5 border rounded-xl p-4 h-36"
          placeholder="Votre message..."
          onChange={(e)=>
            setForm({...form,message:e.target.value})
          }
        />

        <button
          onClick={envoyer}
          className="mt-8 w-full bg-[#556B5D] text-white rounded-full py-4 hover:bg-[#46584d] transition"
        >
          Confirmer via WhatsApp
        </button>

      </div>
    </section>
  );
}*/


"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import InvitationQRCode from "./InvitationQRCode";

export default function RSVP() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invitationCode, setInvitationCode] =
  useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const firstName = String(form.get("first_name") || "");
    const lastName = String(form.get("last_name") || "");
    const phone = String(form.get("phone") || "");
    const email = String(form.get("email") || "");
    const attending = form.get("attending") === "yes";
    const guestsCount = Number(form.get("guests_count") || 1);
    const guestNames = String(form.get("guest_names") || "");
    const mealPreference = String(
      form.get("meal_preference") || ""
    );
    const transport = String(form.get("transport") || "");
    const message = String(form.get("message") || "");

   /* const invitationCode =
      'DKM-${Date.now().toString(36).toUpperCase()}';
	  */
	  //const invitationCode = `DKM-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
	  
	  // const invitationCode = data.invitation_code;

		const { data, error } = await supabase.rpc(
		  "create_rsvp",
		  {
			p_first_name: firstName,
			p_last_name: lastName,
			p_phone: phone,
			p_email: email,
			p_attending: attending,
			p_guests_count: guestsCount,
			p_guest_names: guestNames,
			p_meal_preference: mealPreference,
			p_transport: transport,
			p_message: message,
		  }
		);
  
        // vérif  de l'eerreur bd
		   if (error) {
		  console.error("Erreur RSVP :", error);

		  setError(
			"Une erreur est survenue. Veuillez réessayer."
		  );

		  setLoading(false);
		  return;
		}
		/*   const invitationCode = data?.[0]?.invitation_code;
		const qrToken = data?.[0]?.qr_token;
		
					console.log(
			  "Code invitation :",
			  invitationCode
			);

			console.log(
			  "QR token :",
			  qrToken
			);
		
		// todo on oublie whatsapp
    setSuccess(true);
    setLoading(false);*/
	
				const generatedInvitationCode =
			  data?.[0]?.invitation_code;

			const generatedQrToken =
			  data?.[0]?.qr_token;

			console.log(
			  "Code invitation :",
			  generatedInvitationCode
			);

			console.log(
			  "QR token :",
			  generatedQrToken
			);

			setInvitationCode(
			  generatedInvitationCode
			);

		try {
		  const notificationResponse = await fetch(
			"/api/whatsapp-notification",
			{
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				firstName,
				lastName,
				phone,
				email,
				attending,
				guestsCount,
				invitationCode: generatedInvitationCode,
			  }),
			}
		  );
  
		  const notificationResult =
			await notificationResponse.json();

		  console.log(
			"Résultat notification :",
			notificationResult
		  );
		} catch (notificationError) {
		  console.error(
			"Notification indisponible :",
			notificationError
		  );
		}
		
		// send la notif à l'admin
				await fetch(
		  "/api/email-notification",
		  {
			method: "POST",
			headers: {
			  "Content-Type":
				"application/json",
			},
			body: JSON.stringify({
			  firstName,
			  lastName,
			  phone,
			  email,
			  attending,
			  guestsCount,
			  invitationCode:
				generatedInvitationCode,
			}),
		  }
		);
		
		/*// send la notif à l'invité
				await fetch(
		  "/api/email-notification",
		  {
			method: "POST",
			headers: {
			  "Content-Type":
				"application/json",
			},
			body: JSON.stringify({
			  firstName,
			  lastName,
			  phone,
			  email,
			  attending,
			  guestsCount,
			  invitationCode:
				generatedInvitationCode,
			}),
		  }
		);*/
		// Le RSVP reste confirmé même si WhatsApp échoue */
		setInvitationCode(generatedInvitationCode);
		setSuccess(true);
		setLoading(false);


			//setSuccess(true);
			//setLoading(false);




/*try {
  const response = await fetch(
    "/api/whatsapp-notification",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        attending,
        guestsCount,
        invitationCode,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error(
      "Erreur notification :",
      result
    );
  }
} catch (error) {
  console.error(
    "Impossible de contacter l'API WhatsApp :",
    error
  );
}*/
    /*await fetch("/api/whatsapp-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        attending,
        guestsCount,
        invitationCode,
      }),
    });*/
  }

 
if (success) {
  return (
    <div className="rounded-[32px] bg-[#F8F6F1]/95 p-8 md:p-12 text-center shadow-2xl">

      <div className="text-5xl mb-5">
        💚
      </div>

      <h3 className="text-3xl font-semibold text-[#A8B5A2]">
        Merci pour votre confirmation
      </h3>

      <p className="mt-4 text-[#5E625B]">
        Votre présence au mariage de Donald Kevin
        & Marie est bien enregistrée.
      </p>

      {invitationCode && (
        <div className="mt-10">
          <InvitationQRCode
            invitationCode={invitationCode}
          />
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-[#D8C7A3]/20 p-5">

        <p className="text-sm text-[#777064]">
          🎟️ Votre code invitation
        </p>

        <p className="mt-2 text-2xl font-bold tracking-widest text-[#A8B5A2]">
          {invitationCode}
        </p>

      </div>

    </div>
  );
}
  

  return (
      <section
      id="rsvp"
     // className="relative  flex h-full flex-col items-center justify-center text-center bg-[#F8F6F2] py-28"
	  className="relative  flex h-full flex-col items-center justify-center bg-[#F8F6F2] py-32"
    >
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[32px]  bg-[#F8F6F1]/90 p-8 shadow-xl"
    >
      <div>
        <label>👤 Prénom</label>

        <input
          required
          name="first_name"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>👤 Nom</label>

        <input
          required
          name="last_name"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>📱 Téléphone</label>

        <input
          required
          name="phone"
          type="tel"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>📧 E-mail</label>

        <input
          name="email"
          type="email"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>✅ Votre présence</label>

        <select
          name="attending"
          className="w-full rounded-2xl border p-4"
        >
          <option value="yes">
            Oui, je serai présent(e) ❤️
          </option>

          <option value="no">
            Désolé(e), je ne pourrai pas venir
          </option>
        </select>
      </div>

      <div>
        <label>👥 Nombre de personnes</label>

        <input
          required
          min="1"
          max="10"
          name="guests_count"
          type="number"
          defaultValue="1"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>Nom des accompagnants</label>

        <textarea
          name="guest_names"
          className="w-full rounded-2xl border p-4"
        />
      </div>

      <div>
        <label>Préférence alimentaire</label>

        <select
          name="meal_preference"
          className="w-full rounded-2xl border p-4"
        >
          <option value="">
            Sélectionner
          </option>

          <option value="standard">
            Menu standard
          </option>

          <option value="vegetarian">
            Végétarien
          </option>

          <option value="other">
            Autre
          </option>
        </select>
      </div>

      <div>
        <label>Transport</label>

        <select
          name="transport"
          className="w-full rounded-2xl border p-4"
        >
          <option value="none">
            Je viens par mes propres moyens
          </option>

          <option value="bus">
            Je souhaite utiliser le transport prévu
          </option>
        </select>
      </div>

      <div>
        <label>Message aux mariés</label>

        <textarea
          name="message"
          rows={4}
          className="w-full rounded-2xl border p-4"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full rounded-full bg-[#A8B5A2] px-8 py-4 font-semibold text-white transition hover:bg-[#919F8A] disabled:opacity-50"
      >
        {loading
          ? "Enregistrement..."
          : "Confirmer ma présence"}
      </button>
    </form>
	  </section>
  );
}