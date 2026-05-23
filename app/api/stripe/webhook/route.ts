import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { SubStatus } from "@/lib/enums";
import { emails } from "@/lib/emails";

export const runtime = "nodejs";

const STATUS_MAP: Record<Stripe.Subscription.Status, SubStatus> = {
  active: SubStatus.ACTIVE,
  canceled: SubStatus.CANCELED,
  past_due: SubStatus.PAST_DUE,
  trialing: SubStatus.TRIALING,
  incomplete: SubStatus.INCOMPLETE,
  incomplete_expired: SubStatus.CANCELED,
  unpaid: SubStatus.PAST_DUE,
  paused: SubStatus.PAST_DUE,
};

async function upsertSubscription(sub: Stripe.Subscription, userId?: string) {
  const status = STATUS_MAP[sub.status] ?? SubStatus.INCOMPLETE;
  const data = {
    stripeSubscriptionId: sub.id,
    stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    stripePriceId: sub.items.data[0]?.price.id,
    status,
    currentPeriodStart: new Date(sub.current_period_start * 1000),
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  };

  const resolvedUserId = userId ?? (sub.metadata?.userId as string | undefined);

  if (resolvedUserId) {
    await prisma.subscription.upsert({
      where: { userId: resolvedUserId },
      update: data,
      create: { userId: resolvedUserId, ...data },
    });
  } else {
    await prisma.subscription.update({ where: { stripeSubscriptionId: sub.id }, data });
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "Bad signature" }, { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${(err as Error).message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        if (s.subscription) {
          const sub = await stripe.subscriptions.retrieve(s.subscription as string);
          await upsertSubscription(sub, s.client_reference_id ?? undefined);
          if (s.customer_email) await emails.subscriptionConfirmed(s.customer_email);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await upsertSubscription(event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(sub);
        const userSub = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
          include: { user: { select: { email: true } } },
        });
        if (userSub?.user?.email) await emails.subscriptionCanceled(userSub.user.email);
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        if (inv.subscription) {
          await prisma.subscription.update({
            where: { stripeSubscriptionId: inv.subscription as string },
            data: { status: SubStatus.PAST_DUE },
          });
          if (inv.customer_email) await emails.paymentFailed(inv.customer_email);
        }
        break;
      }
    }
  } catch (err) {
    console.error("[stripe webhook]", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
