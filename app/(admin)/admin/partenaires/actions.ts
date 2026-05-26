"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { Role } from "@/lib/enums";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const PartnerSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().min(10),
  category: z.string().min(2),
  city: z.string().min(2),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  coverImageUrl: z.string().optional(),
  isVerified: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
});

export async function createPartner(formData: FormData) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");

  const data = PartnerSchema.parse(Object.fromEntries(formData));
  const slug = data.slug?.trim() || slugify(`${data.name}-${data.city}`);

  const partner = await prisma.partner.create({
    data: {
      ...data,
      slug,
      isVerified: !!data.isVerified,
      isActive: data.isActive !== false,
      email: data.email || null,
      website: data.website || null,
      address: data.address || null,
      phone: data.phone || null,
      coverImageUrl: data.coverImageUrl || null,
    },
  });

  revalidatePath("/admin/partenaires");
  redirect(`/admin/partenaires/${partner.id}`);
}

export async function updatePartner(id: string, formData: FormData) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");

  const data = PartnerSchema.parse(Object.fromEntries(formData));

  await prisma.partner.update({
    where: { id },
    data: {
      ...data,
      isVerified: !!data.isVerified,
      isActive: data.isActive !== false,
      email: data.email || null,
      website: data.website || null,
      address: data.address || null,
      phone: data.phone || null,
      coverImageUrl: data.coverImageUrl || null,
    },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${id}`);
}

export async function togglePartnerActive(id: string) {
  const role = await requireRole(Role.ADMIN);
  if (!role.ok) throw new Error("Forbidden");
  const partner = await prisma.partner.findUnique({ where: { id }, select: { isActive: true } });
  if (!partner) return;
  await prisma.partner.update({ where: { id }, data: { isActive: !partner.isActive } });
  revalidatePath("/admin/partenaires");
}
