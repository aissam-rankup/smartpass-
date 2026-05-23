import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PartnerForm } from "@/components/admin/PartnerForm";
import { Button } from "@/components/ui/button";
import { updatePartner, togglePartnerActive } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({ where: { id: params.id } });
  if (!partner) notFound();

  return (
    <div className="p-8">
      <Link href="/admin/partenaires" className="text-sm text-muted hover:text-coral">
        ← Retour aux partenaires
      </Link>
      <header className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{partner.name}</h1>
          <p className="text-sm text-muted">/{partner.slug} · {partner.totalScans} scans</p>
        </div>
        <form action={togglePartnerActive.bind(null, partner.id)}>
          <Button variant="secondary" size="sm">
            {partner.isActive ? "Désactiver" : "Activer"}
          </Button>
        </form>
      </header>

      <div className="mt-8 max-w-3xl rounded-lg border border-border bg-white p-6">
        <PartnerForm initial={partner} action={updatePartner.bind(null, partner.id)} />
      </div>
    </div>
  );
}
