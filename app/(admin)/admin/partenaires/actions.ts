"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function createPartner(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const city = formData.get("city") as string;
  const slugInput = formData.get("slug") as string;
  const slug = slugInput?.trim() || slugify(`${name}-${city}`);

  const partner = await prisma.partner.create({
    data: {
      name,
      slug,
      description,
      category,
      city,
      address: (formData.get("address") as string) || null,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      website: (formData.get("website") as string) || null,
      coverImageUrl: (formData.get("coverImageUrl") as string) || null,
      isVerified: formData.get("isVerified") === "on",
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/partenaires");
  redirect(`/admin/partenaires/${partner.id}`);
}

export async function updatePartner(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.partner.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      city: formData.get("city") as string,
      address: (formData.get("address") as string) || null,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      website: (formData.get("website") as string) || null,
      coverImageUrl: (formData.get("coverImageUrl") as string) || null,
      isVerified: formData.get("isVerified") === "on",
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/partenaires");
  revalidatePath(`/admin/partenaires/${id}`);
}
