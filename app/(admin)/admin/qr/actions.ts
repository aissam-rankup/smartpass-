"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { QRStatus, Role } from "@/lib/enums";

export async function revokeQr(id: string) {
  const r = await requireRole(Role.ADMIN);
  if (!r.ok) throw new Error("Forbidden");
  await prisma.qRCode.update({ where: { id }, data: { status: QRStatus.REVOKED } });
  revalidatePath("/admin/qr");
}
