import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const need = createRequire(import.meta.url);
const esbuild = need("esbuild");
const React = need("react");
const { renderToString } = need("react-dom/server");

const tmpDir = path.join(rootDir, ".tmp-component-tests");

function compileUi(slug) {
  return compileModule(path.join(rootDir, "src", "components", "ui", `${slug}.tsx`), `${slug}.cjs`);
}

function compileLib(slug) {
  return compileModule(path.join(rootDir, "src", "components", "ui", "lib", `${slug}.ts`), `lib-${slug}.cjs`);
}

function compileModule(entryPath, outName) {
  const outfile = path.join(tmpDir, outName);
  esbuild.buildSync({
    entryPoints: [entryPath],
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

  it("isSafeUrl blocks unsafe protocols and preserves relative and https links", () => {
    const { isSafeUrl } = compileLib("utils");
    assert.equal(isSafeUrl("https://ui.bigbullapp.com"), true);
    assert.equal(isSafeUrl("/docs/button"), true);
    assert.equal(isSafeUrl("mailto:hi@bigbullapp.com"), true);
    assert.equal(isSafeUrl("javascript:alert(1)"), false);
    assert.equal(isSafeUrl("vbscript:msgbox(1)"), false);
    assert.equal(isSafeUrl("data:text/html,<script>alert(1)</script>"), false);
  });

  it("Button defaults to type=button, merges className, and supports asChild", () => {
    const { Button } = compileUi("button");
    const html = renderToString(React.createElement(Button, { variant: "destructive", className: "custom-cls" }, "Delete"));
    assert.match(html, /type="button"/);
    assert.match(html, /custom-cls/);
    assert.match(html, /bg-destructive/);
    const linkHtml = renderToString(
      React.createElement(Button, { asChild: true }, React.createElement("a", { href: "/docs" }, "Read Docs"))
    );
    assert.match(linkHtml, /<a[^>]+href="\/docs"/);
    assert.doesNotMatch(linkHtml, /<button/);
  });

  it("LoadingButton disables button and shows loadingText while loading", () => {
    const { LoadingButton } = compileUi("loading-button");
    const html = renderToString(React.createElement(LoadingButton, { loading: true, loadingText: "Saving..." }, "Save"));
    assert.match(html, /disabled=""/);
    assert.match(html, /Saving\.\.\./);
  });

  it("CopyButton renders explicit type=button and accessible copy label", () => {
    const { CopyButton } = compileUi("copy-button");
    const html = renderToString(React.createElement(CopyButton, { value: "npx bigbullui add button", className: "copy-marker" }));
    assert.match(html, /type="button"/);
    assert.match(html, /aria-label="Copy to clipboard"/);
    assert.match(html, /copy-marker/);
  });

  it("PinInput reflects controlled value and disabled state across cells", () => {
    const { PinInput } = compileUi("pin-input");
    const html = renderToString(React.createElement(PinInput, { length: 4, value: "19", disabled: true }));
    const valueAttrs = [...html.matchAll(/value="([^"]*)"/g)].map((m) => m[1]);
    assert.deepEqual(valueAttrs, ["1", "9", "", ""]);
    const disabledMatches = html.match(/disabled=""/g) ?? [];
    assert.equal(disabledMatches.length, 4);
  });

  it("Tabs links triggers to tabpanels via ARIA attributes and keeps disabled state", () => {
    const { Tabs, TabsList, TabsTrigger, TabsContent } = compileUi("tabs");
    const html = renderToString(
      React.createElement(
        Tabs,
        { defaultValue: "a" },
        React.createElement(
          TabsList,
          null,
          React.createElement(TabsTrigger, { value: "a" }, "Tab A"),
          React.createElement(TabsTrigger, { value: "b", disabled: true }, "Tab B")
        ),
        React.createElement(TabsContent, { value: "a" }, "Panel A")
      )
    );
    assert.match(html, /role="tablist"/);
    assert.match(html, /role="tab"[^>]*aria-selected="true"/);
    assert.match(html, /disabled=""[^>]*>Tab B/);
    assert.match(html, /role="tabpanel"/);
    assert.match(html, /Panel A/);
  });

  it("Slider renders range input with min, max, step, value, and disabled props", () => {
    const { Slider } = compileUi("slider");
    const html = renderToString(
      React.createElement(Slider, { value: 40, min: 10, max: 90, step: 5, disabled: true, "aria-label": "Volume" })
    );
    assert.match(html, /type="range"/);
    assert.match(html, /min="10"/);
    assert.match(html, /max="90"/);
    assert.match(html, /step="5"/);
    assert.match(html, /value="40"/);
    assert.match(html, /disabled=""/);
  });

  it("Accordion supports multiple simultaneous open panels with aria-controls linkage", () => {
    const { Accordion, AccordionItem, AccordionTrigger, AccordionContent } = compileUi("accordion");
    const html = renderToString(
      React.createElement(
        Accordion,
        { type: "multiple", defaultValue: ["q1", "q2"] },
        React.createElement(
          AccordionItem,
          { value: "q1" },
          React.createElement(AccordionTrigger, null, "First"),
          React.createElement(AccordionContent, null, "Answer 1")
        ),
        React.createElement(
          AccordionItem,
          { value: "q2" },
          React.createElement(AccordionTrigger, null, "Second"),
          React.createElement(AccordionContent, null, "Answer 2")
        )
      )
    );
    assert.equal((html.match(/aria-expanded="true"/g) ?? []).length, 2);
    assert.match(html, /Answer 1/);
    assert.match(html, /Answer 2/);
  });

  it("Pagination disables boundary navigation buttons at start and end pages", () => {
    const { Pagination } = compileUi("pagination");
    const firstHtml = renderToString(React.createElement(Pagination, { page: 1, totalPages: 5, onPageChange: () => {} }));
    assert.match(firstHtml, /disabled=""[^>]*aria-label="Previous page"|aria-label="Previous page"[^>]*disabled=""/);
    const lastHtml = renderToString(React.createElement(Pagination, { page: 5, totalPages: 5, onPageChange: () => {} }));
    assert.match(lastHtml, /disabled=""[^>]*aria-label="Next page"|aria-label="Next page"[^>]*disabled=""/);
  });

  it("Progress renders 0% accurately and clamps overflowing values", () => {
    const { Progress } = compileUi("progress");
    const zeroHtml = renderToString(React.createElement(Progress, { value: 0, max: 100 }));
    assert.match(zeroHtml, /aria-valuenow="0"/);
    assert.match(zeroHtml, /width:0%/);
    const overHtml = renderToString(React.createElement(Progress, { value: 150, max: 100 }));
    assert.match(overHtml, /aria-valuenow="100"/);
  });

  it("Toast throws cleanly outside ToastProvider and renders safely inside", () => {
    const { ToastProvider, useToast } = compileUi("toast");
    function BadCaller() {
      useToast();
      return null;
    }
    assert.throws(() => renderToString(React.createElement(BadCaller)), /ToastProvider/);
    const okHtml = renderToString(React.createElement(ToastProvider, null, React.createElement("span", null, "Safe")));
    assert.match(okHtml, /Safe/);
  });

  it("Select renders listbox trigger semantics, uncontrolled defaultValue, selected label, and disabled state", () => {
    const { Select } = compileUi("select");
    const controlledHtml = renderToString(
      React.createElement(Select, {
        options: [
          { value: "std", label: "General" },
          { value: "vip", label: "VIP Pass" },
        ],
        value: "vip",
        disabled: true,
      })
    );
    assert.match(controlledHtml, /aria-haspopup="listbox"/);
    assert.match(controlledHtml, /aria-expanded="false"/);
    assert.match(controlledHtml, /disabled=""/);
    assert.match(controlledHtml, /VIP Pass/);

    const uncontrolledHtml = renderToString(
      React.createElement(Select, {
        options: [
          { value: "std", label: "General" },
          { value: "vip", label: "VIP Pass" },
        ],
        defaultValue: "std",
      })
    );
    assert.match(uncontrolledHtml, /General/);
  });

  it("NumberInput clamps out-of-range values and renders currency prefix", () => {
    const { NumberInput } = compileUi("number-input");
    const html = renderToString(React.createElement(NumberInput, { value: 250, min: 0, max: 100, currency: "$" }));
    assert.match(html, /value="100"/);
    assert.match(html, />\$</);
  });

  it("DataTable displays falsy numeric 0 and boolean false cell values", () => {
    const { DataTable } = compileUi("data-table");
    const html = renderToString(
      React.createElement(DataTable, {
        columns: [
          { key: "name", header: "Name" },
          { key: "count", header: "Count" },
          { key: "active", header: "Active" },
        ],
        data: [{ id: "1", name: "Gate A", count: 0, active: false }],
      })
    );
    assert.match(html, /Gate A/);
    assert.match(html, />0<\/td>/);
    assert.match(html, />false<\/td>/);
  });

  it("AvatarGroup, Carousel, OrgChart, and SankeyChart SSR safely with empty arrays", () => {
    const { AvatarGroup } = compileUi("avatar-group");
    const { Carousel } = compileUi("carousel");
    const { OrgChart } = compileUi("org-chart");
    const { SankeyChart } = compileUi("sankey-chart");
    assert.doesNotThrow(() => renderToString(React.createElement(AvatarGroup, { names: [] })));
    assert.doesNotThrow(() => renderToString(React.createElement(Carousel, { items: [] })));
    assert.doesNotThrow(() => renderToString(React.createElement(OrgChart, { root: [] })));
    assert.doesNotThrow(() => renderToString(React.createElement(SankeyChart, { nodes: [], flows: [] })));
  });

  it("bigbullicons TicketIcon sets conditional aria-hidden and tree-shakes under 2048 bytes", () => {
    const iconsEntry = path.join(rootDir, "packages", "icons", "dist", "index.mjs");
    if (!fs.existsSync(iconsEntry)) {
      execFileSync(process.execPath, [path.join(rootDir, "scripts", "generate-icon-components.mjs")], {
        cwd: rootDir,
        encoding: "utf8",
      });
      const npmCmd = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
      const npmArgs = process.platform === "win32" ? ["/d", "/s", "/c", "npm --prefix packages/icons run build"] : ["--prefix", "packages/icons", "run", "build"];
      execFileSync(npmCmd, npmArgs, { cwd: rootDir, encoding: "utf8" });
    }
    const bundle = esbuild.buildSync({
      stdin: {
        contents: `import { TicketIcon } from "./packages/icons/dist/index.mjs"; export { TicketIcon };`,
        resolveDir: rootDir,
        loader: "js",
      },
      bundle: true,
      minify: true,
      format: "esm",
      external: ["react", "react-dom", "react/*"],
      write: false,
    });
    const out = bundle.outputFiles[0].contents;
    assert.ok(out.length < 2048, `Expected single named icon bundle < 2048 bytes, got ${out.length}`);

    const namedIconsOut = path.join(tmpDir, "named-icons.cjs");
    esbuild.buildSync({
      entryPoints: [path.join(rootDir, "packages", "icons", "src", "named-icons.tsx")],
      outfile: namedIconsOut,
      bundle: false,
      platform: "node",
      format: "cjs",
      jsx: "automatic",
      logLevel: "silent",
    });
    const { TicketIcon } = need(namedIconsOut);
    const decoHtml = renderToString(React.createElement(TicketIcon, {}));
    const labeledHtml = renderToString(React.createElement(TicketIcon, { "aria-label": "Event ticket" }));
    assert.match(decoHtml, /aria-hidden="true"/);
    assert.match(labeledHtml, /aria-label="Event ticket"/);
    assert.doesNotMatch(labeledHtml, /aria-hidden="true"/);
  });
});
