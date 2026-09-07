import Link from "next/link";
import { CompareHelper } from "@/components/site/compare-helper";

export const metadata = { title: "Compare Components" };

const PAIRS = [
  {
    id: "table-vs-data-table",
    titleA: "Table",
    valuesA: ["Static rows", "No sorting", "Light markup", "Invoices"],
    titleB: "Data Table",
    valuesB: ["Sortable columns", "Search filter", "Pagination", "Ops dashboards"],
    rows: ["Sorting", "Search", "Pagination", "Best for"],
    note: "Use Table for printed receipts. Use Data Table when operators sort and filter live rows.",
    links: [
      { href: "/docs/table", label: "Table" },
      { href: "/docs/data-table", label: "Data Table" },
    ],
  },
  {
    id: "dialog-vs-sheet",
    titleA: "Dialog",
    valuesA: ["Centered modal", "Focus trap", "Short forms", "Confirmations"],
    titleB: "Sheet",
    valuesB: ["Side drawer", "Focus trap", "Long forms", "Cart detail"],
    rows: ["Placement", "Focus", "Length", "Best for"],
    note: "Use Dialog for quick confirms. Use Sheet for multi field editing without losing context.",
    links: [
      { href: "/docs/dialog", label: "Dialog" },
      { href: "/docs/sheet", label: "Sheet" },
    ],
  },
  {
    id: "stat-tile-vs-kpi-strip",
    titleA: "Stat Tile",
    valuesA: ["Single metric", "Hero number", "Compact", "Headers"],
    titleB: "KPI Strip",
    valuesB: ["Four tiles", "Grid row", "Full summary", "Dashboards"],
    rows: ["Scope", "Placement", "Density", "Best for"],
    note: "Use Stat Tile for one hero number. Use KPI Strip for the full nightly summary.",
    links: [
      { href: "/docs/stat-tile", label: "Stat Tile" },
      { href: "/docs/kpi-strip", label: "KPI Strip" },
    ],
  },
];

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-dashed border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Compare components</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Side by side picks for similar stubs: table versus data table, dialog versus sheet, and metric tiles.
        </p>
      </div>
      <div className="space-y-6">
        {PAIRS.map((p) => (
          <section key={p.id} aria-label={p.id} className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border sm:p-6">
            <CompareHelper titleA={p.titleA} valuesA={p.valuesA} titleB={p.titleB} valuesB={p.valuesB} rows={p.rows} note={p.note} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {l.label} &rarr;
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
