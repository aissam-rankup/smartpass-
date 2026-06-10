"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold leading-none text-charcoal">
            299 <span className="text-sm text-charcoal/65">DH</span>
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Valable 2 mois</p>
        </div>
        <Link
          href="/smart-pass"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-5 py-3 text-sm font-bold text-white shadow-md transition active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          Obtenir mon Morocco Pass
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
