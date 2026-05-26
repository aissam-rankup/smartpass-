"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function cancelSubscription(subId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  await prisma.subscription.update({
    where: { id: subId },
    data: { status: "CANCELED", cancelAtPeriodEnd: true },
  });
  revalidatePath("/admin/abonnements");
}
