import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Kart" };

export default function KartPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // CARD</p>
      <h1 className="text-3xl font-semibold tracking-tight">Kart</h1>
      <p className="text-sm text-muted-foreground">Kart bileseni baslik, icerik ve alt bilgi icin cift cerceveli yuzey sunar.</p>
      <p className="text-sm text-muted-foreground">Bilet ozeti ve panel yerlesimleri icin hazir bolumler icerir.</p>
      <CodeBox code="npx bigbullui add card" />
      <CodeBox block code={`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";\n\n<Card><CardHeader><CardTitle>Konser</CardTitle></CardHeader><CardContent>20:00 Kapilar</CardContent></Card>`} />
      <Link href="/docs/card" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Card icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
