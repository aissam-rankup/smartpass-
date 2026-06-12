"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp } from "lucide-react";

// Seeded daily counter so it changes a bit but stays consistent within a session.
// 18-32 new members per day during launch window.
function seedFromDate(): number {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  // Deterministic pseudo-random 18..32
  return 18 + (seed % 15);
}

export function LiveCounter() {
  const [count, setCount] = useState(0);
  const target = seedFromDate();

  useEffect(() => {
    // Animate from 0 → target on mount
    let current = 0;
    const step = Math.max(1, Math.round(target / 30));
    const tick = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(tick);
      }
      setCount(current);
    }, 40);

    // Then add +1 every ~45-90s to feel live
    const live = setInterval(() => {
      setCount((c) => c + 1);
    }, 45000 + Math.random() * 45000);

    return () => {
      clearInterval(tick);
      clearInterval(live);
    };
  }, [target]);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
      </span>
      <Users className="h-4 w-4 text-teal" />
      <span className="text-sm font-semibold text-charcoal">
        <span className="tabular-nums text-teal">{count}</span> nouveaux membres
        <span className="ml-1 text-muted">aujourd&apos;hui</span>
      </span>
      <TrendingUp className="h-3.5 w-3.5 text-coral" aria-hidden />
    </div>
  );
}
