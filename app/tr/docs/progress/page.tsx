import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Ilerleme" };

export default function ProgressPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // PROGRESS</p>
      <h1 className="text-3xl font-semibold tracking-tight">Ilerleme</h1>
      <p className="text-sm text-muted-foreground">Yukleme ve islem durumunu gosteren cizgili bar icin Ilerleme kullanin. Yuzde degeri ile guncellenir.</p>
      <p className="text-sm text-muted-foreground">Panel ve yukleme kuyruklarinda anlik geri bildirim saglar.</p>
      <CodeBox code="npx bigbullui add progress" />
      <CodeBox code="import { Progress } from '@/components/ui/progress'; <Progress value={40} />" />
      <Link href="/docs/progress" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/progress.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
