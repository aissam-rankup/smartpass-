import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/enums";

export async function requireRole(...allowed: Role[]) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, status: 401 };
  const fresh = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, partnerId: true, email: true, name: true },
  });
  if (!fresh) return { ok: false as const, status: 401 };
  if (!allowed.includes(fresh.role as Role)) return { ok: false as const, status: 403 };
  return { ok: true as const, user: { ...fresh, role: fresh.role as Role } };
}
