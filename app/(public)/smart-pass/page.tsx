import type { Metadata } from "next";
import { Sparkles, Star } from "lucide-react";
import { FAQ } from "@/components/landing/FAQ";
import { LiveSocialProof } from "@/components/landing/LiveSocialProof";
import { LiveCounter } from "@/components/landing/LiveCounter";
import { LaunchCountdown } from "@/components/landing/LaunchCountdown";
import { PricingTiers } from "@/components/landing/PricingTiers";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Morocco Pass — Tarifs locaux garantis au Maroc · à partir de 299 DH",
  description:
    "Le pass voyage qui débloque les tarifs locaux au Maroc. 2 packs (Tourist activités, Tout Exclusif toutes catégories) × 3 formats (Solo 299 DH, Duo 499 DH, Famille 999 DH). Excursions désert, surf Taghazout, hammam Marrakech, restaurants. Valable 2 mois.",
  keywords: [
    "morocco pass prix", "morocco pass tarif", "morocco pass famille",
    "pass voyage maroc", "carte tourisme maroc", "anti arnaque maroc",
    "tarifs garantis maroc", "réductions tourisme maroc",
    "excursion désert marrakech prix", "surf taghazout tarif",
    "hammam marrakech prix", "transfert aéroport agadir",
  ],
  alternates: {
    canonical: "/smart-pass",
    languages: { "fr-MA": "/smart-pass", "en-US": "/smart-pass", "x-default": "/smart-pass" },
  },
  openGraph: {
    title: "Morocco Pass — 2 packs, 3 formats, à partir de 299 DH",
    description:
      "Tourist (activités touristiques) ou Tout Exclusif (toutes catégories). Solo, Duo, Famille. Tarifs négociés à l'avance chez 47 partenaires certifiés.",
    url: "/smart-pass",
    type: "website",
  },
};

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
        <div className="absolute inset-0 -z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.desertCamels}
            alt="Caravane de chameaux dans le désert marocain"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/85" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center 45%, rgba(20,17,15,0.45) 0%, transparent 65%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-55"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(216,90,48,0.55) 0px, transparent 40%), radial-gradient(circle at 85% 80%, rgba(29,158,117,0.32) 0px, transparent 40%)",
            }}
          />
        </div>

        <div className="container-px relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-coral to-coral-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-coral/30">
                <Sparkles className="h-3 w-3" />
                Offre de lancement
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sand/15 px-3 py-1 text-xs text-sand backdrop-blur">
                <Star className="h-3 w-3 fill-coral text-coral" />
                <strong>4,9/5</strong>
                <span className="text-sand/70">· 1 284 membres</span>
              </span>
            </div>

            <h1
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
              style={{
                textShadow:
                  "0 2px 0 rgba(0,0,0,0.45), 0 4px 18px rgba(0,0,0,0.55), 0 0 60px rgba(0,0,0,0.4)",
              }}
            >
              <span className="block text-white">Choisissez le pass qui</span>
              <span className="relative mt-1 inline-block">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-coral/45 blur-3xl"
                />
                <span
                  className="relative block font-extrabold text-coral"
                  style={{
                    textShadow:
                      "0 2px 0 rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(216,90,48,0.55)",
                    WebkitTextStroke: "1px rgba(0,0,0,0.15)",
                  }}
                >
                  vous ressemble.
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 320 14"
                  preserveAspectRatio="none"
                  className="mx-auto mt-1 block h-2.5 w-[85%] text-coral sm:h-3"
                >
                  <path
                    d="M4 9 C 60 2, 130 12, 200 6 S 300 10, 316 5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sand/80 md:text-lg">
              <span className="font-semibold text-sand">2 packs</span>,{" "}
              <span className="font-semibold text-sand">3 formats</span> —
              voyagez seul, en couple ou en famille. À partir de{" "}
              <span className="font-semibold text-coral">299 DH</span>.
            </p>

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

          {/* Countdown */}
          <div className="mx-auto mt-8 max-w-md">
            <LaunchCountdown />
          </div>
        </div>
      </section>

      {/* ============ PRICING TIERS ============ */}
      <PricingTiers />

      {/* ============ FAQ ============ */}
      <FAQ />

      {/* Floating live social proof toast */}
      <LiveSocialProof />
    </>
  );
}
