# bigbullui Visual Sidebar

Category browser for all library components inside VS Code and Cursor.

## Layout

- Left activity bar icon opens the bigbullui panel.
- Components are grouped by registry category: Form, Display, Feedback, Navigation, Blocks.
- Hovering a row shows a live preview card with title, description, and install command.

## Actions

- Click a component to preview docs in a webview.
- Use the Insert button to place the import and JSX into the active file.
- Use the Copy button to copy the CLI command `npx bigbullui add <name>`.

## Data source

The sidebar reads the same registry used by the docs site, so counts stay in sync with the live component total.
