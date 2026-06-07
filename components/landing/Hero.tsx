"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, CheckCircle2, Sparkles, Lock, BadgeCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

const PASS_PRICE = "299";
const CUR = "DH";

const REASSURANCES = [
  { Icon: Lock,        label: "Paiement Stripe" },
  { Icon: CheckCircle2,label: "Aucun abonnement" },
  { Icon: BadgeCheck,  label: "Partenaires vérifiés" },
  { Icon: Zap,         label: "Activation immédiate" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-sand text-charcoal">
      {/* Background — photo with strategic overlay for text contrast */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroAgadirNight}
          alt="Agadir la nuit — kasbah illuminée"
          className="h-full w-full object-cover object-[70%_center] md:object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-sand/82 backdrop-blur-[2px] md:bg-sand/72" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center 40%, rgba(247,243,236,0.55) 0%, rgba(247,243,236,0.2) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sand via-sand/85 to-transparent" />
      </div>

      <div className="container-px relative py-12 md:py-20">
        <div className="mx-auto max-w-3xl">

          {/* Badge réassurance */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-charcoal backdrop-blur">
              <Shield className="h-3 w-3 text-coral" />
              Anti-arnaque · Maroc
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs text-charcoal backdrop-blur">
              <Star className="h-3 w-3 fill-coral text-coral" />
              <strong>4,9/5</strong>
              <span className="text-charcoal/70">· 1 284 voyageurs</span>
            </span>
          </motion.div>

          {/* Titre principal — clair et explicite */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-7 text-center font-display font-bold leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(2rem, 7vw, 4rem)",
              textShadow: "0 1px 0 rgba(247,243,236,0.6), 0 2px 12px rgba(247,243,236,0.4)",
            }}
          >
            Le pass qui vous donne accès aux{" "}
            <span className="text-coral">tarifs locaux</span> au Maroc.
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl px-2 text-center text-base leading-relaxed text-charcoal/85 sm:text-lg"
          >
            Économisez{" "}
            <span className="font-semibold text-coral">jusqu&apos;à 60%</span>{" "}
            sur les restaurants, activités, hammams, excursions et hébergements partenaires.
          </motion.p>

          {/* Prix */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-8 flex max-w-md flex-col items-center"
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-display font-bold leading-none text-charcoal"
                style={{ fontSize: "clamp(2.75rem, 11vw, 4.5rem)" }}
              >
                {PASS_PRICE}
              </span>
              <span className="font-display text-2xl font-bold text-charcoal/75 sm:text-3xl">
                {CUR}
              </span>
              <span className="ml-1 text-sm text-charcoal/70">seulement</span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal-light px-3 py-1 text-xs font-medium text-teal">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Valable 2 mois · Paiement unique
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="relative mx-auto mt-6 w-full max-w-md"
          >
            <span
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-coral/35 blur-2xl"
              style={{ animation: "pulse 2.5s ease-in-out infinite" }}
              aria-hidden
            />
            <Button asChild size="lg" className="group w-full text-base">
              <Link href="/smart-pass">
                <Sparkles className="h-4 w-4 shrink-0" />
                Obtenir mon SmartPass
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Réassurances sous le bouton */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mx-auto mt-6 grid w-full max-w-xl grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4"
          >
            {REASSURANCES.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-1.5 text-xs text-charcoal/80 sm:text-[13px]"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-teal" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </motion.ul>

        </div>
      </div>

      {/* ============ ORGANIC WAVE DIVIDER ============ */}
      <div
        aria-hidden
        className="pointer-events-none relative mt-4 h-20 w-full sm:h-24 md:h-28"
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-sand)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--color-sand)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 C240,140 480,20 720,70 C960,120 1200,40 1440,90 L1440,160 L0,160 Z"
            fill="var(--color-coral)"
            fillOpacity="0.07"
          />
          <path
            d="M0,100 C240,160 520,30 760,90 C1000,150 1220,60 1440,110 L1440,160 L0,160 Z"
            fill="url(#waveFill)"
          />
        </svg>
      </div>
    </section>
  );
}
