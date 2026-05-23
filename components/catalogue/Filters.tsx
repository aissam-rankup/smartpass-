"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { CATEGORY_LABEL, CITIES } from "@/lib/labels";
import type { PartnerCategory } from "@/lib/enums";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABEL) as PartnerCategory[];

export function CatalogueFilters({
  current,
}: {
  current: { city?: string; category?: string; q?: string };
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  function set(key: string, value?: string) {
    const next = new URLSearchParams(params?.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    startTransition(() => router.push(`/partenaires?${next.toString()}`));
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-20">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
          Recherche
        </label>
        <input
          defaultValue={current.q ?? ""}
          placeholder="Nom du partenaire..."
          className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          onChange={(e) => set("q", e.target.value || undefined)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
          Ville
        </label>
        <div className="flex flex-wrap gap-2">
          <Chip active={!current.city} onClick={() => set("city")}>
            Toutes
          </Chip>
          {CITIES.map((c) => (
            <Chip key={c} active={current.city === c} onClick={() => set("city", c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
          Catégorie
        </label>
        <div className="flex flex-col gap-1">
          <Chip active={!current.category} onClick={() => set("category")} block>
            Toutes les catégories
          </Chip>
          {ALL_CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              active={current.category === cat}
              onClick={() => set("category", cat)}
              block
            >
              {CATEGORY_LABEL[cat]}
            </Chip>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Chip({
  active,
  onClick,
  children,
  block,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        (block ? "w-full text-left " : "") +
        "rounded-full border px-3 py-1.5 text-sm transition " +
        (active
          ? "border-coral bg-coral text-white"
          : "border-border bg-white text-charcoal hover:border-coral")
      }
    >
      {children}
    </button>
  );
}
