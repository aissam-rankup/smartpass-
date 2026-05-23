import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="container-px pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-lg bg-charcoal text-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.heroSurfer}
            alt="Vague à Taghazout"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(at 80% 0%, rgba(216,90,48,0.55) 0px, transparent 50%)",
            }}
            aria-hidden
          />
          <div className="relative p-12 text-center md:p-20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Prêt à voyager sans stress ?
            </h2>
            <p className="mt-3 text-sand/85">
              Rejoignez 1 284 voyageurs qui surfent les vagues marocaines au juste prix.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/smart-pass">Obtenir mon Smart Pass maintenant</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-sand/60">
              99 MAD/mois · Sans engagement · Annulation en 1 clic
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
