import { supabase } from "@/lib/supabase";

export async function trackLogin(
  email: string,
  role: string
) {

  try {

    if (!navigator.geolocation) {

      await supabase
        .from("login_logs")
        .insert({

          email,
          role,
          user_agent:
            navigator.userAgent

        });

      return;

    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const { error } =
          await supabase
            .from("login_logs")
            .insert({

              email,
              role,

              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,

              user_agent:
                navigator.userAgent

            });

 if (error) {

  console.log(
    "LOGIN ERROR JSON",
    JSON.stringify(error)
  );

  console.log(
    "LOGIN ERROR FULL",
    error
  );

}
else {

  console.log(
    "LOGIN LOG OK"
  );

}

      },

      async () => {

        await supabase
          .from("login_logs")
          .insert({

            email,
            role,

            user_agent:
              navigator.userAgent

          });

      }

    );

  } catch (err) {

    console.error(
      "TRACK LOGIN ERROR",
      err
    );

  }

}