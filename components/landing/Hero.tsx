"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, MapPin, Trophy, Lock, Users, CheckCircle2 } from "lucide-react";
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
const PASS_PRICE = 30;

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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/40" />
      </div>

      <div className="container-px relative py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* LEFT — Headline + pricing + CTA */}
          <div className="lg:col-span-7">
            {/* Trust pill */}
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

            {/* Headline + discount stamp */}
            <div className="relative mt-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.3rem,7vw,4.75rem)] leading-[0.95] tracking-tight"
              >
                <span className="block text-sand">PAYEZ MOINS CHER</span>
                <span className="block text-sand">VOS ACTIVITÉS</span>
                <span className="block text-coral">AU MAROC.</span>
              </motion.h1>

              {/* Discount stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 180 }}
                className="absolute right-0 top-2 hidden h-28 w-28 items-center justify-center rounded-full border-4 border-double border-teal-mid text-center text-teal-mid md:flex"
                aria-hidden
              >
                <div className="leading-[0.95]">
                  <div className="text-[9px] uppercase tracking-[0.18em]">Économisez</div>
                  <div className="text-[10px] uppercase tracking-[0.18em]">jusqu'à</div>
                  <div className="font-display text-3xl font-bold">−25%</div>
                </div>
              </motion.div>
            </div>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-sand/85 md:text-lg"
            >
              Surf, restaurants, bien-être, excursions —{" "}
              <span className="font-semibold text-coral">à prix réduits</span>.
            </motion.p>

            {/* ROI reassurance pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex max-w-md items-center gap-3 rounded-lg border border-teal-mid/40 bg-teal-mid/10 p-3 backdrop-blur"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-mid text-charcoal">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-xs leading-snug text-sand/95 sm:text-sm">
                <strong className="text-teal-mid">Avec 2 à 3 sorties</strong>, votre Pass est déjà
                rentabilisé.
              </p>
            </motion.div>

            {/* Price + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end"
            >
              <div>
                <p className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-sand">
                  ${PASS_PRICE}
                  <span className="ml-1 font-display text-lg text-sand/70">/mois</span>
                </p>
                <p className="mt-1 text-xs text-coral">Valable 1 mois · Annulation 1 clic</p>
              </div>

              <Button asChild size="lg" className="group flex-1 sm:flex-none">
                <Link href="/smart-pass">
                  OBTENIR LE SMART PASS
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <Link
              href="/partenaires"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sand/80 underline-offset-4 hover:text-coral hover:underline"
            >
              Voir les 47 partenaires
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* RIGHT — 3 scrapbook-style offer cards */}
          <div className="relative lg:col-span-5">
            {/* Decorative dashed arrow + caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="absolute -top-8 left-4 hidden items-center gap-2 lg:flex"
              aria-hidden
            >
              <span className="font-accent text-2xl leading-none text-coral">
                Voici ce que vous économisez ↓
              </span>
            </motion.div>

            {/* Offer card stack (desktop: rotated scrapbook · mobile: horizontal scroll) */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-4 lg:mx-0 lg:flex-col lg:gap-5 lg:overflow-visible lg:px-0">
              {PREVIEW_OFFERS.map((o, i) => {
                const saved = o.normal - o.reduced;
                const rotations = ["lg:-rotate-2", "lg:rotate-1", "lg:-rotate-1"];
                const offsets = ["lg:ml-0", "lg:ml-8", "lg:ml-2"];
                const popular = i === 0;
                return (
                  <motion.article
                    key={o.label}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
                    className={`group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border-4 border-sand bg-sand shadow-2xl transition lg:w-auto ${rotations[i]} ${offsets[i]}`}
                  >
                    {/* Tape strip */}
                    <span
                      className="absolute -top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rotate-3 bg-coral/40"
                      aria-hidden
                    />

                    {/* Popular sticker */}
                    {popular && (
                      <motion.span
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: -12 }}
                        transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        className="absolute -left-2 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg"
                      >
                        <Star className="h-3 w-3 fill-white" /> Populaire
                      </motion.span>
                    )}

                    {/* Discount stamp (top-right) */}
                    <motion.span
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 8 }}
                      transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 220 }}
                      className="absolute right-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-coral font-display text-sm font-bold leading-none text-white shadow-lg"
                    >
                      −{o.pct}%
                    </motion.span>

                    {/* Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.img}
                        alt={o.label}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                      <span className="absolute bottom-3 left-3 font-display text-xl font-bold uppercase text-sand">
                        {o.label}
                      </span>
                    </div>

                    {/* Polaroid info strip */}
                    <div className="relative bg-sand px-4 py-3">
                      <p className="font-accent text-base leading-none text-charcoal/70">
                        {o.chip}
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted line-through">
                            Prix touriste ${o.normal}
                          </p>
                          <p className="font-display text-2xl font-bold leading-none text-coral">
                            ${o.reduced}
                          </p>
                        </div>

                        {/* Saved sticker */}
                        <span className="inline-flex items-center gap-1 rounded-md bg-teal-light px-2 py-1 text-[10px] font-bold uppercase text-teal">
                          + ${saved} économisés
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* ROI math callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative mt-5 overflow-hidden rounded-xl border-2 border-dashed border-coral/60 bg-charcoal/70 p-4 backdrop-blur sm:p-5"
            >
              {/* Decorative corner sparkle */}
              <span className="font-accent absolute -top-3 right-3 rotate-6 rounded-md bg-coral px-2 py-0.5 text-xs text-white shadow">
                💡 Le calcul
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1.5 text-center font-display text-sm font-bold text-sand sm:text-base">
                <span className="rounded-md bg-teal-mid/20 px-2 py-1 text-teal-mid">
                  ${PREVIEW_OFFERS[0].normal - PREVIEW_OFFERS[0].reduced}
                </span>
                <span className="text-sand/60">+</span>
                <span className="rounded-md bg-teal-mid/20 px-2 py-1 text-teal-mid">
                  ${PREVIEW_OFFERS[1].normal - PREVIEW_OFFERS[1].reduced}
                </span>
                <span className="text-sand/60">+</span>
                <span className="rounded-md bg-teal-mid/20 px-2 py-1 text-teal-mid">
                  ${PREVIEW_OFFERS[2].normal - PREVIEW_OFFERS[2].reduced}
                </span>
                <span className="text-sand/60">=</span>
                <span className="rounded-md bg-coral px-2.5 py-1 text-white">
                  ${savedTotal}
                </span>
                <span className="text-sand/60">{">"}</span>
                <span className="rounded-md border border-sand/30 px-2 py-1 text-sand">
                  Pass ${PASS_PRICE}
                </span>
              </div>

              <p className="mt-3 text-center font-accent text-lg leading-tight text-coral">
                Rentabilisé dès la 3<sup>e</sup> activité.
              </p>
            </motion.div>
          </div>
        </div>

        {/* STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-sand/15 bg-sand/5 backdrop-blur md:grid-cols-4"
        >
          <Stat icon={<Users className="h-4 w-4" />} label="Partenaires" value="47+" sub="adresses" />
          <Stat icon={<MapPin className="h-4 w-4" />} label="Villes" value="6" sub="couvertes" />
          <Stat icon={<Trophy className="h-4 w-4" />} label="Économies" value="−25%" sub="en moyenne" highlight />
          <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Rentabilisé" value="2-3" sub="sorties" />
        </motion.div>

        {/* TRUST STRIP */}
        <div className="mt-8 grid gap-4 border-t border-sand/10 pt-6 text-center sm:grid-cols-3 sm:text-left">
          <div className="flex items-center gap-3 sm:justify-start">
            <Shield className="h-7 w-7 shrink-0 text-coral" />
            <div>
              <p className="font-display text-sm font-semibold uppercase text-sand">
                Simple · Local · Avantageux
              </p>
              <p className="text-[11px] text-sand/65">Un Pass, tout inclus.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:justify-start">
            <Star className="h-7 w-7 shrink-0 text-coral" />
            <div>
              <p className="font-display text-sm font-semibold uppercase text-sand">
                Avantages négociés
              </p>
              <p className="text-[11px] text-sand/65">Par des locaux, pour vous.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:justify-start">
            <Lock className="h-7 w-7 shrink-0 text-coral" />
            <div>
              <p className="font-display text-sm font-semibold uppercase text-sand">
                Paiement 100% sécurisé
              </p>
              <p className="text-[11px] text-sand/65">Via Stripe.</p>
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
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-charcoal/55 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
      <div className="flex items-center gap-2 text-sand/65">
        {icon}
        <p className="text-[10px] uppercase tracking-wider">{label}</p>
      </div>
      <p
        className={
          "mt-1 font-display text-2xl font-bold leading-none " +
          (highlight ? "text-coral" : "text-sand")
        }
      >
        {value}
      </p>
      <p className="text-[10px] text-sand/55">{sub}</p>
    </div>
  );
}
