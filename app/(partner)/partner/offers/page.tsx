import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { Role } from "@/lib/enums";
import { Badge } from "@/components/ui/badge";
import { formatPrice, discountPct } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PartnerOffersPage() {
  const role = await requireRole(Role.PARTNER, Role.ADMIN);
  if (!role.ok) redirect("/login?callbackUrl=/partner/offers");

  if (!role.user.partnerId) {
    return (
      <div className="container-px py-16">
        <p className="text-muted">Aucun établissement n'est lié à votre compte.</p>
      </div>
    );
  }

  const offers = await prisma.offer.findMany({
    where: { partnerId: role.user.partnerId },
    orderBy: [{ isActive: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="container-px py-10">
      <h1 className="font-display text-3xl font-bold">Mes offres</h1>
      <p className="mt-1 text-sm text-muted">
        {offers.length} offre{offers.length > 1 ? "s" : ""} · Modifications soumises à validation admin
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Offre</th>
              <th className="px-4 py-3 text-left">Tarif normal</th>
              <th className="px-4 py-3 text-left">Tarif SmartPass</th>
              <th className="px-4 py-3 text-left">Réduction</th>
              <th className="px-4 py-3 text-left">Scans</th>
              <th className="px-4 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{o.name}</p>
                  <p className="line-clamp-1 text-xs text-muted">{o.description}</p>
                </td>
                <td className="px-4 py-3 text-muted line-through">{formatPrice(o.normalPrice)}</td>
                <td className="px-4 py-3 font-semibold text-teal">{formatPrice(o.reducedPrice)}</td>
                <td className="px-4 py-3">
                  <Badge variant="coral">−{discountPct(o.normalPrice, o.reducedPrice)}%</Badge>
                </td>
                <td className="px-4 py-3 text-muted">{o.totalScans}</td>
                <td className="px-4 py-3">
                  {o.isPaused ? (
                    <Badge variant="default">En pause</Badge>
                  ) : o.isActive ? (
                    <Badge variant="teal">Active</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
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
