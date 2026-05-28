import type { Metadata } from "next";
import { Check, Shield, Sparkles } from "lucide-react";
import { CheckoutButton } from "@/components/subscription/CheckoutButton";
import { FAQ } from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Le Smart Pass — $29.99 paiement unique · Valable 2 mois",
  description:
    "Smart Pass : $29.99 en paiement unique, valable 2 mois. Accès illimité à 47 partenaires certifiés dans 6 villes du Maroc.",
  alternates: { canonical: "/smart-pass" },
};

const features = [
  "Accès aux 47 partenaires certifiés pendant 2 mois",
  "Offres et QR codes illimités durant la période",
  "6 villes : Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate, Casablanca",
  "Renouvelable à votre rythme — uniquement si vous le souhaitez",
  "Paiement unique — pas d'abonnement, pas de prélèvement automatique",
  "Remboursé sous 7 jours si insatisfait",
];

export default function SmartPassPage({ searchParams }: { searchParams: { canceled?: string } }) {
  return (
    <>
      <section className="bg-charcoal py-16 text-sand md:py-24">
        <div className="container-px text-center">
          <Shield className="mx-auto h-10 w-10 text-coral" aria-hidden />
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            Votre bouclier anti-arnaque
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sand/75">
            $29.99 en un seul paiement, valable 2 mois pour économiser en moyenne $90 par semaine de voyage.
          </p>
          {searchParams.canceled && (
            <p className="mx-auto mt-6 max-w-md rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
              Paiement annulé. Vous pouvez réessayer quand vous voulez.
            </p>
          )}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto max-w-md">
          <div className="relative overflow-hidden rounded-2xl border-2 border-coral bg-white p-8 shadow-2xl shadow-coral/20 md:p-10">
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
                Paiement unique. Valable 2 mois. Pas d'abonnement.
              </p>

              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <CheckoutButton plan="monthly">Obtenir le Smart Pass</CheckoutButton>
              </div>

              <p className="mt-4 text-center text-xs text-muted">
                🔒 Paiement 100% sécurisé via Stripe · Remboursement sous 7 jours
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
