"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function getTargetDate(): Date {
  // Launch promo ends 14 days from first visit (stored in localStorage).
  if (typeof window === "undefined") return new Date(Date.now() + 14 * 86400e3);
  const stored = localStorage.getItem("mp_promo_end");
  if (stored) {
    const d = new Date(stored);
    if (d.getTime() > Date.now()) return d;
  }
  const target = new Date(Date.now() + 14 * 86400e3);
  localStorage.setItem("mp_promo_end", target.toISOString());
  return target;
}

function formatLeft(ms: number) {
  if (ms <= 0) return { d: "00", h: "00", m: "00", s: "00" };
  const total = Math.floor(ms / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return {
    d: String(d).padStart(2, "0"),
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function LaunchCountdown() {
  const [target, setTarget] = useState<Date | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setTarget(getTargetDate());
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  if (!target) {
    return <div className="h-[60px]" aria-hidden />;
  }

  const left = formatLeft(target.getTime() - now);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-coral/30 bg-gradient-to-r from-coral/10 via-coral/15 to-coral/10 px-4 py-3 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-coral/25 blur-2xl"
      />
      <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <div className="inline-flex items-center gap-2">
          <Flame className="h-4 w-4 animate-pulse text-coral" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
            Offre de lancement
          </span>
        </div>

        <span className="hidden h-5 w-px bg-coral/30 sm:block" />

        <div className="flex items-center gap-1.5 font-display">
          {([
            ["d", "j"],
            ["h", "h"],
            ["m", "min"],
            ["s", "sec"],
          ] as const).map(([key, label]) => (
            <div key={key} className="flex flex-col items-center">
              <span className="rounded-md bg-charcoal px-2 py-1 text-base font-extrabold tabular-nums text-white sm:text-lg">
                {left[key]}
              </span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-charcoal/65">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
