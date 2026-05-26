import { prisma } from "@/lib/prisma";
import { revokeQr } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminQrPage() {
  const qrs = await prisma.qRCode.findMany({
    orderBy: { generatedAt: "desc" },
    take: 100,
    include: {
      offer: { select: { name: true } },
      partner: { select: { name: true } },
      user: { select: { email: true } },
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">QR Codes ({qrs.length})</h1>

      {qrs.length === 0 ? (
        <p className="mt-8 text-muted">Aucun QR code généré.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-stone text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Token</th>
                <th className="px-4 py-3 text-left">Touriste</th>
                <th className="px-4 py-3 text-left">Offre</th>
                <th className="px-4 py-3 text-left">Partenaire</th>
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
                  <td className="px-4 py-3">
                    <span className={q.status === "ACTIVE" ? "text-teal" : q.status === "USED" ? "text-muted" : "text-coral"}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {q.status === "ACTIVE" && (
                      <form action={revokeQr.bind(null, q.id)} className="inline">
                        <button className="text-xs text-error hover:underline">Révoquer</button>
                      </form>
                    )}
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
