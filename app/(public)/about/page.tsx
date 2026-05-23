import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "À propos — Notre mission anti-arnaque au Maroc",
  description:
    "SmartPass a été créé pour protéger les touristes au Maroc des prix gonflés et des arnaques. Notre mission, notre équipe, nos partenaires.",
  alternates: { canonical: "/about" },
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
            SmartPass est né d'un constat simple — au Maroc, le prix touriste existe et il pénalise
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
            <Link href="/smart-pass">Rejoindre SmartPass</Link>
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
