import { Handshake, Eye, ShieldCheck } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const PILLARS = [
  {
    Icon: Handshake,
    title: "Tarifs négociés directement",
    body: "Nous travaillons directement avec chaque partenaire pour obtenir des tarifs préférentiels réservés aux membres SmartPass.",
  },
  {
    Icon: Eye,
    title: "Plus de visibilité pour eux",
    body: "Les établissements gagnent en visibilité et attirent davantage de voyageurs grâce à notre plateforme.",
  },
  {
    Icon: ShieldCheck,
    title: "Zéro frais caché",
    body: "Le prix affiché est le prix payé. Aucun supplément sur place, jamais. Si un partenaire ne respecte pas, il est retiré.",
  },
];

export function WhyLowPrices() {
  return (
    <section className="bg-stone py-14 md:py-24">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal">
              La transparence d&apos;abord
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              Pourquoi les partenaires acceptent-ils{" "}
              <em className="text-coral">ces réductions ?</em>
            </h2>
            <p className="mt-4 text-muted md:text-lg">
              Aucune magie. Un modèle gagnant-gagnant entre les voyageurs et nos partenaires marocains.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {PILLARS.map(({ Icon, title, body }) => (
            <RevealItem key={title}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-coral/40 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral-light text-coral">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
