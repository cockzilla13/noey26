/*import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("📱 NOTIFICATION WHATSAPP");
    console.log(body);

    return NextResponse.json({
      success: true,
      message: "Notification reçue.",
    });
  } catch (error) {
    console.error(
      "Erreur notification WhatsApp :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      {
        status: 500,
      }
    );
  }
}
*/

import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      attending,
      guestsCount,
      invitationCode,
    } = body;

    const instanceId =
      process.env.GREEN_API_INSTANCE_ID;

    const token =
      process.env.GREEN_API_TOKEN;

    const organizerPhone =
      process.env.ORGANIZER_WHATSAPP;
	    const mapsQuery = encodeURIComponent(
   // "Mpolongwe Kribi"
	 `"3°02'15.7"N 9°57'49.5"E"`
	
 );



    	const invitationUrl =
		`${process.env.NEXT_PUBLIC_SITE_URL}/invitation/${invitationCode}`;

		const mapsUrl =
		   `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
		   
		const calendarUrl =
		"https://calendar.google.com/calendar/render?action=TEMPLATE"
		+
		"&text=Mariage+Donald+Kevin+%26+Marie"
		+
		"&dates=20261212T150000/20261213T020000";
    if (
      !instanceId ||
      !token ||
      !organizerPhone
    ) {
      throw new Error(
        "Variables GREEN API manquantes"
      );
    }
       let organizerResult = null;
       let guestResult = null;
		const organizerMessage = `
		💍 NOUVEAU RSVP

		👤 ${firstName} ${lastName}

		❤️ Présence : ${attending ? "OUI" : "NON"}

		👥 Invités : ${guestsCount}

		📱 Téléphone : ${phone || "-"}

		📧 Email : ${email || "-"}

		🎟️ Code : ${invitationCode}

		🔗 Invitation :
		${invitationUrl}

		📅 12 Décembre 2026

		📍 Mpolongwe - Kribi
		`;
	
	
	    const guestMessage = `
		Bonjour ${firstName} 🌿

		Merci d'avoir confirmé votre présence au mariage de

		🤍 Donald Kevin
		&
		🥂 Marie

		📅 19 Décembre 2026

		📍 Mpolongwe - Kribi

		🎟️ Votre code :

		${invitationCode}

		📍 Itinéraire :
		${mapsUrl}

		📅 Ajouter au calendrier :
		${calendarUrl}

		🔗 Votre invitation :
		${invitationUrl}

		Nous avons hâte de partager cette journée avec vous 💚
		`;
			
			
			const message = `
		💍 NOUVEAU RSVP

		👤 ${firstName} ${lastName}

		❤️ Présence : ${
			  attending ? "OUI" : "NON"
			}

		👥 Nombre d'invités : ${guestsCount}

		📱 Téléphone : ${phone || "-"}

		📧 Email : ${email || "-"}

		🎟️ Code : ${invitationCode}

		📅 12 décembre 2026
		📍 Mpolongwe - Kribi
		`;


		try {
		  organizerResult = await fetch(
			`https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`,
			{
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				chatId: `${organizerPhone}@c.us`,
				message: organizerMessage,
			  }),
			}
		  );

		  console.log(
			"WhatsApp organisateur envoyé"
		  );

		} catch (error) {
		  console.error(
			"Erreur WhatsApp organisateur",
			error
		  );
		}
		
		if (phone) {

		  try {

			const guestPhone =
			  phone
				.replace("+", "")
				.replace(/\s/g, "");

			guestResult = await fetch(
			  `https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`,
			  {
				method: "POST",
				headers: {
				  "Content-Type":
					"application/json",
				},
				body: JSON.stringify({
				  chatId:
					`${guestPhone}@c.us`,
				  message:
					guestMessage,
				}),
			  }
			);

			console.log(
			  "WhatsApp invité envoyé"
			);

		  } catch (error) {

			console.error(
			  "Erreur WhatsApp invité",
			  error
			);

		  }

		}
    
		

    //const result =
    //  await response.json();

    //console.log(
     // "DK API RESULT:",
    //  result
   // );

	  return NextResponse.json({
	  success: true,
	  organizerSent:
		organizerResult?.ok ?? false,
	  guestSent:
		guestResult?.ok ?? false,
	});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
