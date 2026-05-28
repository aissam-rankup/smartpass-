"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, MapPin, Trophy, Lock, Users, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

const PREVIEW_OFFERS = [
  {
    label: "Surf",
    chip: "AVENTURE & VAGUES",
    img: IMG.surfStanding,
    normal: 60,
    reduced: 25,
    pct: 58,
  },
  {
    label: "Hammam",
    chip: "BIEN-ÊTRE & DÉTENTE",
    img: IMG.hammamArch,
    normal: 35,
    reduced: 18,
    pct: 49,
  },
  {
    label: "Restaurant",
    chip: "SAVEURS & PLAISIR",
    img: IMG.restaurantTagine,
    normal: 28,
    reduced: 14,
    pct: 50,
  },
];

const savedTotal = PREVIEW_OFFERS.reduce(
  (sum, o) => sum + (o.normal - o.reduced),
  0
);
const PASS_PRICE = "29.99";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-sand">
      {/* Background photo */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroDesertSunset}
          alt="Coucher de soleil au Maroc"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-transparent to-charcoal/35" />
      </div>

      <div className="container-px relative py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* ============ LEFT — text + price + CTA ============ */}
          <div className="lg:col-span-6 lg:pt-2">
            {/* Trust pill row */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sand/20 bg-sand/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-sand backdrop-blur sm:text-xs">
                <Shield className="h-3.5 w-3.5 text-coral" />
                Anti-arnaque · Maroc
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-sand/85">
                <Star className="h-3.5 w-3.5 fill-coral text-coral" />
                <strong className="text-sand">4,9/5</strong> · 1 284 voyageurs
              </span>
            </motion.div>

            {/* Headline + stamp */}
            <div className="relative mt-5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.1rem,6vw,4.25rem)] leading-[0.95] tracking-tight"
              >
                <span className="block text-sand">PAYEZ MOINS CHER</span>
                <span className="block text-sand">VOS ACTIVITÉS</span>
                <span className="block text-coral">AU MAROC.</span>
              </motion.h1>

              {/* Discount stamp – relocated to corner so it doesn't overlap text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 180 }}
                className="absolute -right-2 top-0 hidden h-24 w-24 items-center justify-center rounded-full border-4 border-double border-teal-mid text-center text-teal-mid backdrop-blur sm:flex"
                aria-hidden
              >
                <div className="leading-[0.95]">
                  <div className="text-[8px] uppercase tracking-[0.18em]">Économisez</div>
                  <div className="text-[9px] uppercase tracking-[0.18em]">jusqu'à</div>
                  <div className="font-display text-2xl font-bold">−25%</div>
                </div>
              </motion.div>
            </div>

            {/* Subhead — tight */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-lg text-base leading-snug text-sand/85"
            >
              Surf, restaurants, bien-être, excursions —{" "}
              <span className="font-semibold text-coral">à prix réduits.</span>
            </motion.p>

            {/* Price block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6"
            >
              <p className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-none text-sand">
                ${PASS_PRICE}
                <span className="ml-1 font-display text-base text-sand/65">une seule fois</span>
              </p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-teal-mid">
                <CheckCircle2 className="h-3 w-3" />
                Paiement unique · Valable 2 mois
              </p>
            </motion.div>

            {/* Primary CTA — full width, glowing, prominent */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative mt-4"
            >
              {/* Pulsing glow halo */}
              <span
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-coral/40 blur-2xl"
                style={{ animation: "pulse 2.5s ease-in-out infinite" }}
                aria-hidden
              />
              <Button asChild size="lg" className="group w-full text-base sm:max-w-sm">
                <Link href="/smart-pass">
                  <Sparkles className="h-4 w-4" />
                  OBTENIR VOTRE SMART PASS
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-sand/70">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Paiement sécurisé Stripe
                </span>
                <span>·</span>
                <Link
                  href="/partenaires"
                  className="text-sand/80 underline-offset-4 hover:text-coral hover:underline"
                >
                  Voir les 47 partenaires →
                </Link>
              </p>
            </motion.div>

            {/* Stats merged in left column on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-sand/15 bg-sand/5 backdrop-blur"
            >
              <Stat icon={<Users className="h-3.5 w-3.5" />} label="Partenaires" value="47+" />
              <Stat icon={<MapPin className="h-3.5 w-3.5" />} label="Villes" value="6" />
              <Stat icon={<Trophy className="h-3.5 w-3.5" />} label="Économies" value="−25%" highlight />
              <Stat icon={<Star className="h-3.5 w-3.5 fill-coral text-coral" />} label="Note" value="4,9" />
            </motion.div>
          </div>

          {/* ============ RIGHT — scrapbook offer cards + ROI math ============ */}
          <div className="relative lg:col-span-6">
            {/* Caveat caption above stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-2 hidden text-coral lg:block"
              aria-hidden
            >
              <span className="font-accent text-2xl leading-none">
                Voici ce que vous économisez ↓
              </span>
            </motion.div>

            {/* Cards: 3-column on desktop (compact), horizontal scroll on mobile */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-visible lg:px-0">
              {PREVIEW_OFFERS.map((o, i) => {
                const saved = o.normal - o.reduced;
                const rotations = ["lg:-rotate-2", "lg:rotate-1", "lg:-rotate-1"];
                const popular = i === 0;
                return (
                  <motion.article
                    key={o.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.1 }}
                    whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
                    className={`group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-xl border-[6px] border-sand bg-sand shadow-2xl transition lg:w-auto ${rotations[i]}`}
                  >
                    {/* Tape strip */}
                    <span
                      className="absolute -top-2 left-1/2 z-10 h-3 w-12 -translate-x-1/2 rotate-3 bg-coral/40"
                      aria-hidden
                    />
                    {popular && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: -10 }}
                        transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        className="absolute -left-1 top-2 z-20 inline-flex items-center gap-1 rounded-full bg-coral px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-lg"
                      >
                        <Star className="h-2.5 w-2.5 fill-white" /> Top
                      </motion.span>
                    )}
                    {/* Discount stamp */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 8 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 220 }}
                      className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-coral font-display text-xs font-bold leading-none text-white shadow-lg"
                    >
                      −{o.pct}%
                    </motion.span>

                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.img}
                        alt={o.label}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                      {/* Smaller, more refined sticker label */}
                      <div
                        className="absolute bottom-3 left-1/2 z-10"
                        style={{ transform: "translateX(-50%) rotate(-2deg)" }}
                      >
                        <span className="relative inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-sand bg-coral px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg sm:text-[11px]">
                          <svg
                            width="7"
                            height="7"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" />
                          </svg>
                          {o.label}
                          <svg
                            width="7"
                            height="7"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Side-by-side price comparison block */}
                    <div className="bg-sand p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Prix touriste — BIG, pure red #FF0000, struck */}
                        <div
                          className="rounded-md p-2 text-center"
                          style={{
                            backgroundColor: "rgba(255,0,0,0.10)",
                            border: "1px solid rgba(255,0,0,0.35)",
                          }}
                        >
                          <p
                            className="text-[9px] font-bold uppercase tracking-wider"
                            style={{ color: "#FF0000" }}
                          >
                            Prix touriste
                          </p>
                          <p
                            className="mt-1 font-display text-xl font-extrabold leading-none line-through decoration-[3px]"
                            style={{ color: "#FF0000", textDecorationColor: "#FF0000" }}
                          >
                            ${o.normal}
                          </p>
                        </div>

                        {/* Smart Pass — BIG, coral, prominent */}
                        <div className="rounded-md bg-coral p-2 text-center text-white">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-white/90">
                            Smart Pass
                          </p>
                          <p className="mt-1 font-display text-xl font-extrabold leading-none">
                            ${o.reduced}
                          </p>
                        </div>
                      </div>

                      {/* Saved badge — full width below */}
                      <div className="mt-2 flex items-center justify-center gap-1 rounded-md bg-teal py-1.5 text-center text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          ✓ Économisez ${saved}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* ROI math — compact horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative mt-4 overflow-hidden rounded-xl border-2 border-dashed border-coral/60 bg-charcoal/70 px-4 py-3 backdrop-blur"
            >
              <span className="font-accent absolute -top-3 right-3 rotate-6 rounded-md bg-coral px-2 py-0.5 text-xs text-white shadow">
                💡 Le calcul
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1.5 text-center font-display text-sm font-bold text-sand">
                <span className="rounded-md bg-teal-mid/20 px-2 py-0.5 text-teal-mid">
                  ${PREVIEW_OFFERS[0].normal - PREVIEW_OFFERS[0].reduced}
                </span>
                <span className="text-sand/60">+</span>
                <span className="rounded-md bg-teal-mid/20 px-2 py-0.5 text-teal-mid">
                  ${PREVIEW_OFFERS[1].normal - PREVIEW_OFFERS[1].reduced}
                </span>
                <span className="text-sand/60">+</span>
                <span className="rounded-md bg-teal-mid/20 px-2 py-0.5 text-teal-mid">
                  ${PREVIEW_OFFERS[2].normal - PREVIEW_OFFERS[2].reduced}
                </span>
                <span className="text-sand/60">=</span>
                <span className="rounded-md bg-coral px-2.5 py-0.5 text-white">
                  ${savedTotal}
                </span>
                <span className="text-sand/60">{">"}</span>
                <span className="rounded-md border border-sand/30 px-2 py-0.5 text-sand">
                  Pass ${PASS_PRICE}
                </span>
              </div>

              <p className="mt-2 text-center font-accent text-base leading-none text-coral">
                Rentabilisé dès la 2<sup>e</sup> activité ✨
              </p>
            </motion.div>

            {/* Strategic SECOND CTA — placed right after ROI math (peak conviction) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="relative mt-4"
            >
              <Button asChild size="lg" className="group w-full">
                <Link href="/smart-pass">
                  <Sparkles className="h-4 w-4" />
                  OBTENIR VOTRE SMART PASS — ${PASS_PRICE}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="mt-2 text-center text-[11px] text-sand/65">
                Paiement unique · Valable 2 mois · Remboursé sous 7 jours
              </p>
            </motion.div>

            {/* Mini trust strip — compact icons below right column */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-sand/10 pt-4">
              <MiniTrust icon={<Shield className="h-4 w-4 text-coral" />} label="Simple · Local" />
              <MiniTrust icon={<Star className="h-4 w-4 text-coral" />} label="Négocié par locaux" />
              <MiniTrust icon={<Lock className="h-4 w-4 text-coral" />} label="Paiement Stripe" />
            </div>
          </div>
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
    <div className="bg-charcoal/55 px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3">
      <div className="flex items-center gap-1.5 text-sand/65">
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

function MiniTrust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-sand/75 sm:text-xs">
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
