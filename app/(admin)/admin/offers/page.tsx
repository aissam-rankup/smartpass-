import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, discountPct } from "@/lib/utils";
import { createOffer, toggleOfferPaused, deleteOffer } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage({
  searchParams,
}: {
  searchParams: { partner?: string };
}) {
  const [offers, partners] = await Promise.all([
    prisma.offer.findMany({
      where: searchParams.partner ? { partnerId: searchParams.partner } : undefined,
      orderBy: { createdAt: "desc" },
      include: { partner: { select: { name: true, slug: true } } },
    }),
    prisma.partner.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Offres</h1>
      <p className="mt-1 text-sm text-muted">{offers.length} offre(s)</p>

      <details className="mt-6 rounded-lg border border-border bg-white p-4 open:bg-stone">
        <summary className="cursor-pointer text-sm font-medium">+ Créer une offre</summary>
        <form action={createOffer} className="mt-4 grid gap-3 md:grid-cols-2">
          <select
            name="partnerId"
            required
            className="h-11 rounded-md border border-border bg-white px-3 text-sm md:col-span-2"
          >
            <option value="">— Choisir un partenaire —</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <Input name="name" placeholder="Nom de l'offre" required />
          <Input name="tags" placeholder="Tags (séparés par virgule)" />
          <textarea
            name="description"
            placeholder="Description"
            required
            rows={2}
            className="rounded-md border border-border bg-white p-3 text-sm md:col-span-2"
          />
          <Input name="normalPrice" type="number" step="0.01" placeholder="Prix normal (MAD)" required />
          <Input name="reducedPrice" type="number" step="0.01" placeholder="Prix SmartPass (MAD)" required />
          <Input name="imageUrl" type="url" placeholder="Image URL (optionnel)" className="md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Créer</Button>
        </form>
      </details>

      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Offre</th>
              <th className="px-4 py-3 text-left">Partenaire</th>
              <th className="px-4 py-3 text-left">Prix</th>
              <th className="px-4 py-3 text-left">Réduction</th>
              <th className="px-4 py-3 text-left">Scans</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{o.name}</p>
                  <p className="line-clamp-1 text-xs text-muted">{o.description}</p>
                </td>
                <td className="px-4 py-3 text-muted">{o.partner.name}</td>
                <td className="px-4 py-3">
                  <span className="text-muted line-through">{formatPrice(o.normalPrice)}</span>{" "}
                  <span className="font-semibold text-teal">{formatPrice(o.reducedPrice)}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="coral">−{discountPct(o.normalPrice, o.reducedPrice)}%</Badge>
                </td>
                <td className="px-4 py-3">{o.totalScans}</td>
                <td className="px-4 py-3">
                  {o.isPaused ? (
                    <Badge variant="default">Pause</Badge>
                  ) : o.isActive ? (
                    <Badge variant="teal">Active</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={toggleOfferPaused.bind(null, o.id)} className="inline-block">
                    <button type="submit" className="text-xs text-coral hover:underline">
                      {o.isPaused ? "Reprendre" : "Pause"}
                    </button>
                  </form>
                  <span className="mx-2 text-muted">·</span>
                  <form action={deleteOffer.bind(null, o.id)} className="inline-block">
                    <button type="submit" className="text-xs text-error hover:underline">
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
