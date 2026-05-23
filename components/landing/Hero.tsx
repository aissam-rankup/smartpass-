"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

const TAGLINE_LOOP = [
  "Tagines", "Vagues", "Souks", "Désert", "Tarifs vrais",
  "Bonne énergie", "Couscous", "Surf à Taghazout", "Tea sunset",
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
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/30 md:via-charcoal/80 md:to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/50" />
      </div>

      {/* Top kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="container-px relative flex items-center justify-between pt-6 md:pt-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-sand/20 bg-sand/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-sand backdrop-blur sm:text-xs">
          <Shield className="h-3.5 w-3.5 text-coral" />
          <span className="hidden sm:inline">Issue 2026 ·</span> Anti-arnaque · Maroc
        </span>

        <span className="hidden items-center gap-2 rounded-full border border-coral/40 bg-coral/15 px-3 py-1.5 text-xs text-sand backdrop-blur lg:inline-flex">
          <Sparkles className="h-3.5 w-3.5 text-coral" />
          Agadir · Taghazout · Marrakech · Essaouira
        </span>
      </motion.div>

      <div className="container-px relative grid grid-cols-1 gap-8 pb-10 pt-10 md:gap-10 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-28">
        {/* HEADLINE */}
        <div className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-coral sm:text-[10px] md:mb-5"
          >
            <span className="h-px w-6 bg-coral sm:w-10" />
            N° 001 — Le Maroc, en mieux
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-headline leading-[1.05] tracking-[0.02em] uppercase"
          >
            <motion.span
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 180 }}
              className="absolute -left-1 -top-3 text-coral sm:-left-2 sm:-top-5 md:-left-4 md:-top-8"
              aria-hidden
            >
              <Asterisk />
            </motion.span>

            {/* Line 1 — sand filled, fully readable */}
            <span className="block text-[clamp(2rem,9vw,4.5rem)] text-sand">
              Bienvenue
            </span>
            {/* Line 2 — sand filled + handwritten accent */}
            <span className="block text-[clamp(2rem,9vw,4.5rem)] text-sand/85">
              chez les
              <span className="font-accent ml-2 normal-case text-coral text-base align-top sm:ml-3 sm:text-lg md:ml-4 md:text-2xl">
                (vrais)
              </span>
            </span>
            {/* Line 3 — coral, bigger, with underline */}
            <span className="relative block text-[clamp(2.4rem,11vw,6rem)]">
              <span className="relative inline-block">
                <span className="text-coral">
                  locaux.
                </span>
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-3 w-full sm:h-4 md:-bottom-1 md:h-6"
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

          {/* Description card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-xl rounded-lg border border-sand/15 bg-charcoal/60 p-4 backdrop-blur sm:mt-8 md:mt-10 md:p-6"
          >
            <p className="text-base leading-relaxed text-sand sm:text-lg">
              <span className="font-semibold">Pas de prix touriste.</span>{" "}
              <span className="text-sand/85">Que des vrais souvenirs.</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-sand/70 sm:text-sm">
              47 partenaires certifiés à Agadir, Marrakech, Essaouira et Taghazout.
              Les tarifs officiels. La bonne énergie.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 md:mt-8"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/smart-pass">
                Obtenir mon Pass — $30/mois
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link
              href="/partenaires"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-sand underline-offset-4 hover:text-coral hover:underline sm:justify-start"
            >
              Voir les 47 partenaires
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Polaroid stack — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden self-end justify-self-end lg:col-span-5 lg:flex lg:items-end"
        >
          <div className="relative h-[420px] w-[300px]">
            <div className="absolute -left-2 top-4 h-[300px] w-[230px] rotate-[7deg] rounded-sm border-8 border-sand bg-sand p-1 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.cityMarrakech} alt="Marrakech" className="h-[230px] w-full object-cover" />
              <p className="mt-1 text-center font-accent text-lg leading-none text-charcoal/85">
                Marrakech, 18h12
              </p>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-20 h-[320px] w-[240px] -rotate-[5deg] rounded-sm border-8 border-sand bg-sand p-1 shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.surfStanding} alt="Surfeurs à Taghazout" className="h-[250px] w-full object-cover" />
              <p className="mt-1 text-center font-accent text-lg leading-none text-charcoal/85">
                Taghazout, 8h00
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 200 }}
              className="absolute -left-4 bottom-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-coral text-center leading-[0.95] text-white shadow-xl md:h-24 md:w-24"
            >
              <span className="font-accent text-base md:text-xl">
                Made for<br />travelers<br />not tourists
              </span>
            </motion.div>
            <span className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 rotate-3 bg-coral/30 backdrop-blur" aria-hidden />
          </div>
        </motion.div>

        {/* Stats bar — responsive grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="col-span-1 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-sand/20 bg-sand/5 backdrop-blur sm:grid-cols-4 lg:col-span-7"
        >
          <Stat label="Voyageurs" value="1 284" icon={<Star className="h-3 w-3 fill-coral text-coral sm:h-3.5 sm:w-3.5" />} />
          <Stat label="Partenaires" value="47" />
          <Stat label="Villes" value="6" />
          <Stat label="Réduction" value="−25%" highlight />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-sand/15 bg-charcoal/80 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-6 whitespace-nowrap py-3 font-display text-base font-bold uppercase tracking-tight text-sand sm:gap-10 sm:py-4 sm:text-xl md:gap-12 md:text-2xl">
            {[...TAGLINE_LOOP, ...TAGLINE_LOOP, ...TAGLINE_LOOP].map((t, i) => (
              <span key={i} className="flex items-center gap-6 sm:gap-10 md:gap-12">
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
  label, value, icon, highlight,
}: {
  label: string; value: string; icon?: React.ReactNode; highlight?: boolean;
}) {
  return (
    <div className="bg-charcoal/50 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
      <div className="flex items-center gap-1">
        {icon}
        <p className="text-[9px] uppercase tracking-wider text-sand/65 sm:text-[10px]">{label}</p>
      </div>
      <p className={"mt-0.5 font-display text-base font-bold sm:mt-1 sm:text-xl " + (highlight ? "text-coral" : "text-sand")}>
        {value}
      </p>
    </div>
  );
}

function Asterisk({ small }: { small?: boolean }) {
  return (
    <svg width={small ? "16" : "36"} height={small ? "16" : "36"} viewBox="0 0 44 44" fill="none" aria-hidden>
      <path d="M22 4 L22 40 M4 22 L40 22 M9 9 L35 35 M9 35 L35 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
