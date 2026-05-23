import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Caveat, Luckiest_Guy } from "next/font/google";
import "./globals.css";

// Display — modern editorial sans-serif. Lapoint-style: clean, bold,
// subtle Scandi character. Variable opsz + weight, full Latin.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body — modern, warm, readable.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

// Headline display — retro surf-camp bold (Kinder Surf vibe).
// Used for H1 across the site.
const headline = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headline",
  display: "swap",
});

// Hand-drawn accent — stickers, polaroid captions, surf-shop flourishes.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma"),
  title: {
    default: "SmartPass Maroc — Protégez-vous des arnaques touristiques",
    template: "%s · SmartPass",
  },
  description:
    "SmartPass vous garantit des tarifs officiels chez 47+ partenaires certifiés au Maroc. Restaurants, surf, transport, excursions — voyagez en toute sécurité pour $30/mois.",
  keywords: [
    "arnaque touriste maroc",
    "tarifs certifiés agadir",
    "protection touriste maroc",
    "réductions agadir marrakech essaouira",
    "smart pass maroc",
  ],
  openGraph: {
    title: "SmartPass — Voyagez malin au Maroc",
    description: "Accédez aux vrais prix. 47+ partenaires certifiés. Anti-arnaque garanti.",
    locale: "fr_MA",
    type: "website",
    images: ["/og/smartpass-og.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${dmSans.variable} ${caveat.variable} ${headline.variable}`}>
      <body>{children}</body>
    </html>
  );
}
