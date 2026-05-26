import { prisma } from "@/lib/prisma";
import { createOffer, toggleOfferPaused, deleteOffer } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const [offers, partners] = await Promise.all([
    prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
      include: { partner: { select: { name: true } } },
    }),
    prisma.partner.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Offres ({offers.length})</h1>

      <details className="mt-6 rounded-lg border border-border bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium">+ Créer une offre</summary>
        <form action={createOffer} className="mt-4 grid gap-3 md:grid-cols-2">
          <select name="partnerId" required className="h-10 rounded border border-border bg-white px-3 text-sm md:col-span-2">
            <option value="">— Partenaire —</option>
            {partners.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
          </select>
          <input name="name" placeholder="Nom" required className="h-10 rounded border border-border bg-white px-3 text-sm" />
          <input name="tags" placeholder="Tags (virgule)" className="h-10 rounded border border-border bg-white px-3 text-sm" />
          <textarea name="description" placeholder="Description" required rows={2} className="rounded border border-border bg-white p-3 text-sm md:col-span-2" />
          <input name="normalPrice" type="number" step="0.01" placeholder="Prix normal" required className="h-10 rounded border border-border bg-white px-3 text-sm" />
          <input name="reducedPrice" type="number" step="0.01" placeholder="Prix SmartPass" required className="h-10 rounded border border-border bg-white px-3 text-sm" />
          <button type="submit" className="rounded bg-coral px-4 py-2 text-sm text-white md:col-span-2">Créer</button>
        </form>
      </details>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Offre</th>
              <th className="px-4 py-3 text-left">Partenaire</th>
              <th className="px-4 py-3 text-left">Prix</th>
              <th className="px-4 py-3 text-left">Scans</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{o.name}</td>
                <td className="px-4 py-3 text-muted">{o.partner.name}</td>
                <td className="px-4 py-3">
                  <span className="text-muted line-through">{o.normalPrice}</span>{" "}
                  <span className="font-semibold text-teal">{o.reducedPrice} MAD</span>
                </td>
                <td className="px-4 py-3">{o.totalScans}</td>
                <td className="px-4 py-3 text-right">
                  <form action={toggleOfferPaused.bind(null, o.id)} className="inline">
                    <button className="text-xs text-coral hover:underline">{o.isPaused ? "Reprendre" : "Pause"}</button>
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
