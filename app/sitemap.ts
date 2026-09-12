import type { MetadataRoute } from "next";
import { statSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { NAV_ICON_NAMES } from "@/components/site/icon-data";

function mtime(rel: string): Date {
  try {
    return statSync(join(process.cwd(), rel)).mtime;
  } catch {
    return new Date();
  }
}

function blockSlugs(): string[] {
  try {
    return readdirSync(join(process.cwd(), "src", "components", "blocks"))
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => f.replace(/\.tsx$/, ""));
  } catch {
    return [];
  }
}
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://ui.bigbullapp.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/docs/installation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/contributing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/docs/agents`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/theme`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/icons`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/create`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/benchmarks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/dep-graph`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/docs/shortcuts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/docs/migrate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/docs/recipes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/docs/changelog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/docs/faq`,
      lastModified: mtime("app/docs/faq/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const blockRoutes: MetadataRoute.Sitemap = blockSlugs().map((slug) => ({
    url: `${siteUrl}/blocks/${slug}`,
    lastModified: mtime(`src/components/blocks/${slug}.tsx`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const componentRoutes: MetadataRoute.Sitemap = components.map((comp) => ({
    url: `${siteUrl}/docs/${comp.name}`,
    lastModified: mtime(`src/components/ui/${comp.name}.tsx`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const iconRoutes: MetadataRoute.Sitemap = NAV_ICON_NAMES.map((name) => ({
    url: `${siteUrl}/icons/${name}`,
    lastModified: mtime("src/components/site/icon-data.tsx"),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...componentRoutes, ...iconRoutes, ...blockRoutes];
}
