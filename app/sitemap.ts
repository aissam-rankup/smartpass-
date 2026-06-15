import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";
  const now = new Date();

  // Load active partners for dynamic URLs
  let partnerEntries: MetadataRoute.Sitemap = [];
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    partnerEntries = partners.map((p) => ({
      url: `${base}/partenaires/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If DB unavailable, sitemap still works with the static routes below
    partnerEntries = [];
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`,            lastModified: now, changeFrequency: "daily",  priority: 1.0 },
    { url: `${base}/smart-pass`,  lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/partenaires`, lastModified: now, changeFrequency: "daily",  priority: 0.9 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  return [...staticPages, ...partnerEntries];
}
