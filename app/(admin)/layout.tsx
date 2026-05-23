import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Building, Tag, Users, CreditCard, QrCode, LogOut, Shield } from "lucide-react";
import { requireRole } from "@/lib/role";
import { signOut } from "@/lib/auth";
import { Role } from "@/lib/enums";

const nav = [
  { href: "/admin/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/partenaires", label: "Partenaires", icon: Building },
  { href: "/admin/offers", label: "Offres", icon: Tag },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/abonnements", label: "Abonnements", icon: CreditCard },
  { href: "/admin/qr", label: "QR codes", icon: QrCode },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) redirect("/login?callbackUrl=/admin/dashboard");

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-sand">
      <aside className="border-r border-border bg-dark-bg text-sand">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6 font-display text-lg font-bold">
          <Shield className="h-5 w-5 text-coral" /> SmartPass
        </div>
        <nav className="p-4">
          <p className="px-3 text-[10px] uppercase tracking-wider text-sand/40">Administration</p>
          <ul className="mt-3 space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sand/80 transition hover:bg-white/5 hover:text-coral"
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="mt-8 px-3"
          >
            <button className="flex items-center gap-2 text-sm text-sand/60 hover:text-error">
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </form>
        </nav>
      </aside>
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
