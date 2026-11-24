import type { Metadata } from "next";

const SITE_URL = "https://ui.bigbullapp.com";

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = title ? `${title} | bigbullui` : "bigbullui: Animated React components you own";

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${normalizedPath}`,
      siteName: "bigbullui",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
