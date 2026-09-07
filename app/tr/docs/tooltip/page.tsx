import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Ipucu" };

export default function TooltipPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TOOLTIP</p>
      <h1 className="text-3xl font-semibold tracking-tight">Ipucu</h1>
      <p className="text-sm text-muted-foreground">Hover ve odak ile acilan kucuk yardim balonu icin Tooltip kullanin. Ikon butonlari ve kisa aksiyonlari aciklamak icin idealdir.</p>
      <p className="text-sm text-muted-foreground">Klavye ile odaklaninca da acilir, erisilebilirlik icin ek is gerekmez.</p>
      <CodeBox code="npx bigbullui add tooltip" />
      <CodeBox code="import { Tooltip } from '@/components/ui/tooltip'; <Tooltip content='Detay'>Bilgi</Tooltip>" />
      <Link href="/docs/tooltip" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/tooltip.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
