import QRCode from "qrcode";

export async function generateQRCode(
  invitationCode: string
) {
  const url =
    `${process.env.NEXT_PUBLIC_SITE_URL}/invitation/${invitationCode}`;

  return await QRCode.toDataURL(url);
}