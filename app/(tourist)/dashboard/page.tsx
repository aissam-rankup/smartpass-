import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Crown,
  QrCode,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUserWithSubscription } from "@/lib/access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { welcome?: string };
}) {
  const { user, hasSubscription, subscription } = await getCurrentUserWithSubscription();
  if (!user) redirect("/login?callbackUrl=/dashboard");

  const recentQrs = await prisma.qRCode.findMany({
    where: { userId: user.id },
    orderBy: { generatedAt: "desc" },
    take: 10,
    include: { offer: true, partner: true },
  });

  const stats = {
    total: recentQrs.length,
    used: recentQrs.filter((q) => q.status === "USED").length,
    active: recentQrs.filter((q) => q.status === "ACTIVE").length,
    savings: recentQrs
      .filter((q) => q.status === "USED")
      .reduce((sum, q) => sum + (q.offer.normalPrice - q.offer.reducedPrice), 0),
  };

  const firstName = user.name?.split(" ")[0] ?? "voyageur";
  const daysLeft = subscription
    ? Math.max(
        0,
        Math.ceil(
          (subscription.currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  return (
    <div className="container-px py-8 md:py-12">
      {searchParams.welcome && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-teal/30 bg-teal-light p-4">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
          <div>
            <p className="font-display text-sm font-semibold text-teal">
              Bienvenue sur SmartPass !
            </p>
            <p className="mt-0.5 text-xs text-teal/80">
              Votre Pass est actif. Explorez nos partenaires pour générer votre premier QR.
            </p>
          </div>
        </div>
      )}

      {/* ---------- HERO PASS CARD ---------- */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal via-charcoal to-coral-dark p-6 text-sand md:p-10">
        {/* decorative */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--color-coral)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-teal)" }}
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand/60">Bonjour</p>
            <h1 className="mt-1 font-display text-3xl font-bold md:text-5xl">{firstName}</h1>
            <p className="mt-2 max-w-md text-sm text-sand/70 md:text-base">
              Voici votre espace SmartPass. Tarifs locaux, partenaires vérifiés, économies au
              rendez-vous.
            </p>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-sand/15 bg-white/5 p-5 backdrop-blur md:w-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-coral" />
                <span className="text-xs uppercase tracking-wider text-sand/70">Smart Pass</span>
              </div>
              {hasSubscription ? (
                <Badge variant="teal">Actif</Badge>
              ) : (
                <Badge variant="coral">Inactif</Badge>
              )}
            </div>

            {hasSubscription && subscription ? (
              <>
                <p className="font-display text-2xl font-bold leading-tight">
                  {daysLeft} jour{daysLeft > 1 ? "s" : ""}
                  <span className="ml-1 text-sm font-normal text-sand/60">restants</span>
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/15">
                  <div
                    className="h-full rounded-full bg-coral transition-all"
                    style={{ width: `${Math.min(100, (daysLeft / 60) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-sand/55">
                  Expire le{" "}
                  {subscription.currentPeriodEnd.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-bold">Activez votre Pass</p>
                <Button asChild size="sm" className="mt-1 w-full">
                  <Link href="/smart-pass">Obtenir — 299 DH</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------- STATS ROW ---------- */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<QrCode className="h-5 w-5" />}
          iconColor="coral"
          label="QR générés"
          value={stats.total.toString()}
          sub={`${stats.active} actif${stats.active > 1 ? "s" : ""}`}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconColor="teal"
          label="QR utilisés"
          value={stats.used.toString()}
          sub={`${
            stats.total ? Math.round((stats.used / stats.total) * 100) : 0
          }% du total`}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          iconColor="coral"
          label="Économies réalisées"
          value={formatPrice(stats.savings)}
          sub="Grâce à SmartPass"
          highlight
        />
      </div>

      {/* ---------- QUICK ACTIONS ---------- */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          href="/partenaires"
          icon={<MapPin className="h-5 w-5" />}
          title="Explorer les partenaires"
          desc="47 partenaires à Agadir et au Maroc"
        />
        <QuickAction
          href="/partenaires?category=RESTAURATION"
          icon={<Sparkles className="h-5 w-5" />}
          title="Restaurants vérifiés"
          desc="Tagines, couscous, petits-déj"
        />
        <QuickAction
          href="/smart-pass"
          icon={<Crown className="h-5 w-5" />}
          title={hasSubscription ? "Gérer mon Pass" : "Obtenir le Pass"}
          desc={hasSubscription ? "Renouvellement, détails" : "299 DH — valable 2 mois"}
        />
      </div>

      {/* ---------- NO SUB CTA ---------- */}
      {!hasSubscription && (
        <div className="mt-6 overflow-hidden rounded-xl border border-coral/30 bg-gradient-to-r from-coral-light to-sand p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-charcoal md:text-xl">
                Activez votre Smart Pass pour 299 DH
              </h2>
              <p className="mt-1 max-w-md text-sm text-coral-dark">
                Une fois activé, générez vos QR codes et économisez dès la 2ᵉ activité. Valable 2
                mois.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/smart-pass">
                Obtenir maintenant
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* ---------- RECENT QR ---------- */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold md:text-2xl">Mes QR récents</h2>
            <p className="mt-1 text-sm text-muted">
              Vos {Math.min(10, stats.total)} derniers codes générés
            </p>
          </div>
          {recentQrs.length > 0 && (
            <Link
              href="/partenaires"
              className="text-sm font-medium text-coral hover:underline"
            >
              + Nouveau QR
            </Link>
          )}
        </div>

        {recentQrs.length === 0 ? (
          <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-coral-light">
              <QrCode className="h-7 w-7 text-coral" />
            </div>
            <p className="mt-4 font-display text-base font-semibold text-charcoal">
              Aucun QR pour le moment
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Choisissez une offre chez l'un de nos partenaires pour générer votre premier QR.
            </p>
            <Button asChild variant="primary" size="sm" className="mt-5">
              <Link href="/partenaires">Explorer les partenaires</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="mt-5 grid gap-3 md:hidden">
              {recentQrs.map((q) => (
                <Link
                  key={q.id}
                  href={`/qr/${q.offerId}`}
                  className="block rounded-xl border border-border bg-white p-4 transition hover:border-coral hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base font-semibold text-charcoal">
                        {q.offer.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted">{q.partner.name}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-wider text-muted/80">
                        {q.generatedAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <StatusBadge status={q.status} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="mt-5 hidden overflow-hidden rounded-xl border border-border bg-white md:block">
              <table className="w-full text-sm">
                <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3 text-left">Offre</th>
                    <th className="px-5 py-3 text-left">Partenaire</th>
                    <th className="px-5 py-3 text-left">Date</th>
                    <th className="px-5 py-3 text-left">Statut</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQrs.map((q) => (
                    <tr
                      key={q.id}
                      className="border-t border-border transition hover:bg-stone/40"
                    >
                      <td className="px-5 py-4 font-medium text-charcoal">{q.offer.name}</td>
                      <td className="px-5 py-4 text-muted">{q.partner.name}</td>
                      <td className="px-5 py-4 text-muted">
                        {q.generatedAt.toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={q.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        {q.status === "ACTIVE" ? (
                          <Link
                            href={`/qr/${q.offerId}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-coral hover:underline"
                          >
                            Voir QR
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <Link
                            href={`/qr/${q.offerId}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-coral"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Régénérer
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  iconColor,
  label,
  value,
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  iconColor: "coral" | "teal";
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  const bubble =
    iconColor === "coral"
      ? "bg-coral-light text-coral"
      : "bg-teal-light text-teal";
  return (
    <div
      className={`rounded-xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm ${
        highlight ? "border-coral/40 ring-1 ring-coral/10" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${bubble}`}>
          {icon}
        </span>
      </div>
      <p
        className={`mt-3 font-display text-2xl font-bold md:text-3xl ${
          highlight ? "text-coral" : "text-charcoal"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{sub}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:border-coral hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral transition group-hover:bg-coral group-hover:text-sand">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-charcoal">{title}</p>
        <p className="truncate text-xs text-muted">{desc}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")
    return (
      <Badge variant="teal">
        <Clock className="h-3 w-3" /> Active
      </Badge>
    );
  if (status === "USED")
    return (
      <Badge variant="coral">
        <CheckCircle2 className="h-3 w-3" /> Utilisé
      </Badge>
    );
  if (status === "EXPIRED")
    return (
      <Badge variant="outline">
        <XCircle className="h-3 w-3" /> Expiré
      </Badge>
    );
  return (
    <Badge variant="default">
      <XCircle className="h-3 w-3" /> Révoqué
    </Badge>
  );
}
