import * as React from "react";
import { notFound } from "next/navigation";
import { components } from "@/lib/registry-site";
import { IsolatedPreviewShell } from "@/components/site/isolated-preview-shell";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((c) => c.name === slug);
  return buildMetadata({
    title: meta ? `${meta.title} Preview` : "Component Preview",
    description: meta?.description ?? "Isolated live preview canvas for a bigbullui component.",
    path: `/preview/${slug}`,
  });
}

export default async function PreviewSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((c) => c.name === slug);
  if (!meta) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">{meta.title} live preview</h1>
      <React.Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center p-6 font-mono text-xs text-muted-foreground">
            Loading preview...
          </div>
        }
      >
        <IsolatedPreviewShell name={meta.name} />
      </React.Suspense>
    </main>
  );
}
