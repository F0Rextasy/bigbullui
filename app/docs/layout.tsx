import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { DocSidebar } from "@/components/site/doc-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <GlowDivider />
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <aside className="hidden w-52 shrink-0 md:block">
          <DocSidebar />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
