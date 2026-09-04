import { cn } from "@/components/ui/lib/utils";

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-[linear-gradient(90deg,var(--border)_38%,var(--color-accent-strong)_50%,var(--border)_62%)]",
        className
      )}
    />
  );
}
