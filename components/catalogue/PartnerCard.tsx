import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/labels";
import { formatPrice } from "@/lib/utils";
import type { PartnerCategory } from "@/lib/enums";

export type PartnerCardData = {
  slug: string;
  name: string;
  city: string;
  category: PartnerCategory | string;
  description: string;
  isVerified: boolean;
  coverImageUrl?: string | null;
  offerCount: number;
  startingFrom?: number | null;
};

export function PartnerCard({ p }: { p: PartnerCardData }) {
  return (
    <Link
      href={`/partenaires/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition hover:border-coral hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-stone">
        {p.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.coverImageUrl}
            alt={`${p.name} — ${CATEGORY_LABEL[p.category as PartnerCategory]} ${p.city} (partenaire SmartPass)`}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-coral via-coral-dark to-charcoal" />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="dark">
            <span aria-hidden>{CATEGORY_EMOJI[p.category as PartnerCategory]}</span>
            {CATEGORY_LABEL[p.category as PartnerCategory]}
          </Badge>
          {p.isVerified && (
            <Badge variant="teal">
              <BadgeCheck className="h-3 w-3" /> Vérifié
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3 w-3" /> {p.city}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-charcoal/75">{p.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="text-xs text-muted">{p.offerCount} offres</p>
            {p.startingFrom != null && (
              <p className="font-display text-base font-bold text-teal">
                Dès {formatPrice(p.startingFrom)}
              </p>
            )}
          </div>
          <span className="text-sm font-medium text-coral group-hover:underline">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}
