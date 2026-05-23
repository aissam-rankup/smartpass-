import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubStatus } from "@/lib/enums";

export async function getActiveSubscription(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub) return null;
  if (sub.status === SubStatus.ACTIVE || sub.status === SubStatus.TRIALING) return sub;
  return null;
}

export async function getCurrentUserWithSubscription() {
  const session = await auth();
  if (!session?.user?.id) return { user: null, hasSubscription: false };
  const sub = await getActiveSubscription(session.user.id);
  return { user: session.user, hasSubscription: !!sub, subscription: sub };
}
