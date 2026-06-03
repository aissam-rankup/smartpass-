import Link from "next/link";
import {
  Users,
  Store,
  Tag,
  QrCode,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    userCount,
    partnerCount,
    offerCount,
    qrCount,
    activeSubs,
    usedQrCount,
    newUsers7d,
    newQrs7d,
    recentUsers,
    recentQrs,
    topPartners,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.partner.count(),
    prisma.offer.count(),
    prisma.qRCode.count(),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.qRCode.count({ where: { status: "USED" } }),
    prisma.user.count({ where: { createdAt: { gte: since7d } } }),
    prisma.qRCode.count({ where: { generatedAt: { gte: since7d } } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    }),
    prisma.qRCode.findMany({
      orderBy: { generatedAt: "desc" },
      take: 6,
      include: {
        user: { select: { name: true, email: true } },
        offer: { select: { name: true } },
        partner: { select: { name: true } },
      },
    }),
    prisma.partner.findMany({
      orderBy: { totalScans: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        category: true,
        totalScans: true,
        isVerified: true,
      },
    }),
  ]);

  const usageRate = qrCount ? Math.round((usedQrCount / qrCount) * 100) : 0;

  return (
    <div className="container-px py-8 md:py-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Vue d'ensemble — données en temps réel sur SmartPass.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/partenaires/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-sm font-medium text-sand transition hover:bg-coral-dark"
          >
            <Plus className="h-4 w-4" />
            Nouveau partenaire
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal transition hover:border-charcoal"
          >
            <Users className="h-4 w-4" />
            Gérer les users
          </Link>
        </div>
      </div>

      {/* ---------- KPI GRID ---------- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="Utilisateurs"
          value={userCount}
          delta={newUsers7d}
          deltaLabel="7 derniers jours"
          icon={<Users className="h-5 w-5" />}
          color="coral"
          href="/admin/users"
        />
        <Kpi
          label="Partenaires"
          value={partnerCount}
          delta={null}
          deltaLabel={`${offerCount} offres`}
          icon={<Store className="h-5 w-5" />}
          color="teal"
          href="/admin/partenaires"
        />
        <Kpi
          label="QR générés"
          value={qrCount}
          delta={newQrs7d}
          deltaLabel="7 derniers jours"
          icon={<QrCode className="h-5 w-5" />}
          color="coral"
          href="/admin/qr"
        />
        <Kpi
          label="Pass actifs"
          value={activeSubs}
          delta={null}
          deltaLabel={`${usageRate}% utilisation QR`}
          icon={<TrendingUp className="h-5 w-5" />}
          color="teal"
          href="/admin/abonnements"
        />
      </div>

      {/* ---------- TWO COLUMN: ACTIVITY + USERS ---------- */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent QR activity */}
        <div className="lg:col-span-2">
          <Card
            title="Activité QR récente"
            subtitle="6 derniers codes générés sur la plateforme"
            icon={<Activity className="h-4 w-4" />}
            action={{ href: "/admin/qr", label: "Voir tout" }}
          >
            {recentQrs.length === 0 ? (
              <Empty text="Aucun QR généré pour le moment." />
            ) : (
              <ul className="divide-y divide-border">
                {recentQrs.map((q) => (
                  <li key={q.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-charcoal">
                        {q.user.name || q.user.email}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {q.offer.name} · {q.partner.name}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs text-muted sm:inline">
                        {timeAgo(q.generatedAt)}
                      </span>
                      <QrStatus status={q.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Recent users */}
        <Card
          title="Nouveaux utilisateurs"
          subtitle="5 derniers inscrits"
          icon={<Users className="h-4 w-4" />}
          action={{ href: "/admin/users", label: "Voir tout" }}
        >
          {recentUsers.length === 0 ? (
            <Empty text="Aucun utilisateur." />
          ) : (
            <ul className="space-y-3">
              {recentUsers.map((u) => (
                <li key={u.id} className="flex items-center gap-3">
                  <Avatar name={u.name || u.email} image={u.image} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {u.name || "—"}
                    </p>
                    <p className="truncate text-xs text-muted">{u.email}</p>
                  </div>
                  <RoleBadge role={u.role} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* ---------- TOP PARTNERS ---------- */}
      <div className="mt-8">
        <Card
          title="Top partenaires par scans"
          subtitle="Classement basé sur l'usage total"
          icon={<TrendingUp className="h-4 w-4" />}
          action={{ href: "/admin/partenaires", label: "Tous les partenaires" }}
        >
          {topPartners.length === 0 ? (
            <Empty text="Aucun partenaire enregistré." />
          ) : (
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                    <th className="py-2 text-left font-medium">#</th>
                    <th className="py-2 text-left font-medium">Partenaire</th>
                    <th className="hidden py-2 text-left font-medium md:table-cell">Catégorie</th>
                    <th className="hidden py-2 text-left font-medium md:table-cell">Ville</th>
                    <th className="py-2 text-right font-medium">Scans</th>
                  </tr>
                </thead>
                <tbody>
                  {topPartners.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-stone/40"
                    >
                      <td className="py-3 text-xs font-bold text-muted">{i + 1}</td>
                      <td className="py-3">
                        <Link
                          href={`/admin/partenaires/${p.id}`}
                          className="flex items-center gap-2 font-medium text-charcoal hover:text-coral"
                        >
                          {p.name}
                          {p.isVerified && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-teal" />
                          )}
                        </Link>
                      </td>
                      <td className="hidden py-3 text-muted md:table-cell">
                        {prettyCategory(p.category)}
                      </td>
                      <td className="hidden py-3 text-muted md:table-cell">{p.city}</td>
                      <td className="py-3 text-right font-display font-semibold text-charcoal">
                        {p.totalScans.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Kpi({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  color,
  href,
}: {
  label: string;
  value: number;
  delta: number | null;
  deltaLabel: string;
  icon: React.ReactNode;
  color: "coral" | "teal";
  href: string;
}) {
  const bubble =
    color === "coral" ? "bg-coral-light text-coral" : "bg-teal-light text-teal";
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-charcoal/40 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${bubble}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-charcoal">
        {value.toLocaleString("fr-FR")}
      </p>
      <div className="mt-1 flex items-center gap-1.5">
        {delta !== null && delta > 0 && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-light px-1.5 py-0.5 text-[10px] font-semibold text-teal">
            <ArrowUpRight className="h-3 w-3" />+{delta}
          </span>
        )}
        <span className="text-xs text-muted">{deltaLabel}</span>
      </div>
    </Link>
  );
}

function Card({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 md:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-charcoal">
            {icon && <span className="text-coral">{icon}</span>}
            <h3 className="font-display text-base font-bold">{title}</h3>
          </div>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="shrink-0 text-xs font-medium text-coral hover:underline"
          >
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function Avatar({ name, image }: { name: string; image?: string | null }) {
  const initial = (name?.[0] || "?").toUpperCase();
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt={name}
        className="h-9 w-9 shrink-0 rounded-full border border-border object-cover"
      />
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-light font-display text-sm font-bold text-coral">
      {initial}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  if (role === "ADMIN") return <Badge variant="dark">Admin</Badge>;
  if (role === "PARTNER") return <Badge variant="teal">Partner</Badge>;
  return <Badge variant="outline">Tourist</Badge>;
}

function QrStatus({ status }: { status: string }) {
  if (status === "ACTIVE")
    return (
      <Badge variant="teal">
        <Clock className="h-3 w-3" />
        Active
      </Badge>
    );
  if (status === "USED")
    return (
      <Badge variant="coral">
        <CheckCircle2 className="h-3 w-3" />
        Utilisé
      </Badge>
    );
  return (
    <Badge variant="outline">
      <XCircle className="h-3 w-3" />
      {status === "EXPIRED" ? "Expiré" : "Révoqué"}
    </Badge>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-stone/30 px-4 py-8 text-center text-sm text-muted">
      {text}
    </div>
  );
}

/* ---------- UTILS ---------- */

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `il y a ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `il y a ${days}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function prettyCategory(c: string) {
  return c
    .split("_")
    .map((s) => s[0] + s.slice(1).toLowerCase())
    .join(" ");
}
