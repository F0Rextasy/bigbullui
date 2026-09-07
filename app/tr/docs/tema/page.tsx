import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Tema" };

export default function TemaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TEMA</p>
      <h1 className="text-3xl font-semibold tracking-tight">Tema ve Dark Stub</h1>
      <p className="text-sm text-muted-foreground">Token dosyasini iceri aktarin ve html uzerinde dark class ile gece gorunumune gecin.</p>
      <CodeBox code="@import &quot;tailwindcss&quot;;\n@import &quot;bigbullui/css&quot;;" block />
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline">TR docs &rarr;</Link>
    </main>
  );
}
