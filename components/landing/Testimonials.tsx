import { Star, Quote } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "Emma K.",
    flag: "🇩🇪",
    country: "Allemagne",
    city: "Agadir",
    quote:
      "J'ai économisé plus de 800 MAD sur mon séjour à Agadir grâce à SmartPass. Le cours de surf et les transferts à prix fixe, ça change tout. Plus jamais sans ça au Maroc.",
  },
  {
    name: "Lucas B.",
    flag: "🇫🇷",
    country: "France",
    city: "Marrakech",
    quote:
      "On s'est fait avoir au premier jour avec un taxi. Le lendemain j'ai pris SmartPass et c'était fini l'arnaque. Les partenaires sont pros et respectent vraiment les prix affichés.",
  },
  {
    name: "Sarah M.",
    flag: "🇬🇧",
    country: "Royaume-Uni",
    city: "Essaouira",
    quote:
      "The QR code system is genius. You just show it, they scan it, done. No negotiating, no awkward moments. Felt safe the entire trip.",
  },
  {
    name: "Thomas R.",
    flag: "🇧🇪",
    country: "Belgique",
    city: "Taghazout",
    quote:
      "Pour un séjour surf à Taghazout, SmartPass est indispensable. J'ai pris le Pass. Rentabilisé en 3 jours entre les cours et les resto.",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-stone py-14 md:py-24">
      {/* Soft brand-color decorative wash — full-width, no forced positioning */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(216,90,48,0.10) 0px, transparent 50%), radial-gradient(circle at 85% 80%, rgba(29,158,117,0.10) 0px, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral">
              Ils voyagent malin
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              1 284 voyageurs <em className="text-coral">nous font confiance.</em>
            </h2>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="relative h-full overflow-hidden rounded-lg border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-coral/15" aria-hidden />
                <div className="flex items-center gap-1 text-coral">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="relative mt-4 text-base leading-relaxed text-charcoal">
                  &laquo; {t.quote} &raquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden>{t.flag}</span>
                    <span className="font-medium text-charcoal">{t.name}</span>
                    <span className="text-muted">·</span>
                    <span className="text-muted">{t.country}</span>
                  </div>
                  <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-charcoal/70">
                    {t.city}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
