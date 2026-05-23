import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL } from "@/lib/labels";
import type { PartnerCategory } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { offers: true } } },
  });

  return (
    <div className="p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Partenaires</h1>
          <p className="mt-1 text-sm text-muted">{partners.length} partenaire(s)</p>
        </div>
        <Button asChild>
          <Link href="/admin/partenaires/new">+ Ajouter un partenaire</Link>
        </Button>
      </header>

      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Catégorie</th>
              <th className="px-4 py-3 text-left">Ville</th>
              <th className="px-4 py-3 text-left">Offres</th>
              <th className="px-4 py-3 text-left">Scans</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted">/{p.slug}</p>
                </td>
                <td className="px-4 py-3">{CATEGORY_LABEL[p.category as PartnerCategory]}</td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">{p._count.offers}</td>
                <td className="px-4 py-3">{p.totalScans}</td>
                <td className="px-4 py-3 space-x-1">
                  {p.isVerified && <Badge variant="teal">Vérifié</Badge>}
                  {p.isActive ? <Badge variant="coral">Actif</Badge> : <Badge variant="outline">Inactif</Badge>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/partenaires/${p.id}`}
                    className="text-sm font-medium text-coral hover:underline"
                  >
                    Éditer →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
