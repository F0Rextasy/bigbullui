import { notFound } from "next/navigation";
import { BLOCK_SLUGS, slugTitle } from "@/lib/site-meta";
import { buildMetadata } from "@/lib/seo";
import { PreviewErrorBoundary } from "@/components/site/preview-error-boundary";

export function generateStaticParams() {
  return BLOCK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slugTitle(slug);
  return buildMetadata({
    title: `${title} Block Preview`,
    description: `Isolated responsive preview for the ${title} page block in bigbullui.`,
    path: `/preview/block/${slug}`,
  });
}

export default async function PreviewBlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();

  let Node: React.ComponentType | null = null;
  try {
    const mod = (await import(`@/components/blocks/${slug}`)) as Record<string, unknown>;
    const found = Object.values(mod).find((v) => typeof v === "function");
    if (typeof found === "function") Node = found as React.ComponentType;
  } catch {
    notFound();
  }
  if (!Node) notFound();
  const Render = Node as React.ComponentType;

  return (
    <main className="min-h-screen bg-background p-4 text-foreground sm:p-6">
      <h1 className="sr-only">{slugTitle(slug)} block preview</h1>
      <PreviewErrorBoundary resetKey={slug}>
        <Render />
      </PreviewErrorBoundary>
    </main>
  );
}
