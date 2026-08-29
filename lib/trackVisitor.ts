import { supabase }
from "@/lib/supabase";

export async function trackVisitor(
 page: string
) {

 if (
  !navigator.geolocation
 ) return;

 navigator.geolocation.getCurrentPosition(

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

 });

}