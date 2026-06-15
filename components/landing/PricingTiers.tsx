"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  User,
  Users,
  Home,
  Compass,
  Crown,
  ArrowRight,
  Sparkles,
  Bus,
  Map,
  UtensilsCrossed,
  Waves,
  Bath,
  Hotel,
  ShoppingBag,
} from "lucide-react";

type PackKey = "tourist" | "all";

type Tier = {
  key: "solo" | "duo" | "family";
  name: string;
  pax: string;
  Icon: typeof User;
  popular?: boolean;
};

const TIERS: Tier[] = [
  { key: "solo",   name: "Solo",          pax: "1 voyageur",    Icon: User  },
  { key: "duo",    name: "Duo",           pax: "2 voyageurs",   Icon: Users, popular: true },
  { key: "family", name: "Famille",       pax: "4 voyageurs",   Icon: Home  },
];

const PRICES: Record<PackKey, Record<Tier["key"], number>> = {
  tourist: { solo: 299, duo: 499, family:  999 },
  all:     { solo: 399, duo: 699, family: 1199 },
};

const PACK_INFO = {
  tourist: {
    label: "Tourist",
    sub: "Activités touristiques uniquement",
    accent: "teal",
    Icon: Compass,
    includes: ["Excursions", "Circuits", "Transferts", "Activités touristiques"],
    excludes: ["Restaurants", "Hammams", "Hébergements", "Shopping"],
  },
  all: {
    label: "Tout Exclusif",
    sub: "Toutes les catégories incluses",
    accent: "coral",
    Icon: Crown,
    includes: ["Excursions", "Circuits", "Transferts", "Activités", "Restaurants", "Hammams", "Hébergements", "Shopping"],
    excludes: [],
  },
} as const;

const CATEGORY_MATRIX = [
  { Icon: Map,             label: "Excursions",        tourist: true,  all: true },
  { Icon: Compass,         label: "Circuits",          tourist: true,  all: true },
  { Icon: Bus,             label: "Transferts",        tourist: true,  all: true },
  { Icon: Waves,           label: "Surf & activités",  tourist: true,  all: true },
  { Icon: UtensilsCrossed, label: "Restaurants",       tourist: false, all: true },
  { Icon: Bath,            label: "Hammams & spas",    tourist: false, all: true },
  { Icon: Hotel,           label: "Hébergements",      tourist: false, all: true },
  { Icon: ShoppingBag,     label: "Shopping artisan",  tourist: false, all: true },
];

