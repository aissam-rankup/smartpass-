import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const cities = [
  { name: "Agadir",     partners: 14, offers: 89, img: IMG.cityAgadir,     tag: "Plages & soleil" },
  { name: "Marrakech",  partners: 12, offers: 76, img: IMG.cityMarrakech,  tag: "Médina & riads" },
  { name: "Essaouira",  partners: 7,  offers: 41, img: IMG.cityEssaouira,  tag: "Port bleu & vent" },
  { name: "Taghazout",  partners: 8,  offers: 52, img: IMG.surfTaghazoutCar, tag: "Surf town" },
  { name: "Ouarzazate", partners: 3,  offers: 18, img: IMG.cityOuarzazate, tag: "Désert & kasbahs" },
  { name: "Casablanca", partners: 3,  offers: 22, img: IMG.cityCasablanca, tag: "Métropole côtière" },
];

export function Cities() {
  return (
    <section className="container-px py-14 md:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal">
              Destinations
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              6 villes.
              <br />
              <em className="text-coral">Un seul Pass.</em>
            </h2>
            <p className="mt-3 text-muted md:text-lg">
              Du surf à Taghazout au désert d'Ouarzazate — vos tarifs vous suivent partout.
            </p>
          </div>
          <Link
            href="/partenaires"
            className="hidden text-sm font-medium text-coral underline-offset-4 hover:underline md:block"
          >
            Voir tous les partenaires →
          </Link>
        </div>
      </Reveal>

      <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <RevealItem key={c.name}>
            <Link
              href={`/partenaires?city=${c.name}`}
              className="group relative block overflow-hidden rounded-lg bg-stone shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={`${c.name}, Maroc — ${c.tag}`}
                  className="h-full w-full object-cover transition duration-[800ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />

                <span className="absolute left-4 top-4 inline-block rounded-full bg-sand/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal backdrop-blur">
                  {c.tag}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-sand">
                  <h3 className="font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">
                    {c.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-sand/80">
                      {c.partners} partenaires · {c.offers} offres
                    </p>
                    <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
                  </div>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
