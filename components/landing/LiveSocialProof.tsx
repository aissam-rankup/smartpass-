"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

type Event = { name: string; city: string; minutes: number };

const POOL: Event[] = [
  { name: "Sarah",    city: "Marrakech", minutes:  2 },
  { name: "Thomas",   city: "Agadir",    minutes:  5 },
  { name: "Emma",     city: "Essaouira", minutes:  8 },
  { name: "Lucas",    city: "Taghazout", minutes: 11 },
  { name: "Anaïs",    city: "Agadir",    minutes: 14 },
  { name: "Marco",    city: "Marrakech", minutes: 17 },
  { name: "Camille",  city: "Casablanca",minutes: 22 },
  { name: "James",    city: "Essaouira", minutes: 28 },
  { name: "Léa",      city: "Marrakech", minutes: 33 },
  { name: "Hugo",     city: "Agadir",    minutes: 41 },
];

export function LiveSocialProof() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // First toast appears after 4s
    const first = setTimeout(() => setVisible(true), 4000);

    // Then every 9s rotate to next event
    const rotate = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % POOL.length);
        setVisible(true);
      }, 350);
    }, 9000);

    return () => {
      clearTimeout(first);
      clearInterval(rotate);
    };
  }, [dismissed]);

  if (dismissed) return null;
  const ev = POOL[idx];

  return (
    <div
      aria-live="polite"
      className={
        "fixed bottom-24 left-3 z-30 max-w-[300px] md:bottom-5 md:left-5 " +
        "transition-all duration-500 " +
        (visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0")
      }
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/95 px-3 py-2.5 shadow-lg shadow-charcoal/10 backdrop-blur">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-light text-teal">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-tight text-charcoal">
            <span className="font-bold">{ev.name}</span> vient d&apos;activer
            son Pass à <span className="font-semibold text-coral">{ev.city}</span>
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">
            il y a {ev.minutes} min · vérifié
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
          className="shrink-0 rounded-full p-1 text-muted/60 hover:bg-stone hover:text-charcoal"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
