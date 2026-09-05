import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ui.bigbullapp.com/sitemap.xml",
    host: "https://ui.bigbullapp.com",
  };
}
