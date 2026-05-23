import Link from "next/link";
import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const featured = [
  {
    slug: "ocean-surf-school-taghazout",
    name: "Ocean Surf School",
    city: "Taghazout",
    category: "Surf",
    img: IMG.surfStanding,
    scans: 142, normal: 600, reduced: 250,
    offerName: "Cours découverte 2h",
  },
  {
    slug: "riad-jasmin-marrakech",
    name: "Riad Jasmin",
    city: "Marrakech",
    category: "Hébergement",
    img: IMG.cityMarrakech,
    scans: 89, normal: 850, reduced: 480,
    offerName: "Nuit + petit-déj",
  },
  {
    slug: "taxi-pro-agadir",
    name: "Taxi Pro Agadir",
    city: "Agadir",
    category: "Transport",
    img: IMG.taxiMorocco,
    scans: 312, normal: 300, reduced: 90,
    offerName: "Transfert aéroport",
  },
  {
    slug: "atlas-excursions",
    name: "Atlas Excursions",
    city: "Marrakech",
    category: "Excursions",
    img: IMG.desertCamels,
    scans: 67, normal: 1200, reduced: 650,
    offerName: "Désert 2 jours",
  },
  {
    slug: "saveurs-essaouira",
    name: "Saveurs d'Essaouira",
    city: "Essaouira",
    category: "Restaurant",
    img: IMG.restaurantSpread,
    scans: 198, normal: 280, reduced: 140,
    offerName: "Menu poisson",
  },
  {
    slug: "hammam-royal-agadir",
    name: "Hammam Royal",
    city: "Agadir",
    category: "Bien-être",
    img: IMG.hammamArch,
    scans: 76, normal: 350, reduced: 180,
    offerName: "Hammam + gommage",
  },
];

export function FeaturedPartners() {
  return (
    <section className="container-px py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal">
              Partenaires vedettes
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              Vérifiés un par un.
              <br />
              <em className="text-coral">Aimés de tous.</em>
            </h2>
            <p className="mt-3 text-muted md:text-lg">
              Notre équipe rencontre chaque partenaire à Agadir. Pas de promesses, que des prix.
            </p>
          </div>
          <Link href="/partenaires" className="text-sm font-medium text-coral hover:underline">
            Tous les partenaires →
          </Link>
        </div>
      </Reveal>

      <RevealStagger className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
        {featured.map((p) => (
          <RevealItem key={p.slug} className="w-[320px] shrink-0 snap-start">
            <Link
              href={`/partenaires/${p.slug}`}
              className="group block h-full overflow-hidden rounded-lg border border-border bg-white transition hover:-translate-y-1 hover:border-coral hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.category} à ${p.city}`}
                  className="h-full w-full object-cover transition duration-[800ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <Badge variant="coral">{p.category}</Badge>
                  <Badge variant="teal">
                    <BadgeCheck className="h-3 w-3" /> Vérifié
                  </Badge>
                </div>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-charcoal/70 px-2 py-1 text-[11px] text-sand backdrop-blur">
                  <Star className="h-3 w-3 fill-coral text-coral" /> {p.scans}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-sand">
                  <h3 className="font-display text-xl font-bold leading-tight">{p.name}</h3>
                  <p className="mt-1 text-xs text-sand/75">{p.city}</p>

                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-sand/15 pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-sand/65">
                        {p.offerName}
                      </p>
                      <div className="mt-0.5 flex items-baseline gap-2">
                        <span className="font-display text-lg font-bold text-coral">
                          {p.reduced} MAD
                        </span>
                        <span className="text-xs text-sand/55 line-through">{p.normal} MAD</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
                  </div>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>

      <p className="mt-4 text-center text-sm text-muted">
        Et 41 autres partenaires dans 6 villes...
      </p>
    </section>
  );
}
