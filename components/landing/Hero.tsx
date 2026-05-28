"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Star, ArrowRight, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

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
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/50" />
      </div>

      <div className="container-px relative flex min-h-[80vh] flex-col justify-center py-20 md:py-28">
        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sand/20 bg-sand/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-sand backdrop-blur sm:text-xs">
            <Shield className="h-3.5 w-3.5 text-coral" />
            Anti-arnaque · Maroc
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-sand/80">
            <Star className="h-3.5 w-3.5 fill-coral text-coral" />
            <strong className="text-sand">4,9/5</strong> · 1 284 voyageurs protégés
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display leading-[0.95] tracking-tight"
        >
          <span className="block text-[clamp(2.4rem,7vw,4.5rem)] text-sand">
            Le Maroc.
          </span>
          <span className="block text-[clamp(2.4rem,7vw,4.5rem)] text-coral">
            Au vrai prix.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-sand/90 md:text-lg"
        >
          <strong className="text-sand">47 partenaires certifiés.</strong>{" "}
          <span className="text-sand/80">
            6 villes. Les tarifs officiels, sans négociation. Économisez en moyenne 25%.
          </span>
        </motion.p>

        {/* Quick destination search (GetYourGuide-style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-2xl rounded-2xl border border-sand/15 bg-sand/95 p-2 shadow-2xl backdrop-blur"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin className="h-4 w-4 text-coral" />
              <select
                defaultValue=""
                className="w-full bg-transparent text-sm text-charcoal outline-none"
                aria-label="Choisir une ville"
              >
                <option value="">Où voulez-vous aller ?</option>
                <option value="Agadir">Agadir</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Taghazout">Taghazout</option>
                <option value="Essaouira">Essaouira</option>
                <option value="Ouarzazate">Ouarzazate</option>
                <option value="Casablanca">Casablanca</option>
              </select>
            </div>
            <Button asChild size="md" className="md:w-auto">
              <Link href="/partenaires">
                <Search className="h-4 w-4" />
                Explorer
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Button asChild size="lg" className="group">
            <Link href="/smart-pass">
              Obtenir le Smart Pass — $30/mois
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Button>
          <span className="text-xs text-sand/70">
            Sans engagement · Annulation 1 clic
          </span>
        </motion.div>
      </div>
    </section>
  );
}
