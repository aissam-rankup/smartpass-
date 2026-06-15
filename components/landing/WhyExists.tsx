import { Eye, Lock, Sparkles, Compass } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const GUARANTEES = [
  {
    Icon: Eye,
    title: "Un prix connu à l'avance",
    body: "Vous savez exactement ce que vous allez payer avant de partir.",
  },
  {
    Icon: Lock,
    title: "Un prix fixe",
    body: "Pas de variation selon votre tête, votre accent ou votre nationalité.",
  },
  {
    Icon: Sparkles,
    title: "Un prix préférentiel",
    body: "Jusqu'à 60% moins cher que le tarif touriste standard.",
  },
];

export function WhyExists() {
  return (
    <section className="relative overflow-hidden bg-sand py-14 md:py-20">
      {/* Subtle background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(216,90,48,0.10) 0px, transparent 40%), radial-gradient(circle at 85% 70%, rgba(29,158,117,0.10) 0px, transparent 40%)",
        }}
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-coral">
                <Compass className="h-3 w-3" />
                Pourquoi Morocco Pass existe
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-5xl">
                Au Maroc, les prix peuvent varier{" "}
                <em className="text-coral">d&apos;un touriste à l&apos;autre.</em>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted md:text-lg">
                Pour une même activité, deux voyageurs peuvent payer des montants très différents.
                Morocco Pass négocie directement avec des partenaires vérifiés pour vous garantir :
              </p>
            </div>
          </Reveal>

          <RevealStagger className="mt-12 grid gap-4 md:grid-cols-3">
            {GUARANTEES.map(({ Icon, title, body }, i) => (
              <RevealItem key={title}>
                <div className="group relative h-full rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl">
                  {/* Number badge */}
                  <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal font-display text-sm font-bold text-sand shadow">
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10 text-coral transition group-hover:scale-110 group-hover:bg-coral group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Closing line */}
          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl rounded-2xl border-2 border-dashed border-coral/40 bg-white/70 px-5 py-4 text-center font-display text-base font-semibold text-charcoal sm:text-lg">
              Ainsi vous profitez du Maroc{" "}
              <span className="text-coral">sans négociation</span>{" "}
              ni <span className="text-coral">mauvaise surprise.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
