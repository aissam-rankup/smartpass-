import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Globe, MapPin, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { OfferCard } from "@/components/catalogue/OfferCard";
import { CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/labels";
import { getCurrentUserWithSubscription } from "@/lib/access";
import { csv, type PartnerCategory } from "@/lib/enums";

export const dynamic = "force-dynamic";

async function loadPartner(slug: string) {
  return prisma.partner.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { isActive: true, isPaused: false },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const partner = await loadPartner(params.slug);
  if (!partner) return {};

  const categoryFr = CATEGORY_LABEL[partner.category as PartnerCategory] || partner.category;
  const offerCount = partner.offers.length;
  const minPrice = partner.offers.length
    ? Math.round(Math.min(...partner.offers.map((o) => o.reducedPrice)))
    : null;

  const title =
    partner.metaTitle ??
    `${partner.name} — ${categoryFr} à ${partner.city}, tarifs Morocco Pass`;

  const desc =
    partner.metaDescription ??
    (minPrice
      ? `${partner.name} à ${partner.city} : ${offerCount} offre${offerCount > 1 ? "s" : ""} avec Morocco Pass, à partir de ${minPrice} DH. ${partner.description.slice(0, 100)}`
      : `${partner.name} à ${partner.city}. Partenaire ${categoryFr} certifié Morocco Pass. ${partner.description.slice(0, 130)}`);

  const url = `/partenaires/${partner.slug}`;

  return {
    title,
    description: desc.slice(0, 160),
    keywords: [
      `${partner.name.toLowerCase()} ${partner.city.toLowerCase()}`,
      `${categoryFr.toLowerCase()} ${partner.city.toLowerCase()} prix`,
      `${categoryFr.toLowerCase()} ${partner.city.toLowerCase()} tarif`,
      `meilleur ${categoryFr.toLowerCase()} ${partner.city.toLowerCase()}`,
      "morocco pass partenaire",
    ],
    alternates: {
      canonical: url,
      languages: { "fr-MA": url, "en-US": url, "x-default": url },
    },
    openGraph: {
      title: `${partner.name} — ${partner.city}`,
      description: partner.description.slice(0, 200),
      url,
      type: "website",
      images: partner.coverImageUrl
        ? [{ url: partner.coverImageUrl, alt: `${partner.name} à ${partner.city}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${partner.name} — ${partner.city}`,
      description: partner.description.slice(0, 160),
      images: partner.coverImageUrl ? [partner.coverImageUrl] : undefined,
    },
  };
}

export default async function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = await loadPartner(params.slug);
  if (!partner) notFound();

  const { hasSubscription } = await getCurrentUserWithSubscription();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";
  const partnerUrl = `${baseUrl}/partenaires/${partner.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${partnerUrl}#business`,
    name: partner.name,
    description: partner.description,
    url: partnerUrl,
    image: partner.coverImageUrl ?? undefined,
    telephone: partner.phone ?? undefined,
    email: partner.email ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: partner.address ?? undefined,
      addressLocality: partner.city,
      addressCountry: "MA",
    },
    ...(partner.latitude && partner.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: partner.latitude,
            longitude: partner.longitude,
          },
        }
      : {}),
    priceRange: partner.offers.length
      ? `${Math.round(Math.min(...partner.offers.map((o) => o.reducedPrice)))}-${Math.round(Math.max(...partner.offers.map((o) => o.reducedPrice)))} MAD`
      : "MAD",
    aggregateRating: partner.totalScans > 10
      ? {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: String(Math.max(5, Math.floor(partner.totalScans / 10))),
        }
      : undefined,
    makesOffer: partner.offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      description: o.description,
      price: o.reducedPrice,
      priceCurrency: "MAD",
      availability: "https://schema.org/InStock",
      url: partnerUrl,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Partenaires", item: `${baseUrl}/partenaires` },
      { "@type": "ListItem", position: 3, name: partner.name, item: partnerUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden bg-charcoal">
          {partner.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.coverImageUrl}
              alt={`${partner.name} — ${partner.city}`}
              className="h-full w-full object-cover opacity-80"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-coral via-coral-dark to-charcoal" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
        </div>
        <div className="container-px relative -mt-24 pb-2">
          <div className="rounded-lg border border-border bg-white p-6 md:p-8">
            <nav className="text-xs text-muted">
              <Link href="/" className="hover:text-coral">Accueil</Link> /{" "}
              <Link href="/partenaires" className="hover:text-coral">Partenaires</Link> /{" "}
              <span className="text-charcoal">{partner.name}</span>
            </nav>
            <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="coral">
                    {CATEGORY_EMOJI[partner.category as PartnerCategory]}{" "}
                    {CATEGORY_LABEL[partner.category as PartnerCategory]}
                  </Badge>
                  {partner.isVerified && (
                    <Badge variant="teal">
                      <BadgeCheck className="h-3 w-3" /> Partenaire vérifié
                    </Badge>
                  )}
                </div>
                <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{partner.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                  <MapPin className="h-4 w-4" /> {partner.city}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted">
                {partner.phone && (
                  <a className="flex items-center gap-1 hover:text-coral" href={`tel:${partner.phone}`}>
                    <Phone className="h-3.5 w-3.5" /> {partner.phone}
                  </a>
                )}
                {partner.website && (
                  <a className="flex items-center gap-1 hover:text-coral" href={partner.website} target="_blank" rel="noreferrer">
                    <Globe className="h-3.5 w-3.5" /> Site web
                  </a>
                )}
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-charcoal/85">
              {partner.description}
            </p>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="container-px py-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Toutes les offres — {partner.name}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {partner.offers.length} offre{partner.offers.length > 1 ? "s" : ""} active
          {partner.offers.length > 1 ? "s" : ""}
        </p>

        {partner.offers.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-border bg-white p-12 text-center text-muted">
            Aucune offre active pour le moment.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partner.offers.map((o) => (
              <OfferCard
                key={o.id}
                offer={{
                  id: o.id,
                  name: o.name,
                  description: o.description,
                  tags: csv.split(o.tags),
                  normalPrice: o.normalPrice,
                  reducedPrice: o.reducedPrice,
                  imageUrl: o.imageUrl,
                }}
                hasSubscription={hasSubscription}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
