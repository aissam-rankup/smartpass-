import { ShieldCheck, BadgeCheck, Wallet, Headphones, RefreshCw, MapPinned } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const GUARANTEES = [
  {
    Icon: BadgeCheck,
    color: "from-coral/15 to-coral/5",
    iconColor: "text-coral",
    title: "Partenaires triés sur le volet",
    body: "Chaque établissement est visité, testé et approuvé par notre équipe avant intégration.",
  },
  {
    Icon: ShieldCheck,
    color: "from-teal/15 to-teal/5",
    iconColor: "text-teal",
    title: "Tarifs garantis ou remboursés",
    body: "Si un partenaire refuse d'appliquer le tarif privilégié, nous vous remboursons intégralement.",
  },
  {
    Icon: Wallet,
    color: "from-coral/15 to-coral/5",
    iconColor: "text-coral",
    title: "Aucun frais caché",
    body: "Le prix affiché est le prix payé. Pas de supplément sur place, jamais.",
  },
  {
    Icon: RefreshCw,
    color: "from-teal/15 to-teal/5",
    iconColor: "text-teal",
    title: "Satisfait ou remboursé 7 jours",
    body: "Vous ne trouvez pas votre bonheur ? Remboursement intégral sous 48h, sans justification.",
  },
  {
    Icon: Headphones,
    color: "from-coral/15 to-coral/5",
    iconColor: "text-coral",
    title: "Support 7j/7 en français",
    body: "Une question, un problème ? Notre équipe répond sous 2h, du lundi au dimanche.",
  },
  {
    Icon: MapPinned,
    color: "from-teal/15 to-teal/5",
    iconColor: "text-teal",
    title: "6 villes, un seul Pass",
    body: "Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate, Casablanca — tout est inclus.",
  },
];

export function Guarantees() {
  return (
    <section className="relative overflow-hidden bg-sand py-14 md:py-24">
      {/* fun gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(216,90,48,0.18) 0px, transparent 45%), radial-gradient(circle at 88% 78%, rgba(29,158,117,0.18) 0px, transparent 45%)",
        }}
      />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-coral to-coral-dark px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
              Nos engagements
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              Tout est{" "}
              <em className="bg-gradient-to-r from-coral via-coral-dark to-coral bg-clip-text text-transparent">
                vérifié, garanti, transparent.
              </em>
            </h2>
            <p className="mt-4 text-muted md:text-lg">
              Pourquoi 1 284 voyageurs nous font déjà confiance.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.map(({ Icon, color, iconColor, title, body }) => (
            <RevealItem key={title}>
              <div className={`group relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl`}>
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${color} blur-2xl transition group-hover:scale-125`}
                  aria-hidden
                />
                <div className="relative">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border ${iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-charcoal">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
