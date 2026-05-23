import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NAV = [
  { href: "/partenaires", label: "Partenaires" },
  { href: "/smart-pass", label: "Le Smart Pass" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-sand/80 backdrop-blur-md">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <Shield className="h-5 w-5 text-coral" aria-hidden />
          SmartPass
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal/80 transition hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-charcoal/80 hover:text-charcoal sm:inline-flex"
          >
            Se connecter
          </Link>
          <Button asChild size="sm">
            <Link href="/smart-pass">Obtenir mon Pass</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
