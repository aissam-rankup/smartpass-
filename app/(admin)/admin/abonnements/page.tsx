import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { SubStatus } from "@/lib/enums";
import { cancelSubscriptionAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSubsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status =
    searchParams.status && Object.values(SubStatus).includes(searchParams.status as SubStatus)
      ? (searchParams.status as SubStatus)
      : undefined;

  const subs = await prisma.subscription.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: { select: { email: true, name: true } } },
  });

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Abonnements</h1>
      <p className="mt-1 text-sm text-muted">{subs.length} abonnement(s)</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip current={status} value={undefined} label="Tous" />
        {Object.values(SubStatus).map((s) => (
          <Chip key={s} current={status} value={s} label={s} />
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Utilisateur</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Période</th>
              <th className="px-4 py-3 text-left">Stripe</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{s.user.email}</p>
                  <p className="text-xs text-muted">{s.user.name}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={s.status === "ACTIVE" ? "teal" : s.status === "CANCELED" ? "outline" : "coral"}>
                    {s.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted">
                  {s.currentPeriodStart.toLocaleDateString("fr-FR")} →{" "}
                  {s.currentPeriodEnd.toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-xs font-mono text-muted">
                  <a
                    href={`https://dashboard.stripe.com/subscriptions/${s.stripeSubscriptionId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-coral hover:underline"
                  >
                    {s.stripeSubscriptionId.slice(0, 14)}...
                  </a>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.status === SubStatus.ACTIVE && (
                    <form action={cancelSubscriptionAction.bind(null, s.id)}>
                      <button className="text-xs text-error hover:underline">Annuler</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Chip({
  current,
  value,
  label,
}: {
  current?: SubStatus;
  value?: SubStatus;
  label: string;
}) {
  const href = value ? `?status=${value}` : "?";
  const active = current === value;
  return (
    <a
      href={href}
      className={
        "rounded-full border px-3 py-1 text-xs transition " +
        (active ? "border-coral bg-coral text-white" : "border-border bg-white text-charcoal hover:border-coral")
      }
    >
      {label}
    </a>
  );
}
