import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") redirect("/login");

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-border bg-dark-bg text-sand">
        <div className="container-px flex h-14 items-center justify-between">
          <Link href="/admin/dashboard" className="font-display text-lg font-bold">
            SmartPass Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-sand/80 hover:text-coral">Dashboard</Link>
            <Link href="/admin/partenaires" className="text-sand/80 hover:text-coral">Partenaires</Link>
            <Link href="/admin/offers" className="text-sand/80 hover:text-coral">Offres</Link>
            <Link href="/admin/users" className="text-sand/80 hover:text-coral">Users</Link>
            <Link href="/admin/abonnements" className="text-sand/80 hover:text-coral">Abos</Link>
            <Link href="/admin/qr" className="text-sand/80 hover:text-coral">QR</Link>
            <Link href="/" className="text-sand/60 hover:text-error">Quitter</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
