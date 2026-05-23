"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_LABEL, CITIES } from "@/lib/labels";

type PartnerFormValues = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  city?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  coverImageUrl?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
};

export function PartnerForm({
  initial,
  action,
}: {
  initial?: PartnerFormValues;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom *">
          <Input name="name" defaultValue={initial?.name} required />
        </Field>
        <Field label="Slug (optionnel)">
          <Input name="slug" defaultValue={initial?.slug} placeholder="ex: ocean-surf-school" />
        </Field>
      </div>

      <Field label="Description *">
        <textarea
          name="description"
          defaultValue={initial?.description}
          required
          rows={4}
          className="w-full rounded-md border border-border bg-white p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Catégorie *">
          <select
            name="category"
            defaultValue={initial?.category}
            required
            className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm"
          >
            {Object.entries(CATEGORY_LABEL).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>

        <Field label="Ville *">
          <select
            name="city"
            defaultValue={initial?.city ?? "Agadir"}
            required
            className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Adresse">
          <Input name="address" defaultValue={initial?.address ?? ""} />
        </Field>
        <Field label="Téléphone">
          <Input name="phone" defaultValue={initial?.phone ?? ""} />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" defaultValue={initial?.email ?? ""} />
        </Field>
        <Field label="Site web">
          <Input name="website" type="url" defaultValue={initial?.website ?? ""} />
        </Field>
      </div>

      <Field label="Image de couverture (URL Cloudinary)">
        <Input name="coverImageUrl" type="url" defaultValue={initial?.coverImageUrl ?? ""} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isVerified"
            defaultChecked={initial?.isVerified}
            className="h-4 w-4 rounded border-border accent-coral"
          />
          Partenaire vérifié
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initial?.isActive !== false}
            className="h-4 w-4 rounded border-border accent-coral"
          />
          Actif (visible publiquement)
        </label>
      </div>

      <Button type="submit" size="lg">
        {initial?.id ? "Enregistrer les modifications" : "Créer le partenaire"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
