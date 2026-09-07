# bigbullui Snippets

Instant JSX shortcuts for the bigbullui ticket stub library.

## Prefix table

| Prefix | Output |
|---|---|
| `bb-button` | Button with default admit label |
| `bb-ticket` | TicketCard with event stub props |
| `bb-card` | Card shell with header and content |
| `bb-badge` | Badge micro pill |
| `bb-pricing` | PricingTable with annual default |

## Usage

1. Install the `bigbullui-tools` extension from the Marketplace.
2. Open any `.tsx` file.
3. Type a prefix such as `bb-button` and press Tab.
4. Imports are added automatically when `editor-insert` is enabled.

## Zero dependency rule

Snippets emit imports from `@/components/ui/*` only. No third party imports are ever generated.
