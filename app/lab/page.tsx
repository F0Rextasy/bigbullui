import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { cn } from "@/components/ui/lib/utils";
import { directionsA, type Direction } from "@/components/lab/directions-a";
import { directionsB } from "@/components/lab/directions-b";

export const metadata = { title: "Design Lab" };

const all: Direction[] = [...directionsA, ...directionsB];

function Tile({ direction }: { direction: Direction }) {
  const Button = direction.Button;
  const Card = direction.Card;
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <header className="flex items-baseline gap-3 border-b border-border px-5 py-4">
        <span className="font-mono text-sm font-bold text-accent-strong">{direction.no}</span>
        <h2 className="font-semibold">{direction.name}</h2>
        <p className="ml-auto text-right text-xs text-muted-foreground">{direction.tagline}</p>
      </header>
      <div className={cn("flex min-h-28 items-center justify-center p-6", direction.stageClassName)}>
        <Button />
      </div>
      <div className={cn("border-t border-border p-6", direction.stageClassName)}>
        <Card />
      </div>
    </section>
  );
}

export default function LabPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <GlowDivider />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Design Lab</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          10 özgün yön, her biri button + card ile canlı. Beğendiğinin{" "}
          <span className="font-mono text-sm text-foreground">numarasını söyle</span> — onu tüm
          kütüphaneye yayalım.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {all.map((direction) => (
            <Tile key={direction.id} direction={direction} />
          ))}
        </div>
      </main>
    </div>
  );
}
