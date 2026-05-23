import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { QRStatus } from "@/lib/enums";
import { revokeQr } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminQrPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status =
    searchParams.status && Object.values(QRStatus).includes(searchParams.status as QRStatus)
      ? (searchParams.status as QRStatus)
      : undefined;

  const qrs = await prisma.qRCode.findMany({
    where: status ? { status } : undefined,
    orderBy: { generatedAt: "desc" },
    take: 200,
    include: {
      offer: { select: { name: true } },
      partner: { select: { name: true } },
      user: { select: { email: true } },
    },
  });

  const [active, used] = await Promise.all([
    prisma.qRCode.count({ where: { status: QRStatus.ACTIVE } }),
    prisma.qRCode.count({ where: { status: QRStatus.USED } }),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">QR codes</h1>
      <p className="mt-1 text-sm text-muted">
        {active} actifs · {used} utilisés
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip current={status} value={undefined} label="Tous" />
        {Object.values(QRStatus).map((s) => (
          <Chip key={s} current={status} value={s} label={s} />
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Token</th>
              <th className="px-4 py-3 text-left">Touriste</th>
              <th className="px-4 py-3 text-left">Offre</th>
              <th className="px-4 py-3 text-left">Partenaire</th>
              <th className="px-4 py-3 text-left">Généré</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {qrs.map((q) => (
              <tr key={q.id} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs text-muted">{q.token.slice(0, 12)}…</td>
                <td className="px-4 py-3">{q.user.email}</td>
                <td className="px-4 py-3">{q.offer.name}</td>
                <td className="px-4 py-3 text-muted">{q.partner.name}</td>
                <td className="px-4 py-3 text-xs text-muted">
                  {q.generatedAt.toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      q.status === "ACTIVE" ? "teal" : q.status === "USED" ? "outline" : "coral"
                    }
                  >
                    {q.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {q.status === QRStatus.ACTIVE && (
                    <form action={revokeQr.bind(null, q.id)}>
                      <button className="text-xs text-error hover:underline">Révoquer</button>
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
  current?: QRStatus;
  value?: QRStatus;
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
