import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [userCount, partnerCount, offerCount, qrCount] = await Promise.all([
    prisma.user.count(),
    prisma.partner.count(),
    prisma.offer.count(),
    prisma.qRCode.count(),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Vue d'ensemble</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Utilisateurs" value={userCount} />
        <Kpi label="Partenaires" value={partnerCount} />
        <Kpi label="Offres" value={offerCount} />
        <Kpi label="QR codes" value={qrCount} />
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}
