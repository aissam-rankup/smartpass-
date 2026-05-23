import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-dark-bg text-sand">
      <div className="container-px grid gap-10 py-16 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <Shield className="h-5 w-5 text-coral" /> SmartPass
          </Link>
          <p className="mt-4 max-w-xs text-sm text-sand/70">
            Voyagez au Maroc sans payer le prix touriste. 47+ partenaires certifiés, tarifs officiels garantis.
          </p>
        </div>

        <FooterCol title="Découvrir">
          <FooterLink href="/partenaires">Partenaires</FooterLink>
          <FooterLink href="/smart-pass">Le Smart Pass</FooterLink>
          <FooterLink href="/about">À propos</FooterLink>
        </FooterCol>

        <FooterCol title="Villes">
          <FooterLink href="/partenaires?city=Agadir">Agadir</FooterLink>
          <FooterLink href="/partenaires?city=Marrakech">Marrakech</FooterLink>
          <FooterLink href="/partenaires?city=Essaouira">Essaouira</FooterLink>
          <FooterLink href="/partenaires?city=Taghazout">Taghazout</FooterLink>
        </FooterCol>

        <FooterCol title="Support">
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/legal/terms">CGU</FooterLink>
          <FooterLink href="/legal/privacy">Confidentialité</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-6 text-xs text-sand/60 md:flex-row">
          <p>© {new Date().getFullYear()} SmartPass Maroc. Tous droits réservés.</p>
          <p>Paiement sécurisé via Stripe · Annulation en 1 clic</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sand/90">{title}</h4>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-sand/70 transition hover:text-coral">
        {children}
      </Link>
    </li>
  );
}
