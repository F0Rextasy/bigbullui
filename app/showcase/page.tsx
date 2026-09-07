import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { NavIcon } from "@/components/site/nav-icons";
import showcase from "@/data/showcase.json";

export const metadata = { title: "Showcase" };

type ShowcaseEntry = {
  id: string;
  title: string;
  description: string;
  components: string[];
  author: string;
};

const entries = showcase.entries as ShowcaseEntry[];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Community builds</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Showcase</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          We support open source. The projects below use the bigbullui package in real open-source
          repositories. Using bigbullui in your open-source project but not listed here? Open an
          issue and we will add you.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="https://github.com/F0Rextasy/bigbullui/issues/new?template=showcase.yml" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <NavIcon name="ticket" size={13} /> Submit your site
          </a>
          <a href="https://github.com/F0Rextasy/bigbullui/blob/main/.github/PULL_REQUEST_TEMPLATE/showcase.md" target="_blank" rel="noreferrer" className="rounded-md border border-dashed border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            PR checklist
          </a>
        </div>
        {entries.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {entries.map((entry) => (
              <article key={entry.id} className="rounded-lg border-2 border-foreground bg-card p-4 shadow-md outline-1 outline-dashed outline-offset-[-5px] outline-border">
                <h2 className="font-mono text-sm font-black uppercase">{entry.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {entry.components.map((c) => (
                    <Link key={c} href={`/docs/${c}`} className="rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground">
                      {c}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">By {entry.author}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
            <NavIcon name="stub" size={28} className="mx-auto text-muted-foreground" />
            <p className="mt-3 font-mono text-sm font-bold uppercase">No community projects listed yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Be the first. Ship something with bigbullui, open an issue with your link, and take
              this spot.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
