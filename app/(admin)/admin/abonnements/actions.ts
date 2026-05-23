"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { requireRole } from "@/lib/role";
import { Role, SubStatus } from "@/lib/enums";

export async function cancelSubscriptionAction(subId: string) {
  const r = await requireRole(Role.ADMIN);
  if (!r.ok) throw new Error("Forbidden");
  const sub = await prisma.subscription.findUnique({ where: { id: subId } });
  if (!sub) return;
  await stripe.subscriptions.cancel(sub.stripeSubscriptionId).catch(() => {});
  await prisma.subscription.update({
    where: { id: subId },
    data: { status: SubStatus.CANCELED, cancelAtPeriodEnd: true },
  });
  revalidatePath("/admin/abonnements");
}
