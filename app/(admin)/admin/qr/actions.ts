"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function revokeQr(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  await prisma.qRCode.update({ where: { id }, data: { status: "REVOKED" } });
  revalidatePath("/admin/qr");
}
