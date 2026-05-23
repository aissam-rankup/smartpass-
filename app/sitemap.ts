import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/partenaires`, lastModified: now, priority: 0.9 },
    { url: `${base}/smart-pass`, lastModified: now, priority: 0.9 },
    { url: `${base}/about`, lastModified: now, priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, priority: 0.5 },
  ];
}
