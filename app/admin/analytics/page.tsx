"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 supabase
}
from "@/lib/supabase";

export default function Analytics() {

 const [
  visitors,
  setVisitors
 ] = useState<any[]>([]);

 const [
  logins,
  setLogins
 ] = useState<any[]>([]);

 const [
  rsvps,
  setRsvps
 ] = useState<any[]>([]);

 async function loadData() {

  const {
   data: visitorsData
  } = await supabase
   .from("visitor_logs")
   .select("*");

  const {
   data: loginData
  } = await supabase
   .from("login_logs")
   .select("*");

  const {
   data: rsvpData
  } = await supabase
   .from("rsvps")
   .select("*");

  setVisitors(
   visitorsData || []
  );

  setLogins(
   loginData || []
  );

  setRsvps(
   rsvpData || []
  );

 }

 useEffect(() => {

  loadData();
  
  ////
const channel =
 supabase
 .channel(
  "analytics"
 )
 .on(
  "postgres_changes",
  {
   event:"*",
   schema:"public",
   table:"visitor_logs"
  },
  () => loadData()
 )
 .subscribe();

return () => {

 supabase
 .removeChannel(
  channel
 );

};

////
 }, []);
 
 return (

 <main
  className="
  p-8
  "
 >

 <h1
  className="
  text-4xl
  font-bold
  mb-8
  "
 >
  📊 Analytics
 </h1>

 <div
  className="
  grid
  md:grid-cols-4
  gap-6
  "
 >

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  👥
  <br />
  {visitors.length}
  <br />
  Visites
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  📨
  <br />
  {
   rsvps.length
  }
  <br />
  RSVP
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  🔑
  <br />
  {
   logins.length
  }
  <br />
  Connexions
 </div>

 <div
  className="
  rounded-2xl
  p-6
  border
  "
 >
  ✅
  <br />
  {
   rsvps.filter(
    (r)=>
    r.checked_in
   ).length
  }
  <br />
  Présents
 </div>

 </div>
 <div
 className="
 mt-10
 rounded-2xl
 border
 p-6
 "
>

<h2>
 Dernières connexions
</h2>

{logins.map(
 (l)=>(

<div
 key={l.id}
 className="
 border-b
 py-2
 "
>

 {l.email}

 <br />

 {l.role}

 <br />

 {l.latitude}
 ,
 {l.longitude}

</div>

))}
</div>
</main>
);

}