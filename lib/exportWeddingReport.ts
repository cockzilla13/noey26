import * as XLSX from "xlsx";

export function exportWeddingReport(
 guests: any[]
) {

 const report =
  guests.map((g) => ({

   Nom:
    `${g.first_name} ${g.last_name}`,

   Telephone:
    g.phone,

   Email:
    g.email,

   Presence:
    g.attending
     ? "Oui"
     : "Non",

   Personnes:
    g.guests_count,

   Checkin:
    g.checked_in
     ? "Oui"
     : "Non",

  }));

 const ws =
  XLSX.utils.json_to_sheet(
   report
  );

 const wb =
  XLSX.utils.book_new();

 XLSX.utils.book_append_sheet(
  wb,
  ws,
  "Rapport"
 );

 XLSX.writeFile(
  wb,
  "RapportMariage.xlsx"
 );

}