export function PricingTiers() {
  const [pack, setPack] = useState<PackKey>("all");
  const info = PACK_INFO[pack];
  const isCoral = info.accent === "coral";

  return (
    <section className="bg-sand py-14 md:py-20">
      <div className="container-px">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-coral">
            <Sparkles className="h-3 w-3" />
            Choisissez votre pass
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            2 packs, 3 formats — <em className="text-coral">à votre rythme.</em>
          </h2>
          <p className="mt-3 text-muted md:text-lg">
            Voyagez seul, en couple ou en famille. Choisissez le pack qui correspond à vos envies.
          </p>
        </div>

        {/* Pack toggle */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-border">
            {(Object.keys(PACK_INFO) as PackKey[]).map((k) => {
              const P = PACK_INFO[k];
              const active = pack === k;
              return (
                <button
                  key={k}
                  onClick={() => setPack(k)}
                  className={
                    "relative flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition " +
                    (active
                      ? k === "all"
                        ? "bg-gradient-to-r from-coral to-coral-dark text-white shadow-md"
                        : "bg-gradient-to-r from-teal to-teal/85 text-white shadow-md"
                      : "text-charcoal/70 hover:text-charcoal")
                  }
                >
                  <P.Icon className="h-4 w-4" />
                  {P.label}
                  {k === "all" && !active && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-coral px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                      Top
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            {info.sub}
          </p>
        </div>

        {/* 3 tier cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pack}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3"
          >
            {TIERS.map(({ key, name, pax, Icon, popular }) => {
              const price = PRICES[pack][key];
              const isPopular = popular;
              return (
                <div
                  key={key}
                  className={
                    "relative flex flex-col rounded-3xl bg-white p-7 transition hover:-translate-y-1 " +
                    (isPopular
                      ? (isCoral
                          ? "border-2 border-coral shadow-[0_25px_50px_-12px_rgba(216,90,48,0.35)] hover:shadow-[0_30px_60px_-12px_rgba(216,90,48,0.45)]"
                          : "border-2 border-teal shadow-[0_25px_50px_-12px_rgba(29,158,117,0.30)] hover:shadow-[0_30px_60px_-12px_rgba(29,158,117,0.40)]")
                      : "border border-border shadow-sm hover:shadow-lg")
                  }
                >
                  {isPopular && (
                    <span
                      className={
                        "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow " +
                        (isCoral ? "bg-coral" : "bg-teal")
                      }
                    >
                      ⚡ Le plus populaire
                    </span>
                  )}

                  <div
                    className={
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl " +
                      (isCoral ? "bg-coral/10 text-coral" : "bg-teal/10 text-teal")
                    }
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-charcoal">{name}</h3>
                  <p className="text-xs uppercase tracking-wider text-muted">{pax}</p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold leading-none text-charcoal">
                      {price}
                    </span>
                    <span className="font-display text-lg font-bold text-charcoal/65">DH</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Paiement unique · Valable 2 mois
                  </p>

                  {/* Per-person price hint */}
                  {key !== "solo" && (
                    <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-light px-2 py-0.5 text-[11px] font-semibold text-teal">
                      <Check className="h-3 w-3" />
                      Soit {Math.round(price / (key === "duo" ? 2 : 4))} DH/pers
                    </p>
                  )}

                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-charcoal">
                    {info.includes.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className={
                            "mt-0.5 h-4 w-4 shrink-0 " + (isCoral ? "text-coral" : "text-teal")
                          }
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {info.includes.length > 5 && (
                      <li className="flex items-start gap-2 text-xs text-muted">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
                        <span>+{info.includes.length - 5} autres catégories</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href={`/smart-pass/checkout?pack=${pack}&tier=${key}`}
                    className={
                      "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow transition active:scale-95 " +
                      (isPopular
                        ? (isCoral
                            ? "bg-gradient-to-r from-coral to-coral-dark hover:shadow-lg hover:shadow-coral/40"
                            : "bg-gradient-to-r from-teal to-teal/85 hover:shadow-lg hover:shadow-teal/40")
                        : "bg-charcoal hover:bg-charcoal/85")
                    }
                  >
                    Choisir {name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Comparison matrix */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center font-display text-2xl font-bold text-charcoal md:text-3xl">
            Comparez les <em className="text-coral">catégories incluses</em>
          </h3>
          <p className="mt-2 text-center text-sm text-muted">
            Ce qui est compris dans chaque pack.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 border-b border-border bg-stone px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-charcoal/65 sm:px-6 sm:text-xs">
              <p>Catégorie</p>
              <p className="text-center">Tourist</p>
              <p className="text-center">Tout Exclusif</p>
            </div>
            <ul className="divide-y divide-border">
              {CATEGORY_MATRIX.map((row) => (
                <li
                  key={row.label}
                  className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 px-4 py-3 text-sm sm:px-6"
                >
                  <div className="flex items-center gap-2">
                    <row.Icon className="h-4 w-4 text-charcoal/65" />
                    <span className="font-medium text-charcoal">{row.label}</span>
                  </div>
                  <div className="flex justify-center">
                    {row.tourist ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/15 text-teal">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/35">
                        <X className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral/15 text-coral">
                      <Check className="h-4 w-4" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Besoin d&apos;aide pour choisir ?{" "}
            <Link href="/contact" className="font-semibold text-coral hover:underline">
              Contactez notre équipe →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
