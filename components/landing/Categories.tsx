import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const categories = [
  { emoji: "🍽️", name: "Restauration",     slug: "RESTAURATION",     desc: "Tagines, couscous, petit-déj marocain", from: "40 MAD",  img: IMG.restaurantTagine },
  { emoji: "🌊", name: "Surf & Sport",     slug: "SURF_SPORT",       desc: "Cours, location, packs activités",       from: "150 MAD", img: IMG.surfStanding },
  { emoji: "🚐", name: "Transport",        slug: "TRANSPORT",        desc: "Transferts, excursions, navettes",       from: "80 MAD",  img: IMG.taxiMorocco },
  { emoji: "🐪", name: "Excursions",       slug: "EXCURSIONS",       desc: "Désert, circuits, journées",             from: "300 MAD", img: IMG.desertCamels },
  { emoji: "🚗", name: "Location voiture", slug: "LOCATION_VOITURE", desc: "Citadines, SUV, 4x4",                    from: "180 MAD", img: IMG.taxiRoad },
  { emoji: "💆", name: "Bien-être",        slug: "BIEN_ETRE",        desc: "Hammam, massage, spa",                   from: "100 MAD", img: IMG.hammamArch },
  { emoji: "🏨", name: "Hébergement",      slug: "HEBERGEMENT",      desc: "Riads, guesthouses",                     from: "250 MAD", img: IMG.hotelRiad },
  { emoji: "🎨", name: "Culture",          slug: "CULTURE",          desc: "Musées, guides, ateliers",               from: "60 MAD",  img: IMG.cultureMarketColor },
  { emoji: "🛍️", name: "Shopping",         slug: "SHOPPING",         desc: "Artisanat, souvenirs certifiés",         from: "20 MAD",  img: IMG.souksSpices },
];

export function Categories() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-24 text-sand">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(at 0% 0%, rgba(216,90,48,0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(29,158,117,0.3) 0px, transparent 50%)",
        }}
      />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral">
              Tout, partout au Maroc
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              9 catégories. <em className="text-coral">47 partenaires.</em>
            </h2>
            <p className="mt-3 text-sand/70 md:text-lg">
              Trouvez le tarif officiel pour chaque moment de votre voyage.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <RevealItem key={c.slug}>
              <Link
                href={`/partenaires?category=${c.slug}`}
                className="group relative block overflow-hidden rounded-lg border border-white/10 bg-dark-surface transition hover:-translate-y-1 hover:border-coral/40 hover:shadow-2xl hover:shadow-coral/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={`${c.name} — partenaires SmartPass`}
                    className="h-full w-full object-cover opacity-90 transition duration-[800ms] group-hover:scale-110 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/55 to-transparent" />
                  <span
                    className="absolute right-3 top-3 text-2xl drop-shadow-lg"
                    aria-hidden
                  >
                    {c.emoji}
                  </span>
                </div>
                <div className="relative p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-sand">{c.name}</h3>
                      <p className="mt-1 text-sm text-sand/60">{c.desc}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-sand/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
                  </div>
                  <p className="mt-4 text-xs font-medium text-coral">
                    À partir de {c.from} avec SmartPass
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
