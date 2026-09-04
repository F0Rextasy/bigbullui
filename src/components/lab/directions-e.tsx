import { InkButton } from "./ink/ink-button";
import { InkCard } from "./ink/ink-card";
import type { Direction } from "./directions-a";

const livingInk: Direction = {
  id: "living-ink",
  no: "21",
  name: "Living Ink",
  tagline: "Color blooms where you touch",
  Button: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <InkButton>Hover me</InkButton>
      <InkButton variant="accent">Accent ink</InkButton>
      <InkButton size="lg">Large bloom</InkButton>
    </div>
  ),
  Card: () => (
    <InkCard className="w-full max-w-sm">
      <h3 className="text-lg font-semibold tracking-tight">Move your cursor across this card</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        The wash follows you with organic edges. Resize the window — the ink does not care.
      </p>
    </InkCard>
  ),
};

export const directionsE: Direction[] = [livingInk];
