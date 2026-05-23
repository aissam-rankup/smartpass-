import { prisma } from "@/lib/prisma";
import { SubStatus } from "@/lib/enums";
import { MrrChart, SignupsChart, ScansByPartnerChart } from "@/components/admin/Charts";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const MONTHLY_PRICE = 99;
const ANNUAL_MONTHLY = 899 / 12;

export default async function AdminDashboard() {
  const [activeSubs, allSubs, partners, offers, qrThisMonth, scansThisMonth, top10] =
    await Promise.all([
      prisma.subscription.count({ where: { status: SubStatus.ACTIVE } }),
      prisma.subscription.count(),
      prisma.partner.findMany({ select: { isActive: true } }),
      prisma.offer.findMany({ select: { isActive: true, isPaused: true } }),
      prisma.qRCode.count({
        where: { generatedAt: { gte: startOfMonth() } },
      }),
      prisma.qRCode.count({
        where: { status: "USED", usedAt: { gte: startOfMonth() } },
      }),
      prisma.partner.findMany({
        orderBy: { totalScans: "desc" },
        take: 10,
        select: { name: true, totalScans: true },
      }),
    ]);

  // Approximate MRR from monthly + annual price IDs
  const subs = await prisma.subscription.findMany({
    where: { status: SubStatus.ACTIVE },
    select: { stripePriceId: true },
  });
  const mrr = subs.reduce((sum, s) => {
    if (s.stripePriceId === process.env.STRIPE_PRICE_ANNUAL_ID) return sum + ANNUAL_MONTHLY;
    return sum + MONTHLY_PRICE;
  }, 0);

  const activePartners = partners.filter((p) => p.isActive).length;
  const activeOffers = offers.filter((o) => o.isActive && !o.isPaused).length;

  const mrrSeries = await buildMrrSeries();
  const signupSeries = await buildSignupSeries();

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Vue d'ensemble</h1>
      <p className="mt-1 text-sm text-muted">Indicateurs en temps réel</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Abonnés actifs" value={activeSubs} sub={`${allSubs} au total`} />
        <Kpi label="MRR" value={formatPrice(Math.round(mrr))} sub="Estimation mensuelle" />
        <Kpi label="Partenaires" value={activePartners} sub={`${partners.length} au total`} />
        <Kpi label="Offres" value={activeOffers} sub={`${offers.length} créées`} />
        <Kpi label="QR générés (mois)" value={qrThisMonth} sub="Tous statuts" />
        <Kpi label="QR scannés (mois)" value={scansThisMonth} sub="Validés en réel" />
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card title="Revenu mensuel (12 mois)">
          <MrrChart data={mrrSeries} />
        </Card>
        <Card title="Nouveaux abonnés (30 jours)">
          <SignupsChart data={signupSeries} />
        </Card>
      </section>

      <section className="mt-6">
        <Card title="Top 10 partenaires par scans">
          <ScansByPartnerChart
            data={top10.map((p) => ({ partner: p.name, scans: p.totalScans }))}
          />
        </Card>
      </section>
    </div>
  );
}

function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function Kpi({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

async function buildMrrSeries() {
  const now = new Date();
  const months: { month: string; mrr: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const subs = await prisma.subscription.count({
      where: {
        status: { in: [SubStatus.ACTIVE, SubStatus.TRIALING] },
        createdAt: { lt: next },
        OR: [{ cancelAtPeriodEnd: false }, { currentPeriodEnd: { gte: d } }],
      },
    });
    months.push({
      month: d.toLocaleDateString("fr-FR", { month: "short" }),
      mrr: subs * MONTHLY_PRICE,
    });
  }
  return months;
}

async function buildSignupSeries() {
  const now = new Date();
  const days: { day: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const count = await prisma.subscription.count({
      where: { createdAt: { gte: d, lt: next } },
    });
    days.push({ day: `${d.getDate()}`, count });
  }
  return days;
}
