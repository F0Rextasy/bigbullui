import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";

export const metadata = { title: "Keyboard shortcuts" };

const SITE_SHORTCUTS = [
  { action: "Search components and guides", keys: ["Ctrl", "K"] },
  { action: "Close dialog / palette", keys: ["Esc"] },
  { action: "Move in results", keys: ["↑", "↓"] },
  { action: "Open highlighted result", keys: ["Enter"] },
];

export default function ShortcutsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Docs</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Keyboard shortcuts</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every interactive surface is keyboard reachable. These work anywhere on the site.
        </p>
        <div className="mt-6">
          <KeyboardShortcuts shortcuts={SITE_SHORTCUTS} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
