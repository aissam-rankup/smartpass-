import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Caveat, Fredoka } from "next/font/google";
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

// Headline display — bubbly rounded (Fredoka). Warm, friendly, readable.
const headline = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Morocco Pass — Voyagez au Maroc sans payer le prix touriste",
    template: "%s · Morocco Pass",
  },
  description:
    "Morocco Pass : pass voyage anti-arnaque au Maroc. Tarifs négociés à l'avance chez 47 partenaires certifiés (excursions désert, surf Taghazout, hammam Marrakech, restaurants, hébergements). À partir de 299 DH, valable 2 mois.",
  keywords: [
    // Brand
    "morocco pass", "morocco pass maroc", "smart pass maroc",
    // Anti-scam intent
    "arnaque touriste maroc", "éviter arnaque maroc", "prix touriste maroc",
    "voyager au maroc sans arnaque", "budget voyage maroc",
    // Activity long-tail
    "excursion désert marrakech prix", "excursion désert maroc moins cher",
    "surf taghazout tarif", "surf taghazout prix",
    "hammam marrakech prix", "hammam agadir tarif",
    "réductions activités marrakech", "que faire à agadir", "que faire à essaouira",
    "transfert aéroport agadir prix", "tarif taxi maroc",
    // Cities
    "agadir activités", "marrakech tarifs", "essaouira voyage",
    "taghazout surf", "ouarzazate excursion", "casablanca tourisme",
  ],
  authors: [{ name: "Morocco Pass" }],
  creator: "Morocco Pass",
  publisher: "Morocco Pass",
  category: "travel",
  applicationName: "Morocco Pass",
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    title: "Morocco Pass — Voyagez au Maroc sans payer le prix touriste",
    description:
      "Tarifs négociés chez 47 partenaires certifiés. Excursions, surf, hammams, restaurants. À partir de 299 DH valable 2 mois.",
    locale: "fr_MA",
    alternateLocale: ["en_US"],
    type: "website",
    siteName: "Morocco Pass",
    url: BASE_URL,
    images: [
      { url: "/og/smartpass-og.jpg", width: 1200, height: 630, alt: "Morocco Pass — anti-arnaque au Maroc" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Pass — Tarifs locaux garantis au Maroc",
    description: "Le pass anti-arnaque pour voyager au Maroc. 47 partenaires, 299 DH, 2 mois.",
    images: ["/og/smartpass-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-MA": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${dmSans.variable} ${caveat.variable} ${headline.variable}`}>
      <body>{children}</body>
    </html>
  );
}
