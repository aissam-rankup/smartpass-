import type { Metadata } from "next";
import {
  Check,
  Shield,
  Sparkles,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { CheckoutButton } from "@/components/subscription/CheckoutButton";
import { FAQ } from "@/components/landing/FAQ";
import { LiveSocialProof } from "@/components/landing/LiveSocialProof";
import { LiveCounter } from "@/components/landing/LiveCounter";
import { LaunchCountdown } from "@/components/landing/LaunchCountdown";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Le Morocco Pass — 299 DH paiement unique · Valable 2 mois",
  description:
    "Morocco Pass : 299 DH en paiement unique, valable 2 mois. Accès illimité à 47 partenaires certifiés dans 6 villes du Maroc.",
  alternates: { canonical: "/smart-pass" },
};

const FEATURES: { Icon: typeof Check; text: string }[] = [
  { Icon: BadgeCheck, text: "Accès illimité aux 47 partenaires certifiés pendant 2 mois" },
  { Icon: Sparkles,   text: "Offres et QR codes illimités durant la période" },
  { Icon: Shield,     text: "6 villes : Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate, Casablanca" },
  { Icon: RefreshCw,  text: "Renouvelable à votre rythme — uniquement si vous le souhaitez" },
  { Icon: Lock,       text: "Paiement unique sécurisé Stripe — pas d'abonnement" },
  { Icon: Zap,        text: "Activation immédiate après paiement" },
];

const TRUST = [
  { stat: "1 284", label: "membres actifs" },
  { stat: "4,9/5", label: "note moyenne" },
  { stat: "900 DH", label: "économisés en moyenne" },
  { stat: "47",    label: "partenaires vérifiés" },
];

export default function SmartPassPage({ searchParams }: { searchParams: { canceled?: string } }) {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-charcoal py-14 text-sand md:py-20">
        {/* Background image — touristic activity */}
        <div className="absolute inset-0 -z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.desertCamels}
            alt="Caravane de chameaux dans le désert marocain"
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/90" />
          {/* Coral/teal accent blobs */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(216,90,48,0.4) 0px, transparent 45%), radial-gradient(circle at 85% 80%, rgba(29,158,117,0.28) 0px, transparent 45%)",
            }}
          />
        </div>

        <div className="container-px relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-coral to-coral-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-coral/30">
                <Sparkles className="h-3 w-3" />
                Offre de lancement · −0% les 14 prochains jours
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sand/15 px-3 py-1 text-xs text-sand backdrop-blur">
                <Star className="h-3 w-3 fill-coral text-coral" />
                <strong>4,9/5</strong>
                <span className="text-sand/70">· 1 284 membres</span>
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Le pass qui débloque le <br className="hidden sm:inline" />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-coral via-coral-light to-coral bg-clip-text text-transparent">
                  vrai prix du Maroc.
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-3 -skew-x-6 bg-coral/30 blur-md"
                />
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sand/80 md:text-lg">
              <span className="font-semibold text-sand">299 DH une fois</span>,
              valable 2 mois. Vous économisez en moyenne{" "}
              <span className="font-semibold text-coral">900 DH par semaine.</span>
            </p>

            {/* Live counter under headline */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <LiveCounter />
            </div>

            {searchParams.canceled && (
              <p className="mx-auto mt-6 max-w-md rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
                Paiement annulé. Vous pouvez réessayer quand vous voulez.
              </p>
            )}
          </div>

          {/* Trust strip */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-sand/10 bg-sand/5 px-4 py-3 text-center backdrop-blur transition hover:border-coral/40 hover:bg-sand/10"
              >
                <p className="font-display text-xl font-extrabold text-sand md:text-2xl">{t.stat}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-sand/65">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING CARD ============ */}
      <section className="bg-sand py-14 md:py-20">
        <div className="container-px">
          <div className="mx-auto max-w-md">
            {/* Countdown above card */}
            <LaunchCountdown />

            <div className="relative mt-5 overflow-hidden rounded-3xl border-2 border-coral bg-white p-7 shadow-[0_30px_60px_-15px_rgba(216,90,48,0.35)] transition hover:-translate-y-1 hover:shadow-[0_40px_70px_-15px_rgba(216,90,48,0.45)] md:p-9">
              {/* Decorative blobs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-coral/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-teal/15 blur-3xl"
              />

              {/* Corner ribbon */}
              <span className="absolute right-0 top-5 z-10 rounded-l-full bg-gradient-to-r from-coral to-coral-dark px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                ⚡ Le plus populaire
              </span>

              <div className="relative">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
                  <Sparkles className="h-3.5 w-3.5" />
                  Le Morocco Pass · Édition lancement
                </p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-extrabold leading-none text-charcoal md:text-7xl">
                    299
                  </span>
                  <span className="font-display text-2xl font-bold text-charcoal/75">DH</span>
                  <span className="ml-1 text-sm text-muted">une seule fois</span>
                </div>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal">
                  <Check className="h-3.5 w-3.5" />
                  Paiement unique · Valable 2 mois
                </p>

                <ul className="mt-7 space-y-3">
                  {FEATURES.map(({ Icon, text }) => (
                    <li
                      key={text}
                      className="group flex items-start gap-3 text-sm leading-relaxed text-charcoal"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-light text-teal transition group-hover:scale-110 group-hover:bg-teal group-hover:text-white">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA with pulse halo */}
                <div className="relative mt-9">
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-coral/40 blur-2xl"
                    style={{ animation: "pulse 2.2s ease-in-out infinite" }}
                    aria-hidden
                  />
                  <CheckoutButton plan="monthly">
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Obtenir mon Morocco Pass
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </CheckoutButton>
                </div>

                <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Stripe sécurisé
                  </span>
                  <span className="opacity-50">·</span>
                  <span>Remboursement 7 jours</span>
                  <span className="opacity-50">·</span>
                  <span>Activation immédiate</span>
                </p>
              </div>
            </div>

            {/* Reassurance below */}
            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted">
              <Shield className="h-3.5 w-3.5 text-teal" />
              Annulation impossible : le pass n&apos;est pas un abonnement.
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Floating live social proof toast */}
      <LiveSocialProof />
    </>
  );
}
