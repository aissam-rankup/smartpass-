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

          {/* RIGHT — 3 offer cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-3">
              {PREVIEW_OFFERS.map((o) => (
                <article
                  key={o.label}
                  className="group overflow-hidden rounded-lg border border-sand/15 bg-charcoal/55 backdrop-blur"
                >
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={o.img}
                      alt={o.label}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
                    <span className="absolute right-2 top-2 rounded-md bg-coral px-2 py-0.5 text-[10px] font-bold text-white sm:text-xs">
                      −{o.pct}%
                    </span>
                    <span className="absolute bottom-2 left-2 font-display text-sm font-bold uppercase text-sand sm:text-base">
                      {o.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2 sm:p-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-sand/55 line-through">
                        ${o.normal}
                      </p>
                      <p className="font-display text-base font-bold text-teal-mid sm:text-lg">
                        ${o.reduced}
                      </p>
                    </div>
                    <p className="hidden text-[9px] uppercase tracking-wider text-sand/60 sm:block">
                      {o.chip}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* ROI math */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-3 rounded-lg border border-coral/40 bg-coral-light/15 p-3 text-center backdrop-blur sm:p-4"
            >
              <p className="text-xs leading-snug text-sand sm:text-sm">
                Économisé sur 3 sorties :{" "}
                <strong className="text-coral">${savedTotal}</strong>{" "}
                <span className="opacity-70">›</span>{" "}
                Pass : <strong>${PASS_PRICE}</strong>
              </p>
              <p className="mt-1 text-[11px] text-teal-mid">
                = Pass rentabilisé dès la 3<sup>e</sup> activité 🎯
              </p>
            </motion.div>
          </motion.div>
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
