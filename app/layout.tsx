
import "./globals.css";
import { Cormorant_Garamond, Poppins, Great_Vibes } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-title",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600"],
  variable: "--font-body",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata = {
  title: "Donald Kevin & Marie",
  description: "Mariage - 19 décembre 2026",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={'${cormorant.variable} ${poppins.variable} ${vibes.variable}'}>
        {children}
      </body>
    </html>
  );
}