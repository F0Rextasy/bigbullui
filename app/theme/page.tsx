import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeStudio } from "@/components/site/theme-studio";

export const metadata = { title: "Theme Studio" };

export default function ThemePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <header className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">BIGBULLUI // THEME STUDIO</p>
          <h1 className="font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Stamp your own theme</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pick a preset or dial in your own paper, ink, and stamp red. Preview live, then copy the CSS variables into your project.
          </p>
        </header>
        <ThemeStudio />
      </main>
      <SiteFooter />
    </div>
  );
}
