import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

const problems = [
  { icon: "🚕", text: "Taxi aéroport → hôtel : 60 MAD local / 300 MAD touriste" },
  { icon: "🏄", text: "Cours de surf : 200 MAD local / 600 MAD touriste" },
  { icon: "🍽️", text: "Menu restaurant : 40 MAD local / 150 MAD touriste" },
];

const solutions = [
  { title: "Abonnez-vous", body: "99 MAD/mois. Accès immédiat à tous les partenaires." },
  { title: "Explorez les offres", body: "47 partenaires certifiés, 300+ offres, 6 villes." },
  { title: "Générez votre QR", body: "Un code unique par offre. Présentez. Économisez." },
];

export function ProblemSolution() {
  return (
    <>
      {/* PROBLEM — image left, text right (Lapoint-style editorial) */}
      <section className="bg-sand">
        <div className="container-px py-24">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG.taxiRoad}
                  alt="Route au Maroc"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sand backdrop-blur">
                  Le vrai problème
                </span>
              </div>

              <div className="lg:order-2">
                <span className="inline-block rounded-full bg-coral-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
                  Le problème
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
                  Le prix touriste existe.
                  <br />
                  <em className="text-coral">Et il coûte cher.</em>
                </h2>
                <p className="mt-4 max-w-lg text-charcoal/75 md:text-lg">
                  Au Maroc, il n'est pas rare de payer 2x, 3x, voire 5x le prix local. Sans
                  repères, sans références de prix, les arnaques sont partout : taxis,
                  restaurants, excursions, location de matériel...
                </p>
                <ul className="mt-8 space-y-3">
                  {problems.map((p) => (
                    <li
                      key={p.text}
                      className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm"
                    >
                      <span className="text-xl" aria-hidden>{p.icon}</span>
                      <span className="text-sm text-charcoal/85">{p.text}</span>
                      <X className="ml-auto h-4 w-4 shrink-0 text-error" aria-hidden />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION — image right, text left. Soft warm cream background. */}
      <section className="relative overflow-hidden bg-coral-light">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(216,90,48,0.15) 0px, transparent 50%), radial-gradient(circle at 10% 80%, rgba(29,158,117,0.10) 0px, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="container-px relative py-24">
          <Reveal delay={0.05}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal">
                  La solution
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-charcoal md:text-5xl">
                  SmartPass.
                  <br />
                  <em className="text-coral">Votre bouclier.</em>
                </h2>
                <p className="mt-4 max-w-lg text-charcoal/75 md:text-lg">
                  Avec SmartPass, vous accédez aux tarifs officiels négociés avec chaque
                  partenaire certifié. Vous montrez votre QR. Vous profitez du vrai prix. C'est tout.
                </p>
                <ol className="mt-8 space-y-3">
                  {solutions.map((s, i) => (
                    <li
                      key={s.title}
                      className="flex items-start gap-4 rounded-lg border border-coral/20 bg-white p-4 shadow-sm"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral font-display text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold text-charcoal">
                          {s.title}
                        </p>
                        <p className="text-sm text-charcoal/65">{s.body}</p>
                      </div>
                      <Check className="ml-auto mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden />
                    </li>
                  ))}
                </ol>

                <Link
                  href="/smart-pass"
                  className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-coral underline-offset-4 hover:underline"
                >
                  Voir comment activer mon Pass <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl lg:aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG.heroLineup}
                  alt="Voyageurs SmartPass à Taghazout"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-charcoal/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-coral/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
                  La bonne énergie
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
