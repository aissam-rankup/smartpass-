"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createOffer(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.offer.create({
    data: {
      partnerId: formData.get("partnerId") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      tags: (formData.get("tags") as string) || "",
      normalPrice: parseFloat(formData.get("normalPrice") as string),
      reducedPrice: parseFloat(formData.get("reducedPrice") as string),
      imageUrl: (formData.get("imageUrl") as string) || null,
    },
  });
  revalidatePath("/admin/offers");
}

export async function toggleOfferPaused(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  const offer = await prisma.offer.findUnique({ where: { id }, select: { isPaused: true } });
  if (!offer) return;
  await prisma.offer.update({ where: { id }, data: { isPaused: !offer.isPaused } });
  revalidatePath("/admin/offers");
}

export async function deleteOffer(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  await prisma.offer.delete({ where: { id } });
  revalidatePath("/admin/offers");
}
