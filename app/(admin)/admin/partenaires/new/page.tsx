import Link from "next/link";
import { createPartner } from "../actions";

const CATEGORIES = [
  { value: "RESTAURATION", label: "Restauration" },
  { value: "SURF_SPORT", label: "Surf & Sport" },
  { value: "TRANSPORT", label: "Transport" },
  { value: "EXCURSIONS", label: "Excursions" },
  { value: "HEBERGEMENT", label: "Hébergement" },
  { value: "LOCATION_VOITURE", label: "Location voiture" },
  { value: "BIEN_ETRE", label: "Bien-être" },
  { value: "CULTURE", label: "Culture" },
  { value: "SHOPPING", label: "Shopping" },
];

const CITIES = ["Agadir", "Marrakech", "Essaouira", "Taghazout", "Ouarzazate", "Casablanca"];

export default function NewPartnerPage() {
  return (
    <div className="p-8">
      <Link href="/admin/partenaires" className="text-sm text-muted hover:text-coral">
        ← Retour
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold">Nouveau partenaire</h1>

      <form action={createPartner} className="mt-8 max-w-2xl space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Nom *</span>
            <input name="name" required className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Slug</span>
            <input name="slug" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" placeholder="auto-généré si vide" />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold uppercase text-muted">Description *</span>
          <textarea name="description" required rows={3} className="mt-1 w-full rounded border border-border bg-white p-3 text-sm" />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Catégorie *</span>
            <select name="category" required className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Ville *</span>
            <select name="city" required className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm">
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Adresse</span>
            <input name="address" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Téléphone</span>
            <input name="phone" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Email</span>
            <input name="email" type="email" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted">Site web</span>
            <input name="website" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold uppercase text-muted">Image URL</span>
          <input name="coverImageUrl" className="mt-1 h-10 w-full rounded border border-border bg-white px-3 text-sm" placeholder="https://..." />
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isVerified" className="accent-coral" /> Vérifié
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked className="accent-coral" /> Actif
          </label>
        </div>

        <button type="submit" className="rounded-full bg-coral px-6 py-3 text-sm font-medium text-white hover:bg-coral-dark">
          Créer le partenaire
        </button>
      </form>
    </div>
  );
}
