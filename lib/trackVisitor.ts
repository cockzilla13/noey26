import { supabase }
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

}