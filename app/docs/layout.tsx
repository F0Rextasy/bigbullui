import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { DocSidebar } from "@/components/site/doc-sidebar";
import { MobileDocsBar } from "@/components/site/mobile-docs-bar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <GlowDivider />
      <MobileDocsBar />
      <div className="mx-auto flex max-w-6xl items-start gap-8 px-4 py-6 sm:px-6 md:py-10">
        <aside className="hidden w-64 shrink-0 md:sticky md:top-24 md:block md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
          <DocSidebar />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
