import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  "Accès aux 47 partenaires certifiés pendant 2 mois",
  "Offres et QR codes illimités durant la période",
  "6 villes : Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate, Casablanca",
  "Renouvelable à votre rythme — uniquement si vous le souhaitez",
  "Paiement unique — pas d'abonnement, pas de prélèvement automatique",
  "Remboursé sous 7 jours si insatisfait",
];

export function Pricing() {
  return (
    <section id="pricing" className="container-px py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
            Tarif
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            Un Pass. <em className="text-coral">Tout le Maroc.</em>
          </h2>
          <p className="mt-3 text-muted md:text-lg">
            Un paiement unique de $29.99. Valable 2 mois. Renouvelable à votre rythme.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-md">
          <div className="relative overflow-hidden rounded-2xl border-2 border-coral bg-white p-8 shadow-2xl shadow-coral/20 md:p-10">
            {/* Decorative coral gradient blob */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-coral/20 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-coral" />
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-coral">
                  Le Smart Pass
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-6xl font-bold text-charcoal md:text-7xl">$29.99</span>
                <span className="text-muted">une seule fois</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Économisez en moyenne $90 par semaine de voyage.
              </p>

              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="mt-10 w-full">
                <Link href="/smart-pass">Obtenir mon Smart Pass</Link>
              </Button>

              <p className="mt-4 text-center text-xs text-muted">
                🔒 Paiement sécurisé via Stripe · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
