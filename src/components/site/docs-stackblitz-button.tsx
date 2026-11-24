"use client";

import * as React from "react";

export type StackBlitzFile = {
  path: string;
  code: string;
};

const BASE_CSS = `@import "tailwindcss";
:root {
  --background: #f6f0e0;
  --foreground: #17130c;
  --card: #fffdf5;
  --card-foreground: #17130c;
  --primary: #17130c;
  --primary-foreground: #fffdf5;
  --secondary: #ece3cc;
  --secondary-foreground: #17130c;
  --muted: #ece3cc;
  --muted-foreground: #5f5340;
  --accent: #b53524;
  --accent-strong: #9f2d1e;
  --accent-foreground: #fffdf5;
  --destructive: #c42828;
  --destructive-foreground: #ffffff;
  --border: #8c7a5b;
  --input: #8c7a5b;
  --ring: #b53524;
  --radius: 0.5rem;
}
body { background: var(--background); color: var(--foreground); font-family: system-ui, sans-serif; padding: 2rem; }`;

export function DocsStackBlitzButton({
  name,
  files = [],
  usage,
}: {
  name: string;
  files?: StackBlitzFile[];
  usage?: string;
}) {
  const handleOpen = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://stackblitz.com/run";
    form.target = "_blank";

    const addField = (fieldName: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = fieldName;
      input.value = value;
      form.appendChild(input);
    };

    const projectFiles: Record<string, string> = {
      "package.json": JSON.stringify(
        {
          name: `bigbullui-${name}-demo`,
          version: "0.0.0",
          private: true,
          dependencies: {
            react: "^19.0.0",
            "react-dom": "^19.0.0",
          },
          devDependencies: {
            "@types/react": "^19.0.0",
            "@types/react-dom": "^19.0.0",
            typescript: "^5.7.0",
          },
        },
        null,
        2
      ),
      "public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>bigbullui - ${name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
      "src/index.css": BASE_CSS,
      "src/index.tsx": `import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root");
if (rootEl) createRoot(rootEl).render(<App />);
`,
      "src/App.tsx": `import * as React from "react";
${(usage ?? `import { Button } from "./components/ui/${name}";`).replace(/@\/components\/ui\//g, "./components/ui/")}

export default function App() {
  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="font-mono text-sm font-bold uppercase tracking-wider">${name}</h1>
      <div className="rounded-lg border border-dashed p-6 bg-white/80">
        <p className="text-xs text-stone-600 mb-3">Ready-to-edit ${name} sandbox (zero third-party runtime deps).</p>
      </div>
    </main>
  );
}
`,
    };

    for (const f of files) {
      const cleanPath = f.path.startsWith("src/") ? f.path : `src/components/ui/${f.path}`;
      projectFiles[cleanPath] = f.code;
    }

    addField("project[template]", "create-react-app");
    addField("project[title]", `bigbullui — ${name}`);
    addField("project[description]", `Zero-dependency ${name} sandbox exported from ui.bigbullapp.com`);
    for (const [filePath, fileContent] of Object.entries(projectFiles)) {
      addField(`project[files][${filePath}]`, fileContent);
    }

    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Open in StackBlitz ↗
    </button>
  );
}
