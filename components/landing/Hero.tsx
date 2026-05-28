"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, MapPin, Trophy, Users, CheckCircle2, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

const PREVIEW_OFFERS = [
  { label: "Surf",       img: IMG.surfStanding,    normal: 60, reduced: 25, pct: 58 },
  { label: "Hammam",     img: IMG.hammamArch,      normal: 35, reduced: 18, pct: 49 },
  { label: "Restaurant", img: IMG.restaurantTagine, normal: 28, reduced: 14, pct: 50 },
];

const savedTotal = PREVIEW_OFFERS.reduce((s, o) => s + (o.normal - o.reduced), 0);
const PASS_PRICE = "29.99";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-sand">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroDesertSunset}
          alt="Coucher de soleil au Maroc"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/90" />
      </div>

      <div className="container-px relative py-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* ============ HEADER BLOCK (always centered on mobile) ============ */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sand/20 bg-sand/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-sand backdrop-blur">
              <Shield className="h-3 w-3 text-coral" />
              Anti-arnaque · Maroc
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-sand/85">
              <Star className="h-3 w-3 fill-coral text-coral" />
              <strong className="text-sand">4,9/5</strong>
              <span className="text-sand/65">· 1 284 voyageurs</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-center font-display leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(1.85rem, 8.5vw, 4.5rem)" }}
          >
            <span className="block text-sand">PAYEZ MOINS CHER</span>
            <span className="block text-sand">VOS ACTIVITÉS</span>
            <span className="block text-coral">AU MAROC.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-md px-2 text-center text-sm leading-relaxed text-sand/85 sm:text-base"
          >
            Surf, restaurants, bien-être, excursions —{" "}
            <span className="font-semibold text-coral">à prix réduits.</span>
          </motion.p>

          {/* ============ PRICE + CTA BLOCK ============ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-7 flex max-w-md flex-col items-center gap-1"
          >
            {/* Price */}
            <p
              className="font-display leading-none text-sand"
              style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)" }}
            >
              ${PASS_PRICE}
            </p>
            <p className="text-sm text-sand/80">une seule fois</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-teal-mid">
              <CheckCircle2 className="h-3 w-3" />
              Paiement unique · Valable 2 mois
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="relative mx-auto mt-6 w-full max-w-md"
          >
            {/* glow */}
            <span
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-coral/35 blur-2xl"
              style={{ animation: "pulse 2.5s ease-in-out infinite" }}
              aria-hidden
            />
            <Button asChild size="lg" className="group w-full text-sm sm:text-base">
              <Link href="/smart-pass">
                <Sparkles className="h-4 w-4 shrink-0" />
                OBTENIR MON SMART PASS
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Reassurance row — always centered, wraps clean */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-sand/70">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" /> Paiement Stripe
              </span>
              <span className="opacity-50">·</span>
              <Link href="/partenaires" className="underline-offset-4 hover:text-coral hover:underline">
                Voir les 47 partenaires →
              </Link>
            </div>
          </motion.div>

          {/* ============ STATS BAR (centered, no overflow) ============ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand/15 bg-sand/5 backdrop-blur sm:max-w-2xl sm:grid-cols-4"
          >
            <Stat icon={<Users className="h-4 w-4" />}   label="Partenaires" value="47+" />
            <Stat icon={<MapPin className="h-4 w-4" />}  label="Villes"      value="6" />
            <Stat icon={<Trophy className="h-4 w-4" />}  label="Économies"   value="−25%" highlight />
            <Stat icon={<Star className="h-4 w-4 fill-coral text-coral" />} label="Note" value="4,9" />
          </motion.div>

          {/* ============ MINI OFFERS PREVIEW ============ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10"
          >
            <p className="text-center font-accent text-xl leading-none text-coral sm:text-2xl">
              Voici ce que vous économisez ↓
            </p>

            {/* Cards — horizontal scroll on mobile, 3 cols sm+ */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {PREVIEW_OFFERS.map((o) => {
                const saved = o.normal - o.reduced;
                return (
                  <article
                    key={o.label}
                    className="relative overflow-hidden rounded-xl border-4 border-sand bg-sand shadow-xl"
                  >
                    {/* photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.img} alt={o.label} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                      <span className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-coral text-[9px] font-bold leading-none text-white shadow-lg sm:h-10 sm:w-10 sm:text-xs">
                        −{o.pct}%
                      </span>
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow sm:text-[11px]">
                        {o.label}
                      </span>
                    </div>

                    {/* prices */}
                    <div className="p-1.5 sm:p-2">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="text-center">
                          <p
                            className="text-[7px] font-bold uppercase tracking-wider sm:text-[9px]"
                            style={{ color: "#FF0000" }}
                          >
                            Touriste
                          </p>
                          <p
                            className="font-display text-xs font-extrabold leading-none line-through decoration-[2px] sm:text-base"
                            style={{ color: "#FF0000", textDecorationColor: "#FF0000" }}
                          >
                            ${o.normal}
                          </p>
                        </div>
                        <ArrowRight className="h-3 w-3 shrink-0 text-charcoal/40" aria-hidden />
                        <div className="rounded-md bg-coral px-1.5 py-1 text-center text-white sm:px-2">
                          <p className="text-[7px] font-bold uppercase tracking-wider text-white/90 sm:text-[9px]">
                            S.Pass
                          </p>
                          <p className="font-display text-xs font-extrabold leading-none sm:text-base">
                            ${o.reduced}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 rounded bg-teal py-0.5 text-center text-[8px] font-bold uppercase text-white sm:text-[10px]">
                        +${saved} économisés
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ROI math */}
            <div className="mx-auto mt-4 max-w-md rounded-xl border-2 border-dashed border-coral/60 bg-charcoal/70 px-3 py-3 backdrop-blur sm:max-w-2xl">
              <div className="flex flex-wrap items-center justify-center gap-1 font-display text-xs font-bold text-sand sm:gap-1.5 sm:text-sm">
                <span className="rounded bg-teal-mid/20 px-1.5 py-0.5 text-teal-mid">${PREVIEW_OFFERS[0].normal - PREVIEW_OFFERS[0].reduced}</span>
                <span className="text-sand/55">+</span>
                <span className="rounded bg-teal-mid/20 px-1.5 py-0.5 text-teal-mid">${PREVIEW_OFFERS[1].normal - PREVIEW_OFFERS[1].reduced}</span>
                <span className="text-sand/55">+</span>
                <span className="rounded bg-teal-mid/20 px-1.5 py-0.5 text-teal-mid">${PREVIEW_OFFERS[2].normal - PREVIEW_OFFERS[2].reduced}</span>
                <span className="text-sand/55">=</span>
                <span className="rounded bg-coral px-2 py-0.5 text-white">${savedTotal}</span>
                <span className="text-sand/55">{">"}</span>
                <span className="rounded border border-sand/30 px-1.5 py-0.5 text-sand">Pass ${PASS_PRICE}</span>
              </div>
              <p className="mt-1.5 text-center font-accent text-base text-coral">
                Rentabilisé dès la 2<sup>e</sup> activité ✨
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-charcoal/55 px-3 py-2.5 text-center backdrop-blur sm:text-left">
      <div className="flex items-center justify-center gap-1.5 text-sand/65 sm:justify-start">
        {icon}
        <p className="text-[9px] uppercase tracking-wider">{label}</p>
      </div>
      <p
        className={
          "mt-0.5 font-display text-lg font-bold leading-none sm:text-xl " +
          (highlight ? "text-coral" : "text-sand")
        }
      >
        {value}
      </p>
    </div>
  );
}
