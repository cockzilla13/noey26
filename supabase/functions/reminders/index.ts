// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/*import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

console.log("Hello from Functions!");

// This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// Use publishable for Client-facing, key-validated endpoints
// Use secret for Server-to-server, internal calls
export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
    // Called by another service with a secret key
    // ctx.supabaseAdmin bypasses RLS — use for privileged operations
    /*
    if (ctx.authMode === "secret") {
      const { user_id } = await req.json();
      const { data } = await ctx.supabaseAdmin.auth.admin.getUserById(user_id);

      return Response.json({
        email: data?.user?.email,
      });
    }
    

    const { name } = await req.json();

    return Response.json({
      message: `Hello ${name}!`,
    });
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/reminders' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/ 
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase
    .from("rsvp_reminders")
    .select("*");

  if (error) {
    console.error("Error fetching reminders:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  for (const guest of data ?? []) {
    const days = guest.days_remaining;

    // J-30
    if (days === 30 && !guest.reminder_30_sent) {
      await sendReminder(guest, "30");

      await supabase
        .from("rsvp_reminders")
        .update({
          reminder_30_sent: true,
        })
        .eq("id", guest.id);
    }

    // J-7
    if (days === 7 && !guest.reminder_7_sent) {
      await sendReminder(guest, "7");

      await supabase
        .from("rsvp_reminders")
        .update({
          reminder_7_sent: true,
        })
        .eq("id", guest.id);
    }

    // J-1
    if (days === 1 && !guest.reminder_1_sent) {
      await sendReminder(guest, "1");

      await supabase
        .from("rsvp_reminders")
        .update({
          reminder_1_sent: true,
        })
        .eq("id", guest.id);
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});
async function sendReminder(
  guest: any,
  type: string
) {

  let message = "";

  switch (type) {

    case "30":
      message =
`💍 Bonjour ${guest.first_name}

Plus qu'un mois avant le mariage de Donald Kevin & Marie.

📅 19 décembre 2026
📍 Mpolongwe - Kribi

🎟️ ${guest.invitation_code}`;
      break;

    case "7":
      message =
`💚 Bonjour ${guest.first_name}

Plus qu'une semaine avant notre mariage.

📍 Mpolongwe - Kribi

🎟️ ${guest.invitation_code}`;
      break;

    case "1":
      message =
`✨ Bonjour ${guest.first_name}

Nous avons hâte de vous accueillir demain.

📅 Demain à 15h00

🎟️ ${guest.invitation_code}`;
      break;

  }

  console.log(message);
  
  await fetch(
  `${Deno.env.get(
    "SITE_URL"
  )}/api/email-reminder`,
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      guest,
      message,
      reminderType: type,
    }),
  }
);
await fetch(
  `https://api.green-api.com/waInstance${Deno.env.get(
    "GREEN_API_INSTANCE_ID"
  )}/sendMessage/${Deno.env.get(
    "GREEN_API_TOKEN"
  )}`,
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      chatId:
        `${guest.phone}@c.us`,

      message,
    }),
  }
);

}