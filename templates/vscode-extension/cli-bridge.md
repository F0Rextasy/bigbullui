# bigbullui CLI Bridge

Run the library CLI from inside the editor without opening a terminal.

## Commands

| Command id | Runs |
|---|---|
| `bigbullui.addComponent` | `npx bigbullui add <name>` |
| `bigbullui.initProject` | `npx bigbullui init` |
| `bigbullui.listComponents` | `npx bigbullui list` |

## Behavior

- Prompts for a component name with fuzzy pick from the local list.
- Runs the CLI in the workspace root with progress output.
- Shows a success notice with the added file path.
- Refreshes the visual sidebar after install completes.

## Offline fallback

When the network is unavailable, the bridge falls back to the bundled component list so insert and copy keep working.
