import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { stripe, STRIPE_PRICES, type StripePlan } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const Body = z.object({ plan: z.enum(["monthly", "annual"]) });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const plan: StripePlan = parsed.data.plan;
  const priceId = STRIPE_PRICES[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Price not configured" }, { status: 500 });
  }

  const existing = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
    select: { stripeCustomerId: true },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: existing?.stripeCustomerId,
    customer_email: existing?.stripeCustomerId ? undefined : session.user.email,
    client_reference_id: session.user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${appUrl}/dashboard?welcome=1`,
    cancel_url: `${appUrl}/smart-pass?canceled=1`,
    metadata: { userId: session.user.id, plan },
  });

  return NextResponse.json({ url: checkout.url });
}
