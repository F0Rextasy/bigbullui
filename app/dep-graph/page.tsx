import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import graph from "@/data/dep-graph.json";

export const metadata = { title: "Dependency graph" };

type Graph = { updated: string; blocks: Record<string, string[]> };

export default function DepGraphPage() {
  const data = graph as Graph;
  const entries = Object.entries(data.blocks);
  const counts = entries.map(([b, deps]) => ({ block: b, n: deps.length })).sort((a, b) => b.n - a.n);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Generated {data.updated}</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Dependency graph</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Which primitives each page block is composed from. Lean blocks, honest imports — the widest block pulls {counts[0]?.n ?? 0} components.
        </p>
        <ul className="mt-6 space-y-2">
          {counts.map(({ block, n }) => (
            <li key={block} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-black">{block}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{n} deps</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(data.blocks[block] || []).map((d) => (
                  <Link key={d} href={`/docs/${d}`} className="rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground">
                    {d}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
