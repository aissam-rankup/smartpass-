"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { href: "/partenaires", label: "Partenaires" },
  { href: "/smart-pass", label: "Le Smart Pass" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-sand/80 backdrop-blur-md">
        <div className="container-px flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
          >
            <Shield className="h-5 w-5 text-coral" aria-hidden />
            SmartPass
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "text-sm font-medium transition hover:text-coral " +
                  (pathname === item.href
                    ? "text-coral"
                    : "text-charcoal/80")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-charcoal/80 hover:text-charcoal sm:inline-flex"
            >
              Se connecter
            </Link>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/smart-pass">Obtenir mon Pass</Link>
            </Button>

            {/* Hamburger toggle — mobile only */}
            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md text-charcoal md:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-sand md:hidden"
          >
            {/* Spacer for the sticky navbar */}
            <div className="h-16 shrink-0" />

            <nav className="flex flex-1 flex-col justify-center px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className={
                      "group flex items-center justify-between border-b border-border py-5 font-display text-3xl font-bold tracking-tight transition " +
                      (pathname === item.href
                        ? "text-coral"
                        : "text-charcoal hover:text-coral")
                    }
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-10 space-y-3"
              >
                <Button asChild size="lg" className="w-full">
                  <Link href="/smart-pass">
                    Obtenir mon Pass — $30/mois
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="/login"
                  className="block text-center text-sm font-medium text-charcoal/70 hover:text-coral"
                >
                  Se connecter
                </Link>
              </motion.div>
            </nav>

            <div className="px-8 pb-8 text-center text-xs text-muted">
              © {new Date().getFullYear()} SmartPass Maroc
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
