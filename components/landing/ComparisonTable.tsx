import { Reveal } from "@/components/ui/Reveal";

const ROWS = [
  { activity: "Cours de surf 2h",      normal: 600, smart: 250 },
  { activity: "Hammam + gommage",      normal: 350, smart: 180 },
  { activity: "Menu poisson",          normal: 280, smart: 140 },
  { activity: "Transfert aéroport",    normal: 300, smart: 90  },
  { activity: "Excursion désert 2j",   normal: 1200, smart: 650 },
];

const totalNormal = ROWS.reduce((s, r) => s + r.normal, 0);
const totalSmart  = ROWS.reduce((s, r) => s + r.smart,  0);
const totalSaved  = totalNormal - totalSmart;

export function ComparisonTable() {
  return (
    <section className="container-px py-14 md:py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-teal-light px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal">
            Tarifs comparés
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            Combien pouvez-vous{" "}
            <em className="text-coral">économiser ?</em>
          </h2>
          <p className="mt-3 text-muted md:text-lg">
            Tarifs réels constatés à Agadir, Marrakech et Taghazout.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-border bg-sand px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-charcoal/65 sm:px-6 sm:text-xs">
            <p>Activité</p>
            <p className="text-right">Tarif standard</p>
            <p className="text-right">Tarif SmartPass</p>
          </div>

          {/* Rows */}
          <ul className="divide-y divide-border">
            {ROWS.map((row) => (
              <li
                key={row.activity}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 px-4 py-3.5 text-sm sm:px-6"
              >
                <p className="font-medium text-charcoal">{row.activity}</p>
                <p className="text-right text-muted line-through">{row.normal} DH</p>
                <p className="text-right font-display text-base font-bold text-coral sm:text-lg">
                  {row.smart} DH
                </p>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-t border-border bg-teal px-4 py-4 text-white sm:px-6">
            <p className="font-display text-sm font-bold sm:text-base">Économie totale</p>
            <p className="text-right text-sm text-white/70 line-through">{totalNormal} DH</p>
            <p className="text-right font-display text-lg font-extrabold sm:text-2xl">
              −{totalSaved} DH
            </p>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted">
          Tarifs indicatifs basés sur la moyenne des partenaires actifs. Économies réelles variant selon les activités choisies.
        </p>
      </Reveal>
    </section>
  );
}
