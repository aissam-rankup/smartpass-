"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

const TAGLINE_LOOP = [
  "Tagines",
  "Vagues",
  "Souks",
  "Désert",
  "Tarifs vrais",
  "Bonne énergie",
  "Couscous",
  "Surf à Taghazout",
  "Tea sunset",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-sand">
      {/* Full-bleed photo */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroDesertSunset}
          alt="Voyageuse au coucher de soleil dans le désert marocain"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Strong left-side scrim ensures the headline never washes out */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-charcoal/45" />
      </div>

      {/* Top kicker bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="container-px relative flex items-center justify-between pt-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-sand/20 bg-sand/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-sand backdrop-blur">
          <Shield className="h-3.5 w-3.5 text-coral" />
          Issue 2026 · Anti-arnaque · Maroc
        </span>

        <span className="hidden items-center gap-2 rounded-full border border-coral/40 bg-coral/15 px-3 py-1.5 text-xs text-sand backdrop-blur md:inline-flex">
          <Sparkles className="h-3.5 w-3.5 text-coral" />
          <span className="font-medium">Agadir · Taghazout · Marrakech · Essaouira</span>
        </span>
      </motion.div>

      <div className="container-px relative grid grid-cols-1 gap-10 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-28">
        {/* HEADLINE BLOCK */}
        <div className="relative lg:col-span-7">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-coral"
          >
            <span className="h-px w-10 bg-coral" />
            N° 001 — Le Maroc, en mieux
          </motion.div>

          {/* Ultra-creative H1: outlined + filled + decorated */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display leading-[0.85] tracking-[-0.05em]"
          >
            {/* Decorative star */}
            <motion.span
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 180 }}
              className="absolute -left-2 -top-6 text-coral md:-left-4 md:-top-10"
              aria-hidden
            >
              <Asterisk />
            </motion.span>

            {/* Line 1 — outline only */}
            <span className="block text-outline-sand text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold">
              Bienvenue
            </span>

            {/* Line 2 — filled sand + small handwritten accent */}
            <span className="block text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold text-sand">
              chez les
              <span className="font-accent ml-3 text-coral text-2xl align-top md:ml-4 md:text-3xl">
                (vrais)
              </span>
            </span>

            {/* Line 3 — coral filled, gradient, hand-drawn underline */}
            <span className="relative block text-[clamp(3rem,8vw,7rem)] font-extrabold">
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-coral via-coral to-coral-light bg-clip-text text-transparent">
                  locaux.
                </span>
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
                  className="pointer-events-none absolute -bottom-1 left-0 h-6 w-full md:-bottom-2 md:h-8"
                  viewBox="0 0 320 28"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <motion.path
                    d="M4,18 Q60,4 130,14 T 250,12 Q290,8 316,18"
                    stroke="var(--color-coral)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
            </span>
          </motion.h1>

          {/* Description on contrast card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 max-w-xl rounded-lg border border-sand/15 bg-charcoal/60 p-5 backdrop-blur md:p-6"
          >
            <p className="text-lg leading-relaxed text-sand">
              <span className="font-semibold">Pas de prix touriste.</span>{" "}
              <span className="text-sand/85">Que des vrais souvenirs.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sand/70">
              47 partenaires certifiés à Agadir, Marrakech, Essaouira et Taghazout. Les
              tarifs officiels. La bonne énergie. Le Maroc, comme un local.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Button asChild size="lg" className="group">
              <Link href="/smart-pass">
                Obtenir mon Pass — $30/mois
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link
              href="/partenaires"
              className="inline-flex items-center gap-2 text-sm font-medium text-sand underline-offset-4 hover:text-coral hover:underline"
            >
              Voir les 47 partenaires
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* POLAROID STACK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden self-end justify-self-end lg:col-span-5 lg:flex lg:items-end"
        >
          <div className="relative h-[420px] w-[300px]">
            {/* Hand-drawn arrow pointing from headline to polaroids */}
            <motion.svg
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute -left-24 top-12 hidden text-coral xl:block"
              width="120"
              height="80"
              viewBox="0 0 120 80"
              fill="none"
              aria-hidden
            >
              <motion.path
                d="M5,8 Q40,12 60,32 T 105,68"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0 1"
                fill="none"
              />
              <path
                d="M97,60 L110,70 L100,76 Z"
                fill="currentColor"
              />
            </motion.svg>

            {/* Back polaroid — Marrakech */}
            <div className="absolute -left-2 top-4 h-[300px] w-[230px] rotate-[7deg] rounded-sm border-8 border-sand bg-sand p-1 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.cityMarrakech}
                alt="Marrakech au crépuscule"
                className="h-[230px] w-full object-cover"
              />
              <p className="mt-1 text-center font-accent text-lg leading-none text-charcoal/85">
                Marrakech, 18h12
              </p>
            </div>

            {/* Front polaroid — surf */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-20 h-[320px] w-[240px] -rotate-[5deg] rounded-sm border-8 border-sand bg-sand p-1 shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.surfStanding}
                alt="Surfeurs à Taghazout"
                className="h-[250px] w-full object-cover"
              />
              <p className="mt-1 text-center font-accent text-lg leading-none text-charcoal/85">
                Taghazout, 8h00
              </p>
            </motion.div>

            {/* Rotated coral sticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 200 }}
              className="absolute -left-4 bottom-0 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-coral text-center leading-[0.95] text-white shadow-xl"
            >
              <span className="font-accent text-xl">
                Made for
                <br />
                travelers
                <br />
                not tourists
              </span>
            </motion.div>

            {/* Tape strips */}
            <span className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 rotate-3 bg-coral/30 backdrop-blur" aria-hidden />
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="col-span-1 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-sand/20 bg-sand/5 backdrop-blur sm:grid-cols-4 lg:col-span-7"
        >
          <Stat
            label="Voyageurs protégés"
            value="1 284"
            icon={<Star className="h-3.5 w-3.5 fill-coral text-coral" />}
          />
          <Stat label="Partenaires" value="47" />
          <Stat label="Villes" value="6" />
          <Stat label="Réduction moy." value="−25%" highlight />
        </motion.div>
      </div>

      {/* Tagline marquee at bottom */}
      <div className="relative border-y border-sand/15 bg-charcoal/80 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap py-4 font-display text-xl font-bold uppercase tracking-tight text-sand md:text-2xl">
            {[...TAGLINE_LOOP, ...TAGLINE_LOOP, ...TAGLINE_LOOP].map((t, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className={i % 2 === 0 ? "text-coral" : "text-sand"}>{t}</span>
                <Asterisk small />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="bg-charcoal/50 px-5 py-4 backdrop-blur">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-[10px] uppercase tracking-wider text-sand/65">{label}</p>
      </div>
      <p
        className={
          "mt-1 font-display text-xl font-bold " +
          (highlight ? "text-coral" : "text-sand")
        }
      >
        {value}
      </p>
    </div>
  );
}

function Asterisk({ small }: { small?: boolean }) {
  return (
    <svg
      width={small ? "20" : "44"}
      height={small ? "20" : "44"}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden
    >
      <path
        d="M22 4 L22 40 M4 22 L40 22 M9 9 L35 35 M9 35 L35 9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
