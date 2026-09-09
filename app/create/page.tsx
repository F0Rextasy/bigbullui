import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { BundleBuilder } from "@/components/site/bundle-builder";

export const metadata = { title: "Create your bundle" };

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Pick components, icons, theme
        </p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">Create</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Select the components and icons you need, choose a theme, then run one
          command. Only what you pick lands in your project — no lock-in.
        </p>
        <div className="mt-6">
          <BundleBuilder />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
