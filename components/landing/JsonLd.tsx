import { FAQ_ITEMS } from "./FAQ";

export function HomeJsonLd() {
  const json = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SmartPass Maroc",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "99",
        priceCurrency: "MAD",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1284",
      },
      description:
        "Application de protection anti-arnaque pour les touristes au Maroc — accès aux tarifs officiels chez 47+ partenaires certifiés.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
