import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Giris Alani" };

export default function GirisAlaniPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // INPUT</p>
      <h1 className="text-3xl font-semibold tracking-tight">Giris Alani</h1>
      <p className="text-sm text-muted-foreground">Giris alani formlar icin kesik cizgili odak cerceveli metin kutusu sunar.</p>
      <p className="text-sm text-muted-foreground">Standart input ozelliklerini destekler, hizli kayit formu icin idealdir.</p>
      <CodeBox code="npx bigbullui add input" />
      <CodeBox block code={`import { Input } from "@/components/ui/input";\n\n<Input placeholder="Ad Soyad" />`} />
      <Link href="/docs/input" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Input icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
