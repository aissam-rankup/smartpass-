import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, discountPct } from "@/lib/utils";

export type OfferCardData = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  normalPrice: number;
  reducedPrice: number;
  imageUrl?: string | null;
};

export function OfferCard({ offer, hasSubscription }: { offer: OfferCardData; hasSubscription: boolean }) {
  const pct = discountPct(offer.normalPrice, offer.reducedPrice);
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-white">
      {offer.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={offer.imageUrl} alt={offer.name} className="aspect-[16/9] w-full object-cover" loading="lazy" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{offer.name}</h3>
        <p className="mt-1 text-sm text-charcoal/75">{offer.description}</p>

        {offer.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {offer.tags.map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted line-through">{formatPrice(offer.normalPrice)}</p>
            <p className="font-display text-2xl font-bold text-teal">{formatPrice(offer.reducedPrice)}</p>
          </div>
          <Badge variant="coral" className="text-sm">−{pct}%</Badge>
        </div>

        <div className="mt-4">
          {hasSubscription ? (
            <Button asChild className="w-full">
              <Link href={`/qr/${offer.id}`}>Générer mon QR code</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary" className="w-full">
              <Link href="/smart-pass">Débloquer avec SmartPass</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
