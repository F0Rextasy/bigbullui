import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Pencere" };

export default function PencerePage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // DIALOG</p>
      <h1 className="text-3xl font-semibold tracking-tight">Pencere</h1>
      <p className="text-sm text-muted-foreground">Pencere bileseni odak tuzakli erisilebilir form penceresi acar.</p>
      <p className="text-sm text-muted-foreground">Acik durum open ile yonetilir, Escape ile kapanir ve odagi geri verir.</p>
      <CodeBox code="npx bigbullui add dialog" />
      <CodeBox block code={`import { Dialog, DialogTitle } from "@/components/ui/dialog";\n\n<Dialog open={open} onOpenChange={setOpen}><DialogTitle>Bilet Al</DialogTitle></Dialog>`} />
      <Link href="/docs/dialog" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Dialog icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
