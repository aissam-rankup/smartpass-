import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSubsPage() {
  const subs = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { email: true, name: true } } },
  });

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Abonnements ({subs.length})</h1>

      {subs.length === 0 ? (
        <p className="mt-8 text-muted">Aucun abonnement pour le moment.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-stone text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Période</th>
                <th className="px-4 py-3 text-left">Stripe ID</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{s.user.email}</td>
                  <td className="px-4 py-3">
                    <span className={s.status === "ACTIVE" ? "text-teal" : "text-muted"}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {new Date(s.currentPeriodStart).toLocaleDateString("fr-FR")} →{" "}
                    {new Date(s.currentPeriodEnd).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {s.stripeSubscriptionId.slice(0, 20)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
