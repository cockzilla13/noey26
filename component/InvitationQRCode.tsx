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
}