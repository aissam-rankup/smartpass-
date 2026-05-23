import Link from "next/link";
import { PartnerForm } from "@/components/admin/PartnerForm";
import { createPartner } from "../actions";

export default function NewPartnerPage() {
  return (
    <div className="p-8">
      <Link href="/admin/partenaires" className="text-sm text-muted hover:text-coral">
        ← Retour aux partenaires
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold">Nouveau partenaire</h1>
      <div className="mt-8 max-w-3xl rounded-lg border border-border bg-white p-6">
        <PartnerForm action={createPartner} />
      </div>
    </div>
  );
}
