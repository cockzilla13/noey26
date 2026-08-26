
import SmartEventButtons from "@/component/SmartEventButtons";
//import page from "@/component/page";

interface InvitationPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { code } = await params;

  return (
    <main className="min-h-screen bg-[#F8F6F1] px-6 py-16">

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-[#B9A77C]">
          Invitation officielle
        </p>

        <h1 className="mt-6 text-5xl font-serif text-[#A8B5A2]">
          Donald Kevin
          <span className="mx-3 text-[#D8C7A3]">
            & 
          </span>
           Marie
        </h1>

        <p className="mt-6 text-lg text-[#5E625B]">
          Nous avons le plaisir de vous inviter
          à célébrer notre mariage.
        </p>

        <div className="mt-12 rounded-[32px] bg-white/80 p-8 shadow-xl backdrop-blur-xl">

          <p className="text-sm text-[#888278]">
            Code de l'invitation
          </p>

          <p className="mt-3 text-2xl font-bold tracking-[0.2em] text-[#A8B5A2]">
            {code}
          </p>

          <div className="mt-8 space-y-4 text-[#5E625B]">

            <p>
              📅 <strong>12 décembre 2026</strong>
            </p>

            <p>
              📍 <strong>Mpolongwe — Kribi</strong>
            </p>

            <p>
              🕒 <strong>15h00</strong>
            </p>

          </div>
<SmartEventButtons />

        </div>

      </div>

    </main>
  );
}