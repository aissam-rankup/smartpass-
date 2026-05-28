import { Crown, MapPin, QrCode } from "lucide-react";
import { IMG } from "@/lib/images";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const steps = [
  {
    Icon: Crown,
    title: "Obtenir le Smart Pass en 2 minutes",
    body:
      "Créez votre compte, choisissez votre Pass (99 MAD/mois ou 899 MAD/an), et accédez immédiatement à tous les partenaires.",
    img: IMG.surfBoards,
    alt: "Planches de surf empilées",
  },
  {
    Icon: MapPin,
    title: "Trouvez votre offre",
    body:
      "Parcourez 47 partenaires certifiés dans 6 villes. Filtrez par catégorie, comparez les tarifs, lisez les descriptions.",
    img: IMG.cityMarrakech,
    alt: "Carriole et minaret à Marrakech",
  },
  {
    Icon: QrCode,
    title: "Générez votre QR code",
    body:
      "Un QR unique sécurisé par offre. Présentez-le au partenaire, il scanne, le tarif réduit s'applique.",
    img: IMG.surfWaves,
    alt: "Surfeurs sur les vagues",
  },
];

export function HowItWorks() {
  return (
    <section className="container-px py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
            Comment ça marche
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            3 étapes simples pour{" "}
            <em className="text-coral">voyager au vrai prix.</em>
          </h2>
        </div>
      </Reveal>

      <RevealStagger className="relative mt-16 grid gap-8 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-32 hidden h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent md:block" />

        {steps.map(({ Icon, title, body, img, alt }, i) => (
          <RevealItem key={title}>
            <div className="relative h-full overflow-hidden rounded-lg border border-border bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={alt}
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-coral font-display text-base font-bold text-white shadow-lg">
                  {i + 1}
                </div>
              </div>
              <div className="p-6">
                <Icon className="h-7 w-7 text-coral" aria-hidden />
                <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
