"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { Role } from "@/lib/enums";

const OfferSchema = z.object({
  partnerId: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(2),
  tags: z.string().optional(),
  normalPrice: z.coerce.number().positive(),
  reducedPrice: z.coerce.number().positive(),
  imageUrl: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  isPaused: z.coerce.boolean().optional(),
});

function normalizeTags(s?: string) {
  if (!s) return "";
  return s.split(",").map((t) => t.trim()).filter(Boolean).join(",");
}

export async function createOffer(formData: FormData) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");
  const data = OfferSchema.parse(Object.fromEntries(formData));
  await prisma.offer.create({
    data: {
      partnerId: data.partnerId,
      name: data.name,
      description: data.description,
      tags: normalizeTags(data.tags),
      normalPrice: data.normalPrice,
      reducedPrice: data.reducedPrice,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive !== false,
      isPaused: !!data.isPaused,
    },
  });
  revalidatePath("/admin/offers");
}

export async function updateOffer(id: string, formData: FormData) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");
  const data = OfferSchema.parse(Object.fromEntries(formData));
  await prisma.offer.update({
    where: { id },
    data: {
      ...data,
      tags: normalizeTags(data.tags),
      imageUrl: data.imageUrl || null,
      isActive: data.isActive !== false,
      isPaused: !!data.isPaused,
    },
  });
  revalidatePath("/admin/offers");
}

export async function toggleOfferPaused(id: string) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");
  const offer = await prisma.offer.findUnique({ where: { id }, select: { isPaused: true } });
  if (!offer) return;
  await prisma.offer.update({ where: { id }, data: { isPaused: !offer.isPaused } });
  revalidatePath("/admin/offers");
}

export async function deleteOffer(id: string) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");
  await prisma.offer.delete({ where: { id } });
  revalidatePath("/admin/offers");
}
