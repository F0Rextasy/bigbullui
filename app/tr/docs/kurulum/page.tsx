import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Kurulum" };

export default function KurulumPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // KURULUM</p>
      <h1 className="text-3xl font-semibold tracking-tight">Kurulum</h1>
      <p className="text-sm text-muted-foreground">CLI ile utils ve token kurulumu yapin, sonra ihtiyac olan bileseni ekleyin.</p>
      <CodeBox code="npx bigbullui init" />
      <CodeBox code="npx bigbullui add button card ticket-card" />
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline">TR docs &rarr;</Link>
    </main>
  );
}
