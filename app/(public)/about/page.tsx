import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "À propos de Morocco Pass — Mission anti-prix-touriste",
  description:
    "Morocco Pass est né d'un constat : au Maroc le prix touriste existe et il pénalise ceux qui veulent juste profiter de leur voyage. Notre mission : garantir les tarifs locaux à chaque voyageur, sans négociation ni mauvaise surprise.",
  keywords: [
    "morocco pass histoire", "prix touriste maroc", "arnaque maroc tourisme",
    "association anti arnaque maroc", "pass touristique maroc",
  ],
  alternates: {
    canonical: "/about",
    languages: { "fr-MA": "/about", "en-US": "/about", "x-default": "/about" },
  },
  openGraph: {
    title: "À propos de Morocco Pass — Notre mission",
    description: "Garantir les tarifs locaux à chaque voyageur au Maroc.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal py-20 text-sand">
        <div className="container-px text-center">
          <Shield className="mx-auto h-10 w-10 text-coral" />
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Notre mission : voyager au vrai prix.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sand/75">
            Morocco Pass est né d'un constat simple — au Maroc, le prix touriste existe et il pénalise
            ceux qui veulent juste profiter du voyage.
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Pillar
            Icon={Shield}
            title="Protection"
            body="Nous garantissons des tarifs officiels affichés et négociés avec chaque partenaire. Pas de surprise, pas de marchandage."
          />
          <Pillar
            Icon={Users}
            title="Confiance"
            body="Chaque partenaire est vérifié manuellement. Notre équipe parcourt le Maroc pour sélectionner les pros qui respectent leurs engagements."
          />
          <Pillar
            Icon={Award}
            title="Impact"
            body="En valorisant les partenaires éthiques, nous contribuons à un tourisme plus juste — pour les voyageurs et pour les locaux."
          />
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/smart-pass">Rejoindre Morocco Pass</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function Pillar({ Icon, title, body }: { Icon: typeof Shield; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <Icon className="h-7 w-7 text-coral" />
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
