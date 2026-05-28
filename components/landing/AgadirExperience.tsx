import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const moments = [
  {
    time: "08:00",
    title: "Surf à Taghazout",
    body: "Cours débutant à 250 MAD au lieu de 600. Combinaison et planche fournies.",
    img: IMG.surfPaddle,
    badge: "−58%",
  },
  {
    time: "12:30",
    title: "Tagine au port d'Agadir",
    body: "Poisson frais grillé, 140 MAD au lieu de 280. Le vrai prix marocain.",
    img: IMG.restaurantTagine,
    badge: "−50%",
  },
  {
    time: "16:00",
    title: "Hammam traditionnel",
    body: "Gommage et massage, 180 MAD au lieu de 350. Détente après la session surf.",
    img: IMG.hammamDoors,
    badge: "−49%",
  },
  {
    time: "19:30",
    title: "Coucher de soleil & thé à la menthe",
    body: "Sur les ramparts d'Essaouira ou la plage d'Agadir. Le Maroc qu'on aime.",
    img: IMG.lighthouseEssaouira,
    badge: "Inclus",
  },
];

export function AgadirExperience() {
  return (
    <section className="relative overflow-hidden bg-sand py-14 md:py-24">
      <svg
        className="pointer-events-none absolute -top-1 left-0 w-full text-coral/5"
        viewBox="0 0 1440 120"
        fill="currentColor"
        aria-hidden
      >
        <path d="M0,64 C480,128 960,0 1440,48 L1440,0 L0,0 Z" />
      </svg>

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
              Une journée parfaite
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              Agadir & Taghazout —{" "}
              <em className="text-coral">un avant-goût.</em>
            </h2>
            <p className="mt-3 text-muted md:text-lg">
              Voici à quoi ressemble une vraie journée d'un voyageur SmartPass.
              Soleil, vagues, saveurs — au juste prix.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {moments.map((m, i) => (
            <RevealItem key={m.title}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={m.title}
                    className="h-full w-full object-cover transition duration-[800ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

                  <span className="absolute right-3 top-3 rounded-full bg-coral px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
                    {m.badge}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-sand">
                    <p className="text-xs font-medium tracking-[0.14em] opacity-80">
                      {String(i + 1).padStart(2, "0")} · {m.time}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                      {m.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs text-sand/85">{m.body}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted md:text-base">
            <span className="font-semibold text-coral">Total économisé sur la journée : 760 MAD</span>{" "}
            · Le prix du Smart Pass remboursé en une seule journée.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
