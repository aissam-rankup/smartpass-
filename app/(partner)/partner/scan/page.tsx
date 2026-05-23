import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { Scanner } from "@/components/partner/Scanner";
import { Role } from "@/lib/enums";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PartnerScanPage() {
  const role = await requireRole(Role.PARTNER, Role.ADMIN);
  if (!role.ok) redirect("/login?callbackUrl=/partner/scan");

  const partner = role.user.partnerId
    ? await prisma.partner.findUnique({
        where: { id: role.user.partnerId },
        select: { id: true, name: true, city: true },
      })
    : null;

  const recent = role.user.partnerId
    ? await prisma.qRCode.findMany({
        where: { partnerId: role.user.partnerId, status: "USED" },
        orderBy: { usedAt: "desc" },
        take: 10,
        include: {
          offer: { select: { name: true, reducedPrice: true } },
          user: { select: { name: true, email: true } },
        },
      })
    : [];

  return (
    <div className="container-px py-10">
      <header>
        <h1 className="font-display text-3xl font-bold">Scanner un QR code</h1>
        <p className="mt-1 text-sm text-muted">
          {partner ? `${partner.name} · ${partner.city}` : "Aucun partenaire lié à votre compte"}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <Scanner />

        <section>
          <h2 className="font-display text-xl font-semibold">Derniers scans validés</h2>
          {recent.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-white p-8 text-center text-muted">
              Aucun scan pour le moment.
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white">
              <table className="w-full text-sm">
                <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-4 py-3 text-left">Offre</th>
                    <th className="px-4 py-3 text-left">Touriste</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((q) => (
                    <tr key={q.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{q.offer.name}</td>
                      <td className="px-4 py-3 text-muted">
                        {(q.user.name ?? q.user.email).split(" ")[0]}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {q.usedAt?.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-teal">
                        {formatPrice(q.offer.reducedPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Link
            href="/partner/offers"
            className="mt-4 inline-block text-sm text-coral hover:underline"
          >
            Gérer mes offres →
          </Link>
        </section>
      </div>
    </div>
  );
}
