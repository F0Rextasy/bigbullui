import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Rozet" };

export default function RozetPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // BADGE</p>
      <h1 className="text-3xl font-semibold tracking-tight">Rozet</h1>
      <p className="text-sm text-muted-foreground">Rozet bileseni durum ve kategori icin mikro hap etiketi sunar.</p>
      <p className="text-sm text-muted-foreground">VIP, erken giris ve kontenjan gibi isaretler icin kullanin.</p>
      <CodeBox code="npx bigbullui add badge" />
      <CodeBox block code={`import { Badge } from "@/components/ui/badge";\n\n<Badge>VIP</Badge>`} />
      <Link href="/docs/badge" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Badge icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
