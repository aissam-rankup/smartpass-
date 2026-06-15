import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://smartpass.ma";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/partner",
          "/partner/*",
          "/dashboard",
          "/dashboard/*",
          "/qr",
          "/qr/*",
          "/scan",
          "/scan/*",
          "/after-login",
          "/login",
        ],
      },
      // Block AI crawlers from training on the app — keep search-bots allowed
      { userAgent: ["GPTBot", "ChatGPT-User", "anthropic-ai", "Claude-Web", "CCBot"], disallow: "/" },
    ],
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
