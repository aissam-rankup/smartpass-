import Link from "next/link";
import { redirect } from "next/navigation";
import { Crown, QrCode, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUserWithSubscription } from "@/lib/access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: { welcome?: string } }) {
  const { user, hasSubscription, subscription } = await getCurrentUserWithSubscription();
  if (!user) redirect("/login?callbackUrl=/dashboard");

  const recentQrs = await prisma.qRCode.findMany({
    where: { userId: user.id },
    orderBy: { generatedAt: "desc" },
    take: 10,
    include: { offer: true, partner: true },
  });

  const stats = {
    total: recentQrs.length,
    used: recentQrs.filter((q) => q.status === "USED").length,
    savings: recentQrs
      .filter((q) => q.status === "USED")
      .reduce((sum, q) => sum + (q.offer.normalPrice - q.offer.reducedPrice), 0),
  };

  return (
    <div className="container-px py-10">
      {searchParams.welcome && (
        <div className="mb-8 rounded-lg border border-teal/40 bg-teal-light p-4 text-sm text-teal">
          🎉 Bienvenue sur SmartPass ! Votre abonnement est actif.
        </div>
      )}

      <h1 className="font-display text-3xl font-bold md:text-4xl">
        Bonjour {user.name?.split(" ")[0] ?? "voyageur"}
      </h1>
      <p className="mt-1 text-muted">Voici votre espace SmartPass.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Crown className="h-5 w-5 text-coral" />}
          label="Abonnement"
          value={hasSubscription ? "Actif" : "Inactif"}
          sub={
            subscription
              ? `Jusqu'au ${subscription.currentPeriodEnd.toLocaleDateString("fr-FR")}`
              : "Pas d'abonnement"
          }
        />
        <StatCard
          icon={<QrCode className="h-5 w-5 text-coral" />}
          label="QR utilisés"
          value={`${stats.used}`}
          sub={`${stats.total} générés au total`}
        />
        <StatCard
          icon={<ShieldCheck className="h-5 w-5 text-teal" />}
          label="Économies totales"
          value={formatPrice(stats.savings)}
          sub="Grâce à SmartPass"
        />
      </div>

      {!hasSubscription && (
        <div className="mt-8 rounded-lg border border-coral/40 bg-coral-light p-6">
          <h2 className="font-display text-lg font-semibold">Activez votre Smart Pass</h2>
          <p className="mt-1 text-sm text-coral-dark">
            Pour générer des QR codes et bénéficier des réductions, obtenez votre Smart Pass.
          </p>
          <Button asChild className="mt-4">
            <Link href="/smart-pass">Obtenir le Smart Pass</Link>
          </Button>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Mes QR codes récents</h2>

        {recentQrs.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-white p-12 text-center text-muted">
            <QrCode className="mx-auto h-8 w-8 text-muted/60" />
            <p className="mt-3">Aucun QR généré pour le moment.</p>
            <Button asChild variant="secondary" size="sm" className="mt-4">
              <Link href="/partenaires">Explorer les partenaires</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Offre</th>
                  <th className="px-4 py-3 text-left">Partenaire</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentQrs.map((q) => (
                  <tr key={q.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{q.offer.name}</td>
                    <td className="px-4 py-3 text-muted">{q.partner.name}</td>
                    <td className="px-4 py-3 text-muted">
                      {q.generatedAt.toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={q.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {q.status === "ACTIVE" ? (
                        <Link
                          href={`/qr/${q.offerId}`}
                          className="text-sm font-medium text-coral hover:underline"
                        >
                          Voir QR
                        </Link>
                      ) : (
                        <Link
                          href={`/qr/${q.offerId}`}
                          className="text-sm font-medium text-muted hover:text-coral"
                        >
                          Régénérer
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE") return <Badge variant="teal">Active</Badge>;
  if (status === "USED") return <Badge variant="outline">Utilisé</Badge>;
  if (status === "EXPIRED") return <Badge variant="default">Expiré</Badge>;
  return <Badge variant="default">Révoqué</Badge>;
}
