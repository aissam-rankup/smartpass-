import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, slug: true, city: true, category: true, isActive: true, isVerified: true, totalScans: true },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Partenaires ({partners.length})</h1>
        <Link
          href="/admin/partenaires/new"
          className="rounded-full bg-coral px-5 py-2 text-sm font-medium text-white hover:bg-coral-dark"
        >
          + Ajouter
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Ville</th>
              <th className="px-4 py-3 text-left">Catégorie</th>
              <th className="px-4 py-3 text-left">Scans</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.city}</td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="px-4 py-3">{p.totalScans}</td>
                <td className="px-4 py-3">
                  <span className={p.isActive ? "text-teal" : "text-muted"}>
                    {p.isActive ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/partenaires/${p.id}`} className="text-coral hover:underline">
                    Éditer
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
