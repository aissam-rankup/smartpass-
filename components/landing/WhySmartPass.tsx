import { Handshake, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const benefits = [
  {
    n: "01",
    Icon: Handshake,
    title: "Tarifs négociés",
    body:
      "Chaque partenaire signe un engagement écrit. Le prix affiché est le prix appliqué. Sans marchandage.",
  },
  {
    n: "02",
    Icon: MapPinned,
    title: "Vérifié sur place",
    body:
      "Notre équipe visite chaque adresse à Agadir, Marrakech et Taghazout avant de l'intégrer. Pas de promesses, que des pros.",
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "QR sécurisé",
    body:
      "Code unique par offre, à usage unique. Pas de fraude, pas de revente, pas d'abus. Vous régénérez quand vous voulez.",
  },
  {
    n: "04",
    Icon: Sparkles,
    title: "La bonne énergie",
    body:
      "1 284 voyageurs partagent leurs astuces dans la communauté. Vous voyagez avec les vrais conseils des locaux.",
  },
];

export function WhySmartPass() {
  return (
    <section className="bg-sand py-24">
      <div className="container-px">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
                Pourquoi SmartPass ?
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[0.95] md:text-6xl">
                On ne fait pas de la
                <br />
                réduction. <em className="text-coral">On rétablit le vrai prix.</em>
              </h2>
            </div>
            <p className="max-w-sm text-charcoal/70 md:text-lg">
              SmartPass n'est pas un site coupon. C'est un pacte : entre vous, nos partenaires
              certifiés, et le vrai Maroc.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <RevealItem key={b.n}>
              <div className="group h-full bg-white p-6 transition hover:bg-coral-light md:p-8">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-coral md:text-4xl">
                    {b.n}
                  </span>
                  <b.Icon className="h-6 w-6 text-charcoal/30 transition group-hover:text-coral" aria-hidden />
                </div>
                <h3 className="mt-8 font-display text-xl font-bold leading-tight md:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{b.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
