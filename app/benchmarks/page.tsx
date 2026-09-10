import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import sizes from "@/data/sizes.json";

export const metadata = { title: "Bundle benchmarks" };

type Entry = { raw: number; gzip: number; kb: number };
const table = sizes as { updated: string; sizes: Record<string, Entry> };

export default function BenchmarksPage() {
  const rows = Object.entries(table.sizes)
    .map(([name, s]) => ({ name, raw: s.raw / 1024, gzip: s.gzip / 1024 }))
    .sort((a, b) => b.gzip - a.gzip);
  const totalGzip = rows.reduce((a, r) => a + r.gzip, 0);
  const totalRaw = rows.reduce((a, r) => a + r.raw, 0);
  const median = rows[Math.floor(rows.length / 2)].gzip;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Self-measured</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Bundle benchmarks</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every component measured from source with zlib, updated {table.updated}. Median component ships{" "}
          {median.toFixed(1)}kb gzipped; the full set is {totalGzip.toFixed(0)}kb gzipped — and tree-shaking means you only pay for what you import.
          Numbers below are ours, measured honestly; compare against any library by running the same one-liner on their dist.
        </p>
        <div className="mt-4 flex gap-6 font-mono text-xs">
          <span><strong className="text-base">{rows.length}</strong> components</span>
          <span><strong className="text-base">{median.toFixed(1)}kb</strong> median gzip</span>
          <span><strong className="text-base">{totalRaw.toFixed(0)}kb</strong> total raw</span>
        </div>
        <h2 className="mt-8 font-mono text-sm font-black uppercase">Heaviest 25 (gzip)</h2>
        <table className="mt-2 w-full border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b-2 border-foreground text-left uppercase">
              <th className="py-2 pr-4">Component</th>
              <th className="py-2 pr-4 text-right">Gzip</th>
              <th className="py-2 text-right">Raw</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 25).map((r) => (
              <tr key={r.name} className="border-b border-dashed border-border">
                <td className="py-1.5 pr-4"><a className="hover:underline" href={`/docs/${r.name}`}>{r.name}</a></td>
                <td className="py-1.5 pr-4 text-right tabular-nums">{r.gzip.toFixed(1)}kb</td>
                <td className="py-1.5 text-right tabular-nums text-muted-foreground">{r.raw.toFixed(1)}kb</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <SiteFooter />
    </div>
  );
}
