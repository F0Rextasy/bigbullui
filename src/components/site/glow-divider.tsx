import { cn } from "@/components/ui/lib/utils";

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-[linear-gradient(90deg,var(--border)_38%,#6b8aff_50%,var(--border)_62%)]",
        className
      )}
    />
  );
}
