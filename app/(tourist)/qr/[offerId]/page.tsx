import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUserWithSubscription } from "@/lib/access";
import { QrDisplay } from "@/components/qr/QrDisplay";
import { formatPrice, discountPct } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function QrPage({ params }: { params: { offerId: string } }) {
  const { user, hasSubscription } = await getCurrentUserWithSubscription();
  if (!user) redirect(`/login?callbackUrl=/qr/${params.offerId}`);
  if (!hasSubscription) redirect("/smart-pass");

  const offer = await prisma.offer.findFirst({
    where: { id: params.offerId, isActive: true, isPaused: false },
    include: { partner: true },
  });
  if (!offer) notFound();

  return (
    <div className="container-px py-10">
      <Link href={`/partenaires/${offer.partner.slug}`} className="text-sm text-muted hover:text-coral">
        ← Retour à {offer.partner.name}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-border bg-white p-6 md:p-8">
          <p className="text-sm text-muted">{offer.partner.name} · {offer.partner.city}</p>
          <h1 className="mt-1 font-display text-2xl font-bold md:text-3xl">{offer.name}</h1>
          <p className="mt-3 text-charcoal/80">{offer.description}</p>

          <div className="mt-6 flex flex-wrap items-end gap-4 border-t border-border pt-6">
            <div>
              <p className="text-xs text-muted">Tarif normal</p>
              <p className="font-display text-lg text-muted line-through">
                {formatPrice(offer.normalPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">Tarif SmartPass</p>
              <p className="font-display text-3xl font-bold text-teal">
                {formatPrice(offer.reducedPrice)}
              </p>
            </div>
            <Badge variant="coral" className="ml-auto text-sm">
              −{discountPct(offer.normalPrice, offer.reducedPrice)}%
            </Badge>
          </div>
        </div>

        <QrDisplay offerId={offer.id} />
      </div>
    </div>
  );
}
