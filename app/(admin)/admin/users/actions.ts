"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateUserRole(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = formData.get("userId") as string;
  const role = formData.get("role") as string;
  const partnerId = (formData.get("partnerId") as string) || null;

  await prisma.user.update({
    where: { id: userId },
    data: {
      role,
      partnerId: role === "PARTNER" ? partnerId : null,
    },
  });
  revalidatePath("/admin/users");
}
