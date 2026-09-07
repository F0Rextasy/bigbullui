# bigbullui Editor Insert

One click JSX placement from the sidebar or command palette.

## Behavior

- Command id: `bigbullui.insertComponent`.
- Inserts the component import at the top of the active file if missing.
- Inserts minimal JSX at the cursor position.
- Respects existing import aliases for `@/components/ui/*`.

## Example

Placing `ticket-card` inserts:

```tsx
import { TicketCard } from "@/components/ui/ticket-card";

<TicketCard eventName="MAIN STAGE" status="valid" price="$45.00" />
```

## Safety

- Never overwrites selected text without confirmation.
- Skips files without a JSX or TSX language id.
- Logs every insert to the bigbullui output channel.
