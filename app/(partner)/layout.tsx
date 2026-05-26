import Link from "next/link";
import { redirect } from "next/navigation";
import { ScanLine, ListChecks, Shield } from "lucide-react";
import { requireRole } from "@/lib/role";
import { Role } from "@/lib/enums";
import { PartnerSignOutButton } from "@/components/partner/SignOutButton";

export default async function PartnerLayout({ children }: { children: React.ReactNode }) {
  const role = await requireRole(Role.PARTNER, Role.ADMIN);
  if (!role.ok) redirect("/login?callbackUrl=/partner/scan");

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-border bg-white">
        <div className="container-px flex h-16 items-center justify-between">
          <Link href="/partner/scan" className="flex items-center gap-2 font-display text-lg font-bold">
            <Shield className="h-5 w-5 text-coral" /> SmartPass · Espace Partenaire
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/partner/scan" className="flex items-center gap-1.5 text-charcoal hover:text-coral">
              <ScanLine className="h-4 w-4" /> Scanner
            </Link>
            <Link href="/partner/offers" className="flex items-center gap-1.5 text-charcoal hover:text-coral">
              <ListChecks className="h-4 w-4" /> Offres
            </Link>
            <PartnerSignOutButton />
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
