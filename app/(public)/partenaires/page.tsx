import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CatalogueFilters } from "@/components/catalogue/Filters";
import { PartnerCard, type PartnerCardData } from "@/components/catalogue/PartnerCard";
import type { Prisma } from "@prisma/client";
import { PartnerCategory } from "@/lib/enums";

export const metadata: Metadata = {
  title: "47 partenaires certifiés au Maroc — Tarifs garantis par catégorie et ville",
  description:
    "Tous les partenaires Morocco Pass : restaurants, surf à Taghazout, excursions désert à Marrakech, hammams, hébergements, transferts aéroport, location voiture. Comparez les tarifs locaux dans 6 villes : Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate, Casablanca.",
  keywords: [
    "partenaires maroc", "restaurant agadir prix", "surf taghazout école",
    "excursion désert marrakech", "hammam marrakech tarif", "riad marrakech prix",
    "que faire à agadir", "que faire à essaouira", "transfert aéroport agadir",
    "location voiture maroc prix",
  ],
  alternates: {
    canonical: "/partenaires",
    languages: { "fr-MA": "/partenaires", "en-US": "/partenaires", "x-default": "/partenaires" },
  },
  openGraph: {
    title: "47 partenaires certifiés Morocco Pass",
    description: "Restaurants, surf, excursions, hammams, hébergements — tarifs locaux garantis dans 6 villes au Maroc.",
    url: "/partenaires",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: { city?: string; category?: string; q?: string };
}) {
  const where: Prisma.PartnerWhereInput = { isActive: true };
  if (searchParams.city) where.city = searchParams.city;
  if (searchParams.category && searchParams.category in PartnerCategory) {
    where.category = searchParams.category;
  }
  if (searchParams.q) {
    where.name = { contains: searchParams.q };
  }

  const partners = await prisma.partner.findMany({
    where,
    orderBy: [{ totalScans: "desc" }, { createdAt: "desc" }],
    include: {
      offers: {
        where: { isActive: true, isPaused: false },
        orderBy: { reducedPrice: "asc" },
        take: 1,
      },
      _count: { select: { offers: { where: { isActive: true, isPaused: false } } } },
    },
  });

  const cards: PartnerCardData[] = partners.map((p) => ({
    slug: p.slug,
    name: p.name,
    city: p.city,
    category: p.category,
    description: p.description,
    isVerified: p.isVerified,
    coverImageUrl: p.coverImageUrl,
    offerCount: p._count.offers,
    startingFrom: p.offers[0]?.reducedPrice ?? null,
  }));

  return (
    <div className="container-px py-10">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-coral">
          Accueil
        </Link>{" "}
        / <span className="text-charcoal">Partenaires</span>
      </nav>

      <header className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Partenaires certifiés
          </h1>
          <p className="mt-1 text-sm text-muted">
            {cards.length} partenaire{cards.length > 1 ? "s" : ""} · Maroc
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <CatalogueFilters current={searchParams} />

        <div>
          {cards.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-white p-12 text-center">
              <p className="text-muted">Aucun partenaire ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {cards.map((p) => (
                <PartnerCard key={p.slug} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
