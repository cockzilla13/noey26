/*"use client";

import { QRCodeSVG } from "qrcode.react";

interface InvitationQRCodeProps {
  invitationCode: string;
}

export default function InvitationQRCode({
  invitationCode,
}: InvitationQRCodeProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const invitationUrl =
    `${siteUrl}/invitation/${encodeURIComponent(
      invitationCode
    )}`;

  return (
    <div className="flex flex-col items-center">

      <div className="rounded-3xl bg-white p-5 shadow-xl">

        <QRCodeSVG
          value={invitationUrl}
          size={220}
          level="H"
          includeMargin
        />

      </div>

      <p className="mt-5 text-sm text-[#6F746C]">
        Scannez ce QR code pour ouvrir votre invitation.
      </p>

      <p className="mt-2 text-xs text-[#9A958A]">
        {invitationCode}
      </p>

    </div>
  );
}*/

"use client";

import { QRCodeSVG } from "qrcode.react";

interface InvitationQRCodeProps {
  invitationCode: string;
}

export default function InvitationQRCode({
  invitationCode,
}: InvitationQRCodeProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const invitationUrl =
    `${siteUrl.replace(/\/$/, "")}/invitation/${encodeURIComponent(
      invitationCode
    )}`;

  return (
    <div className="flex w-full flex-col items-center text-center">

      {/* QR CODE */}

      <div
        className="
          rounded-[28px]
          bg-white
          p-4
          shadow-xl
          ring-1
          ring-black/5

          sm:rounded-3xl
          sm:p-5
        "
      >
        <QRCodeSVG
          value={invitationUrl}
          size={200}
          level="H"
          includeMargin
          bgColor="#FFFFFF"
          fgColor="#435141"
          aria-label={`QR code de l'invitation ${invitationCode}`}
        />
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          mt-5
          max-w-xs
          px-4
          text-sm
          leading-6
          text-[#6F746C]

          sm:max-w-sm
        "
      >
        Scannez ce QR code pour ouvrir
        votre invitation.
      </p>

      {/* CODE */}

      <div
        className="
          mt-3
          rounded-full
          bg-[#F4F1E9]
          px-4
          py-2
        "
      >
        <p
          className="
            break-all
            text-xs
            font-semibold
            tracking-[0.18em]
            text-[#9A958A]
          "
        >
          {invitationCode}
        </p>
      </div>

    </div>
  );
}