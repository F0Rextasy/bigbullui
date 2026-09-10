import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = { title: "Migrate from shadcn" };

const ROWS: [string, string, string][] = [
  ["Install", "npx shadcn@latest init", "npx bigbullui init"],
  ["Add one piece", "npx shadcn@latest add button", "npx bigbullui add button"],
  ["Tokens", "CSS variables in :root", "@import \"bigbullui/css\" — same idea, Ticket Stub values"],
  ["Dark mode", ".dark class", ".dark class — identical mechanism"],
  ["Theming", "tweakcn / css override", "/theme studio or /create, copy CSS variables"],
  ["Registry", "shadcn registry JSON", "Compatible: npx shadcn@latest add https://ui.bigbullapp.com/r/button.json"],
  ["Ownership", "Copy-paste into your repo", "Same: files live in your repo, MIT"],
];

export default function MigratePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">10-minute switch</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Migrate from shadcn</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Same mental model, different aesthetic. Components are intentionally API-compatible where it matters
          (Button, Card, Dialog, Tabs, Toast), so migration is mostly class names and tokens — not rewrites.
        </p>
        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-foreground text-left font-mono text-[11px] uppercase">
              <th className="py-2 pr-4">Step</th>
              <th className="py-2 pr-4">shadcn</th>
              <th className="py-2">bigbullui</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([step, from, to]) => (
              <tr key={step} className="border-b border-dashed border-border align-top">
                <td className="py-2 pr-4 font-mono text-xs font-bold uppercase">{step}</td>
                <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{from}</td>
                <td className="py-2 font-mono text-xs">{to}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mt-8 font-mono text-sm font-black uppercase">Class-name notes</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Replace neutral palettes with semantic tokens (<code>bg-primary</code>, <code>text-muted-foreground</code>, <code>border-border</code>).</li>
          <li>Status colors map to <code>success</code> / <code>warning</code> / <code>info</code> / <code>destructive</code>.</li>
          <li>Spacing uses logical props (<code>ms-</code>, <code>me-</code>, <code>ps-</code>, <code>pe-</code>) — RTL flips for free.</li>
          <li>Pass <code>animated={`{false}`}</code> anywhere you need instant, motion-free rendering.</li>
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
