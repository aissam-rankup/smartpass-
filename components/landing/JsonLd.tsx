import { FAQ_ITEMS } from "./FAQ";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";

export function HomeJsonLd() {
  const json = [
    // Organization — site-wide brand
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Morocco Pass",
      legalName: "Morocco Pass Maroc",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description:
        "Le pass voyage anti-arnaque qui garantit les tarifs locaux aux touristes au Maroc.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressRegion: "Souss-Massa",
        addressLocality: "Agadir",
      },
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
      sameAs: [
        "https://www.facebook.com/moroccopass",
        "https://www.instagram.com/moroccopass",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@smartpass.ma",
        availableLanguage: ["French", "English", "Arabic"],
      },
    },

    // WebSite + SearchAction for sitelinks search box in Google
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Morocco Pass",
      description: "Voyagez au Maroc sans payer le prix touriste.",
      inLanguage: "fr-MA",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/partenaires?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // Product — the Morocco Pass itself, with price tiers
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${BASE_URL}/#product`,
      name: "Morocco Pass",
      description:
        "Pass voyage anti-arnaque au Maroc — tarifs locaux garantis chez 47 partenaires certifiés dans 6 villes.",
      brand: { "@id": `${BASE_URL}/#organization` },
      category: "Travel pass",
      image: [`${BASE_URL}/og/smartpass-og.jpg`],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1284",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "MAD",
        lowPrice: "299",
        highPrice: "1199",
        offerCount: 6,
        offers: [
          { "@type": "Offer", name: "Tourist Solo", price: "299", priceCurrency: "MAD" },
          { "@type": "Offer", name: "Tourist Duo", price: "499", priceCurrency: "MAD" },
          { "@type": "Offer", name: "Tourist Famille", price: "999", priceCurrency: "MAD" },
          { "@type": "Offer", name: "Tout Exclusif Solo", price: "399", priceCurrency: "MAD" },
          { "@type": "Offer", name: "Tout Exclusif Duo", price: "699", priceCurrency: "MAD" },
          { "@type": "Offer", name: "Tout Exclusif Famille", price: "1199", priceCurrency: "MAD" },
        ],
      },
    },

    // FAQPage — surfaces directly in Google results
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

// Breadcrumb helper — use on inner pages
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
