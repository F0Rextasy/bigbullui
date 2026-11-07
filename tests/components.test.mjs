import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const need = createRequire(import.meta.url);
const esbuild = need("esbuild");
const React = need("react");
const { renderToString } = need("react-dom/server");

const tmpDir = path.join(rootDir, ".tmp-component-tests");

function compileUi(slug) {
  const outfile = path.join(tmpDir, `${slug}.cjs`);
  esbuild.buildSync({
    entryPoints: [path.join(rootDir, "src", "components", "ui", `${slug}.tsx`)],
    outfile,
    bundle: true,
    platform: "node",
    format: "cjs",
    external: ["react", "react-dom"],
    jsx: "automatic",
    logLevel: "silent",
  });
  return need(outfile);
}

describe("bigbullui Behavioral Component Tests", () => {
  before(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("MarkdownPreview blocks unsafe javascript:/data: URLs and renders semantic h1-h4 headings", () => {
    const { MarkdownPreview } = compileUi("markdown-preview");
    const html = renderToString(
      React.createElement(MarkdownPreview, {
        source: [
          "# Main Title",
          "## Section Title",
          "### Subsection",
          "#### Minor Heading",
          "[Safe Link](https://ui.bigbullapp.com) and [Evil](javascript:alert(1)) and [Data](data:text/html,<script>)",
        ].join("\n"),
      })
    );
    assert.match(html, /<h1[^>]*>Main Title<\/h1>/);
    assert.match(html, /<h2[^>]*>Section Title<\/h2>/);
    assert.match(html, /<h3[^>]*>Subsection<\/h3>/);
    assert.match(html, /<h4[^>]*>Minor Heading<\/h4>/);
    assert.match(html, /<a[^>]+href="https:\/\/ui\.bigbullapp\.com"[^>]*>Safe Link<\/a>/);
    assert.doesNotMatch(html, /javascript:/i);
    assert.doesNotMatch(html, /data:text\/html/i);
    assert.match(html, /<span>Evil<\/span>/);
  });

  it("AlertDialog wires the destructive prop to the confirm action button", () => {
    const { AlertDialog } = compileUi("alert-dialog");
    const normalHtml = renderToString(
      React.createElement(AlertDialog, {
        open: true,
        onOpenChange: () => {},
        title: "Confirm",
        destructive: false,
      })
    );
    const destructiveHtml = renderToString(
      React.createElement(AlertDialog, {
        open: true,
        onOpenChange: () => {},
        title: "Delete",
        destructive: true,
      })
    );
    assert.match(normalHtml, /bg-primary/);
    assert.doesNotMatch(normalHtml, /bg-destructive/);
    assert.match(destructiveHtml, /bg-destructive/);
  });

  it("Popover renders non-modal dialog content when open", () => {
    const { Popover, PopoverContent } = compileUi("popover");
    const html = renderToString(
      React.createElement(
        Popover,
        { defaultOpen: true },
        React.createElement(PopoverContent, null, "Popover Body")
      )
    );
    assert.match(html, /Popover Body/);
    assert.doesNotMatch(html, /aria-modal="true"/);
  });

  it("Avatar computes initials and handles empty props without crashing", () => {
    const { Avatar } = compileUi("avatar");
    const emptyHtml = renderToString(React.createElement(Avatar, {}));
    assert.ok(emptyHtml.includes('role="img"'));
    const namedHtml = renderToString(React.createElement(Avatar, { name: "Big Bull" }));
    assert.match(namedHtml, />BB<\/span>/);
  });

  it("TabsContent returns null safely when rendered outside Tabs context", () => {
    const { TabsContent } = compileUi("tabs");
    const html = renderToString(React.createElement(TabsContent, { value: "tab1" }, "Orphan"));
    assert.equal(html, "");
  });
});
