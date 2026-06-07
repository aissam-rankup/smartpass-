import Link from "next/link";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

const PASS_PRICE = 299;
const ITEMS = [
  { label: "Cours de surf",     normal: 600, reduced: 250 },
  { label: "Hammam + gommage",  normal: 350, reduced: 180 },
  { label: "Menu poisson",      normal: 280, reduced: 140 },
];

export function SavingsDemo() {
  const totalNormal  = ITEMS.reduce((s, i) => s + i.normal,  0);
  const totalReduced = ITEMS.reduce((s, i) => s + i.reduced, 0);
  const totalSaved   = totalNormal - totalReduced;
  const netGain      = totalSaved - PASS_PRICE;

  return (
    <section className="container-px py-14 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
            Combien vous économisez
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            Exemple réel d&apos;un séjour de{" "}
            <em className="text-coral">3 activités.</em>
          </h2>
          <p className="mt-3 text-muted md:text-lg">
            Voici ce que vous payez sans SmartPass, et ce que vous payez avec.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {/* Pass row */}
          <div className="flex items-center justify-between gap-4 border-b border-border bg-sand/60 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-charcoal">
                  Pass SmartPass
                </p>
                <p className="text-xs text-muted">Paiement unique · Valable 2 mois</p>
              </div>
            </div>
            <span className="font-display text-xl font-bold text-charcoal sm:text-2xl">
              {PASS_PRICE} DH
            </span>
          </div>

          {/* Items */}
          <ul className="divide-y divide-border">
            {ITEMS.map((item) => {
              const saved = item.normal - item.reduced;
              return (
                <li
                  key={item.label}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 sm:px-7"
                >
                  <div>
                    <p className="font-medium text-charcoal">{item.label}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      <span className="line-through">{item.normal} DH</span>
                      {" → "}
                      <span className="font-semibold text-charcoal">
                        {item.reduced} DH
                      </span>
                    </p>
                  </div>
                  <span className="font-display text-base font-bold text-teal sm:text-lg">
                    −{saved} DH
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Total */}
          <div className="border-t border-border bg-teal-light/40 px-5 py-4 sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-charcoal">Total économisé</p>
              <p className="font-display text-2xl font-bold text-teal sm:text-3xl">
                {totalSaved} DH
              </p>
            </div>
          </div>

          {/* Net gain */}
          <div className="bg-coral px-5 py-5 text-white sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <p className="font-display text-base font-bold sm:text-lg">
                  Gain net après achat du pass
                </p>
              </div>
              <p className="font-display text-2xl font-extrabold sm:text-3xl">
                +{netGain} DH
              </p>
            </div>
            <p className="mt-2 text-center text-sm text-white/90">
              ✨ Rentabilisé dès la 2<sup>ème</sup> activité
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-md justify-center">
          <Button asChild size="lg" className="group w-full">
            <Link href="/smart-pass">
              Obtenir mon SmartPass — {PASS_PRICE} DH
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
