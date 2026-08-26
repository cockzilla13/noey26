import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateQRCode } from "@/lib/generateQr";
import SmartEventButtons from "@/component/SmartEventButtons";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      attending,
      guestsCount,
      invitationCode,
      phone,
      email,
    } = body;

    const result = await resend.emails.send({
      from: "Mariage <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `💍' Nouveau RSVP - ${firstName} ${lastName}`,
      html: `
        <h2>Nouveau RSVP</h2>

        <p><strong>Nom :</strong>
        ${firstName} ${lastName}</p>

        <p><strong>Téléphone :</strong>
        ${phone}</p>

        <p><strong>Email :</strong>
        ${email}</p>

        <p><strong>Présence :</strong>
        ${attending ? "Oui" : "Non"}</p>

        <p><strong>Invités :</strong>
        ${guestsCount}</p>

        <p><strong>Code :</strong>
        ${invitationCode}</p>

        <hr />

        <p>
          Mariage Donald Kevin & Marie
        </p>
      `,
    });
	
			const qrCodeImage =
		  await generateQRCode(invitationCode);
		  
		   /*
		   * Lieu du mariage
		   */
		  const mapsQuery = encodeURIComponent(
			// "Mpolongwe Kribi"
			 `"3°02'15.7"N 9°57'49.5"E"`
		  );

		  /*
		   * Google Maps
		   */
		  const mapsUrl =`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
		//  const mapsUrl =
		//"https://www.google.com/maps/search/?api=1&query=Mpolongwe+Kribi";

		const calendarUrl =
		`https://calendar.google.com/calendar/render?action=TEMPLATE
		&text=Mariage+Donald+Kevin+%26+Marie
		&dates=20261219T150000/20261220T020000
		&location=Mpolongwe+Kribi`;

	if (email) {
  await resend.emails.send({
    from:
      "Donald Kevin & Marie <onboarding@resend.dev>",

    to: email,

    subject:
      "✨ Confirmation de votre invitation",

    html: `
      <div
        style="
          max-width:700px;
          margin:auto;
          padding:40px;
          background:#F8F6F1;
          font-family:Arial,sans-serif;
          border-radius:24px;
        "
      >

        <h1
          style="
            color:#A8B5A2;
            text-align:center;
          "
        >
          Donald Kevin & Marie
        </h1>

        <p
          style="
            text-align:center;
            color:#5E625B;
          "
        >
          Merci pour votre confirmation 💚
        </p>

        <div
          style="
            background:white;
            padding:25px;
            border-radius:18px;
            margin-top:20px;
          "
        >

          <p>
            Bonjour ${firstName},
          </p>

          <p>
            Votre présence a bien été
            enregistrée.
          </p>

          <p>
            📅 <strong>12 décembre 2026</strong>
          </p>

          <p>
            📍 <strong>Mpolongwe - Kribi</strong>
          </p>

          <p>
            🕒 <strong>15h00</strong>
          </p>

          <hr />

          <p>
            🎟️ Votre code invitation :
          </p>

          <h2
            style="
              color:#A8B5A2;
              letter-spacing:3px;
            "
          >
            ${invitationCode}
          </h2>
		  
		  <a
 href="${mapsUrl}"
 style="
   background:#A8B5A2;
   color:white;
   padding:12px 18px;
   border-radius:10px;
   text-decoration:none;
 "
>
📍 Itinéraire Google Maps
</a>
   <a
 href="${calendarUrl}"
 style="
   background:#D8C7A3;
   color:#333;
   padding:12px 18px;
   border-radius:10px;
   text-decoration:none;
 "
>
📅 Ajouter au calendrier
</a>
        </div>



        <div
          style="
            text-align:center;
            margin-top:30px;
          "
        >

          <a
            href="${process.env.NEXT_PUBLIC_SITE_URL}/invitation/${invitationCode}"
            style="
              display:inline-block;
              background:#A8B5A2;
              color:white;
              padding:14px 24px;
              border-radius:12px;
              text-decoration:none;
            "
          >
            Voir mon invitation
          </a>

        </div>
		
				<div style="text-align:center">

		  <img
			src="${qrCodeImage}"
			width="220"
			alt="QR Code Invitation"
		  />

		</div>
 
 
      </div>
    `,
  });
}
 

    return NextResponse.json({
      success: true,
      result,
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