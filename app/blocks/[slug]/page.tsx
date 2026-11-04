import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { CopyBlock } from "@/components/site/copy-block";
import { BLOCK_SLUGS, slugTitle } from "@/lib/site-meta";

// Generated from src/components/blocks (scripts/generate-registry-json.mjs):
// new blocks join prerender, sitemap and search automatically instead of
// silently missing from the static export.
export function generateStaticParams() {
  return BLOCK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slugTitle(slug);
  return { title: `${title}: Block` };
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();
  let Node: React.ComponentType | null = null;
  // Dynamic specifier: slug is runtime-selected per request; a static
  // 75-entry map would duplicate generateStaticParams above.
  try {
    const mod = (await import(`@/components/blocks/${slug}`)) as Record<string, unknown>;
    const found = Object.values(mod).find((v) => typeof v === "function");
    if (typeof found === "function") Node = found as React.ComponentType;
  } catch {
    notFound();
  }
  if (!Node) notFound();
  const Render = Node as React.ComponentType;
  const title = slugTitle(slug);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <Link href="/blocks" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
          ← All blocks
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <h1 className="font-mono text-2xl font-black uppercase">{title}</h1>
          <CopyBlock name={slug} />
        </div>
        <div className="mt-6">
          <Render />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
