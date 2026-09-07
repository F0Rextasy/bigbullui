import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { IconsGallery } from "@/components/site/icons-gallery";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Icon Set" };

export default function IconsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <header className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">BIGBULLUI // ICONS</p>
          <h1 className="font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Stamp icons</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Hand-drawn stroke icons in the Ticket Stub language. Zero dependencies, animated draw-in
            with reduced-motion fallback. Also published standalone as <code className="font-mono text-xs text-foreground">bigbullicons</code>.
          </p>
        </header>
        <div className="space-y-2">
          <CodeBox code="npm install bigbullicons" />
          <CodeBox block code={`import { StampIcon } from "bigbullicons";\n\n<StampIcon name="ticket" size={20} />`} />
        </div>
        <IconsGallery />
      </main>
      <SiteFooter />
    </div>
  );
}
