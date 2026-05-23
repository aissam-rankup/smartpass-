"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { Role } from "@/lib/enums";

const Schema = z.object({
  userId: z.string().min(1),
  role: z.nativeEnum(Role),
  partnerId: z.string().optional().or(z.literal("")),
});

export async function updateUserRole(formData: FormData) {
  const r = await requireRole(Role.ADMIN);
  if (!r.ok) throw new Error("Forbidden");
  const data = Schema.parse(Object.fromEntries(formData));
  await prisma.user.update({
    where: { id: data.userId },
    data: {
      role: data.role,
      partnerId: data.role === Role.PARTNER ? (data.partnerId || null) : null,
    },
  });
  revalidatePath("/admin/users");
}
