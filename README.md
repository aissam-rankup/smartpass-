# SmartPass

Anti-scam tourist protection platform for Morocco. Next.js 14 · TypeScript · Prisma · Stripe.

## Phase 1 — Foundation ✅

This is the scaffold from Phase 1 of the build plan:

- Next.js 14 (App Router) + TypeScript + Tailwind
- Design system: CSS variables (coral / teal / sand / charcoal), Syne + DM Sans
- Prisma schema (User, Subscription, Partner, Offer, QRCode, NextAuth tables)
- NextAuth v5 with Google + Resend magic link, Prisma adapter
- Stripe: checkout session route + webhook handler (subscription lifecycle)
- Base layout: Navbar, Footer, public-route group
- Placeholder landing, partners, smart-pass, login pages
- `middleware.ts` guarding `/dashboard`, `/qr`, `/partner`, `/admin`
- `robots.ts` + `sitemap.ts`

## Getting started

```bash
cp .env.example .env
# fill in DATABASE_URL, AUTH_SECRET, Google/Resend/Stripe keys

npm install
npm run db:push      # or db:migrate dev
npm run db:seed      # seeds an admin + a sample partner
npm run dev
```

Open http://localhost:3000.

## Next phases

- **Phase 2 (Tourist UI):** full landing-page sections, partner catalogue + filters, individual partner pages, Stripe-Checkout subscription flow, QR generation page, tourist dashboard, i18n (FR/EN).
- **Phase 3 (Partner UI):** QR scanner (html5-qrcode), validation API, offers list, scan history.
- **Phase 4 (Admin):** KPI dashboard (recharts), full CRUD for partners / offers / subscriptions / users / QR.
- **Phase 5 (Polish):** Resend email templates, structured data (JSON-LD), perf pass to Lighthouse 90+, security audit, staging UAT.
