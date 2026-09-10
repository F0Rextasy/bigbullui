import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = { title: "Packages" };

const PACKAGES = [
  {
    name: "bigbullui",
    version: "npm i bigbullui",
    when: "Full library in one dependency. Import anything, tree-shaking drops the rest.",
    code: 'import { Button, Card, MetricCard } from "bigbullui";',
  },
  {
    name: "bigbullicons",
    version: "npm i bigbullicons",
    when: "Only the 1090 stroke icons, no components. Smallest footprint for icon-only use.",
    code: 'import { StampIcon } from "bigbullicons";\n\n<StampIcon name="ticket" size={20} />',
  },
  {
    name: "create-bigbull-app",
    version: "npx create-bigbull-app my-app",
    when: "Starting from zero: scaffolds Next.js + Tailwind v4 + bigbullui in one command.",
    code: "npx create-bigbull-app my-app\ncd my-app\nnpm run dev",
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">npm packages</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Packages</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Three packages, one system. Prefer copy-paste instead? Every file works standalone — see <a className="underline" href="/docs/installation">installation</a>.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PACKAGES.map((p) => (
            <article key={p.name} className="rounded-lg border-2 border-foreground bg-card p-4 shadow-md outline-1 outline-dashed outline-offset-[-5px] outline-border">
              <h2 className="font-mono text-sm font-black">{p.name}</h2>
              <p className="mt-1 rounded bg-secondary px-2 py-1 font-mono text-[11px]">{p.version}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.when}</p>
              <pre className="mt-2 overflow-x-auto rounded border border-dashed border-border bg-background p-2 font-mono text-[11px] leading-5">{p.code}</pre>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
