import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const categories = [
  { name: "Restauration",     slug: "RESTAURATION",     desc: "Tagines, couscous, petit-déj marocain", from: "40 DH",  usd: "~$4",  img: IMG.restaurantTagine },
  { name: "Surf & Sport",     slug: "SURF_SPORT",       desc: "Cours, location, packs activités",       from: "150 DH", usd: "~$15", img: IMG.surfStanding },
  { name: "Transport",        slug: "TRANSPORT",        desc: "Transferts, excursions, navettes",       from: "80 DH",  usd: "~$8",  img: IMG.taxiMorocco },
  { name: "Excursions",       slug: "EXCURSIONS",       desc: "Désert, circuits, journées",             from: "300 DH", usd: "~$30", img: IMG.desertCamels },
  { name: "Location voiture", slug: "LOCATION_VOITURE", desc: "Citadines, SUV, 4x4",                    from: "180 DH", usd: "~$18", img: IMG.carRentalKeys },
  { name: "Bien-être",        slug: "BIEN_ETRE",        desc: "Hammam, massage, spa",                   from: "100 DH", usd: "~$10", img: IMG.hammamArch },
  { name: "Hébergement",      slug: "HEBERGEMENT",      desc: "Riads, guesthouses",                     from: "250 DH", usd: "~$25", img: IMG.hotelRiad },
  { name: "Culture",          slug: "CULTURE",          desc: "Musées, guides, ateliers",               from: "60 DH",  usd: "~$6",  img: IMG.cultureMarketColor },
  { name: "Shopping",         slug: "SHOPPING",         desc: "Artisanat, souvenirs certifiés",         from: "20 DH",  usd: "~$2",  img: IMG.souksSpices },
];

export function Categories() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-14 md:py-24 text-sand">
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
                    À partir de {c.from} avec SmartPass{" "}
                    <span className="text-[10px] font-normal text-sand/50">({c.usd})</span>
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
