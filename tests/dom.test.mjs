import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const need = createRequire(import.meta.url);

const { chromium } = need("playwright");
const esbuild = need("esbuild");

const HARNESS_TSX = `
import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./src/components/ui/dialog";
import { AlertDialog } from "./src/components/ui/alert-dialog";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "./src/components/ui/sheet";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerClose } from "./src/components/ui/drawer";
import { ConfirmDialog } from "./src/components/ui/confirm-dialog";
import { BottomSheet } from "./src/components/ui/bottom-sheet";
import { CartDrawer } from "./src/components/ui/cart-drawer";
import { DrawerNav } from "./src/components/ui/drawer-nav";
import { LoadingOverlay } from "./src/components/ui/loading-overlay";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./src/components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "./src/components/ui/popover";
import { Tooltip } from "./src/components/ui/tooltip";
import { CommandPalette } from "./src/components/ui/command-palette";
import { CountrySelect } from "./src/components/ui/country-select";
import { CurrencySelect } from "./src/components/ui/currency-select";
import { ColumnToggle } from "./src/components/ui/column-toggle";
import { Fab } from "./src/components/ui/fab";
import { DateRangePicker } from "./src/components/ui/date-range-picker";
import { Truncate } from "./src/components/ui/truncate";
import { AudioPlayer } from "./src/components/ui/audio-player";
import { FileInput } from "./src/components/ui/file-input";
import { TimeRangePicker } from "./src/components/ui/time-range-picker";
import { RichTextEditor } from "./src/components/ui/rich-text-editor";
import { AddToCartButton } from "./src/components/ui/add-to-cart-button";
import { OrgChart } from "./src/components/ui/org-chart";
import { PhoneInput } from "./src/components/ui/phone-input";
import { Meter } from "./src/components/ui/meter";
import { SignaturePad } from "./src/components/ui/signature-pad";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./src/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./src/components/ui/accordion";
import { Switch } from "./src/components/ui/switch";
import { Checkbox } from "./src/components/ui/checkbox";
import { Select } from "./src/components/ui/select";
import { Combobox } from "./src/components/ui/combobox";
import { RadioCards, RadioCard } from "./src/components/ui/radio-cards";
import { Pagination } from "./src/components/ui/pagination";
import { TagInput } from "./src/components/ui/tag-input";
import { TransferList } from "./src/components/ui/transfer-list";
import { TreeSelect } from "./src/components/ui/tree-select";
import { Autocomplete } from "./src/components/ui/autocomplete";
import { Playlist } from "./src/components/ui/playlist";
import { Calendar } from "./src/components/ui/calendar";
import { RangeCalendar } from "./src/components/ui/range-calendar";
import { SliderTicks } from "./src/components/ui/slider-ticks";

function OverlaysCase() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [nestedConfirmOpen, setNestedConfirmOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState("idle");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([{ id: "1", title: "VIP Pass", price: "€25.00", qty: 2 }]);
  const [navOpen, setNavOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <button type="button" onClick={() => setDialogOpen(true)}>Open Dialog</button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>Main Dialog</DialogTitle>
          <DialogDescription>Dialog body text</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button type="button" onClick={() => setNestedConfirmOpen(true)}>Open Nested</button>
          <button type="button" onClick={() => setDialogOpen(false)}>Confirm</button>
        </DialogFooter>
      </Dialog>

      <ConfirmDialog
        open={nestedConfirmOpen}
        onOpenChange={setNestedConfirmOpen}
        title="Confirm Nested"
        description="Are you sure?"
        onConfirm={() => setNestedConfirmOpen(false)}
        onCancel={() => setNestedConfirmOpen(false)}
      />

      <button type="button" onClick={() => setAlertOpen(true)}>Open Alert</button>
      <span data-testid="alert-status">{alertStatus}</span>
      <AlertDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="Delete Item"
        description="Permanent action"
        confirmLabel="Confirm Delete"
        onConfirm={() => { setAlertStatus("confirmed"); setAlertOpen(false); }}
        onCancel={() => { setAlertStatus("cancelled"); setAlertOpen(false); }}
      />

      <button type="button" onClick={() => setSheetOpen(true)}>Open Sheet</button>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetHeader>
          <SheetTitle>Side Panel</SheetTitle>
          <SheetDescription>Details here</SheetDescription>
        </SheetHeader>
        <button type="button" onClick={() => setSheetOpen(false)}>Done</button>
      </Sheet>

      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>Drawer content</DrawerBody>
          <DrawerClose>Close Drawer</DrawerClose>
        </DrawerContent>
      </Drawer>

      <BottomSheet title="Sheet Options" triggerLabel="Open Bottom Sheet">
        <button type="button">Bottom Option</button>
      </BottomSheet>

      <button type="button" onClick={() => setCartOpen(true)}>Open Cart</button>
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onQtyChange={(id, qty) => setCartItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)))}
        onRemove={(id) => setCartItems((prev) => prev.filter((it) => it.id !== id))}
      />

      <button type="button" onClick={() => setNavOpen(true)}>Open Nav</button>
      <DrawerNav
        open={navOpen}
        onOpenChange={setNavOpen}
        items={[{ id: "home", label: "Home Link", href: "#home" }]}
      />

      <button type="button" onClick={() => setLoading((v) => !v)}>Toggle Loading</button>
      <LoadingOverlay active={loading} label="Loading data" />
    </div>
  );
}

function MenusCase() {
  const [menuLog, setMenuLog] = React.useState("none");
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [cmdResult, setCmdResult] = React.useState("none");
  const [fabResult, setFabResult] = React.useState("none");

  return (
    <div style={{ padding: 24, display: "flex", flexWrap: "wrap", gap: 16 }}>
      <span data-testid="menu-log">{menuLog}</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button type="button">Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setMenuLog("edit")}>Edit Item</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMenuLog("delete")}>Delete Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger>
          <button type="button">Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover details</p>
        </PopoverContent>
      </Popover>

      <Tooltip delayMs={10} content="Helpful hint">
        <button type="button">Tip Target</button>
      </Tooltip>

      <button type="button" onClick={() => setCmdOpen(true)}>Open Palette</button>
      <span data-testid="cmd-result">{cmdResult}</span>
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        items={[
          { id: "alpha", label: "Alpha Action", onSelect: () => setCmdResult("alpha") },
          { id: "pass", label: "VIP Pass Check", onSelect: () => setCmdResult("pass") },
        ]}
      />

      <div style={{ width: 220 }}>
        <CountrySelect />
      </div>
      <div style={{ width: 220 }}>
        <CurrencySelect />
      </div>
      <ColumnToggle columns={[{ id: "name", label: "Name" }, { id: "role", label: "Role" }]} />

      <span data-testid="fab-result">{fabResult}</span>
      <Fab
        label="Quick Fab"
        actions={[
          { id: "new", label: "Create Pass", onSelect: () => setFabResult("created") },
        ]}
      />
    </div>
  );
}

function WaveACase() {
  const [cartCount, setCartCount] = React.useState(0);
  const [filesLog, setFilesLog] = React.useState("0");

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div data-testid="drp-wrap">
        <DateRangePicker />
      </div>
      <Truncate lines={1}>
        This is a very long concert admission description that expands on toggle.
      </Truncate>
      <AudioPlayer title="Soundcheck" artist="Bigbull" duration={120} />
      <div>
        <span data-testid="file-count">{filesLog}</span>
        <FileInput onFilesChange={(files) => setFilesLog(String(files.length))} />
      </div>
      <div data-testid="trp-wrap">
        <TimeRangePicker />
      </div>
      <div data-testid="rte-wrap">
        <RichTextEditor placeholder="Write notes" />
      </div>
      <div>
        <span data-testid="cart-count">{cartCount}</span>
        <AddToCartButton productName="VIP Ticket" onAdd={() => setCartCount((c) => c + 1)} />
      </div>
      <OrgChart
        root={[
          {
            id: "ceo",
            label: "Alice CEO",
            role: "Lead",
            children: [{ id: "eng", label: "Bob Engineer", role: "Dev" }],
          },
        ]}
      />
      <PhoneInput />
      <Meter value={150} min={0} max={100} />
      <SignaturePad height={100} />
    </div>
  );
}

function CoreControlsCase() {
  const [page, setPage] = React.useState(1);
  const [tagClicked, setTagClicked] = React.useState("none");
  const [played, setPlayed] = React.useState("none");
  const [sliderVal, setSliderVal] = React.useState(20);

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel One</TabsContent>
        <TabsContent value="tab2">Panel Two</TabsContent>
      </Tabs>

      <Accordion type="single">
        <AccordionItem value="sec1">
          <AccordionTrigger value="sec1">Section 1</AccordionTrigger>
          <AccordionContent value="sec1">Accordion body 1</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Switch aria-label="Dark alerts" />
      <Checkbox aria-label="Accept terms" />

      <div style={{ width: 220 }}>
        <Select
          aria-label="Tier select"
          options={[
            { value: "ga", label: "General Admission" },
            { value: "vip", label: "VIP Lounge" },
          ]}
        />
      </div>

      <div style={{ width: 220 }}>
        <Combobox
          options={[
            { value: "ga", label: "General Admission" },
            { value: "vip", label: "VIP Pass" },
          ]}
        />
      </div>

      <RadioCards defaultValue="std">
        <RadioCard value="std" title="Standard" price="$20" />
        <RadioCard value="vip" title="VIP" price="$50" />
      </RadioCards>

      <Pagination page={page} totalPages={5} onPageChange={setPage} />

      <div>
        <span data-testid="tag-clicked">{tagClicked}</span>
        <TagInput
          defaultValue={["jazz"]}
          onTagClick={(tag) => setTagClicked(tag)}
          placeholder="Add tag"
        />
      </div>

      <TransferList />

      <TreeSelect
        data={[
          {
            id: "north",
            label: "North Wing",
            children: [{ id: "row-a", label: "Row A" }],
          },
        ]}
      />

      <Autocomplete
        options={[
          { value: "ga", label: "General Floor" },
          { value: "vip", label: "VIP Box" },
        ]}
      />

      <div>
        <span data-testid="played-track">{played}</span>
        <Playlist
          tracks={[
            { id: "t1", title: "Opening Act", duration: 180 },
            { id: "t2", title: "Encore", duration: 240 },
          ]}
          onPlay={(t) => setPlayed(t.id)}
        />
      </div>

      <Calendar defaultValue={new Date(2026, 0, 5)} />
      <RangeCalendar />
      <div>
        <span data-testid="slider-val">{sliderVal}</span>
        <SliderTicks min={0} max={100} step={25} value={sliderVal} onValueChange={setSliderVal} />
      </div>
    </div>
  );
}

const CASES: Record<string, React.ComponentType> = {
  overlays: OverlaysCase,
  menus: MenusCase,
  waveA: WaveACase,
  core: CoreControlsCase,
};

let currentRoot: Root | null = null;
(window as unknown as { __mountCase: (name: string) => void }).__mountCase = (name: string) => {
  const host = document.getElementById("app")!;
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot = null;
  }
  document.body.style.overflow = "";
  const Comp = CASES[name];
  if (!Comp) throw new Error("Unknown test case: " + name);
  currentRoot = createRoot(host);
  currentRoot.render(React.createElement(Comp));
};
`;

let hasChromium = false;
try {
  hasChromium = fs.existsSync(chromium.executablePath());
} catch {
  hasChromium = false;
}
if (!hasChromium && process.env.BIGBULL_REQUIRE_DOM === "1") {
  throw new Error("Playwright Chromium binary is required (BIGBULL_REQUIRE_DOM=1) but not installed.");
}

describe(
  "bigbullui Real Chromium DOM Interaction Tests",
  { skip: hasChromium ? false : "Playwright Chromium binary not installed (run `npx playwright install chromium`)" },
  () => {
  let tmpDir = "";
  let browser;
  let page;
  const runtimeErrors = [];

  before(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-dom-"));
    const bundlePath = path.join(tmpDir, "harness.js");
    esbuild.buildSync({
      stdin: {
        contents: HARNESS_TSX,
        resolveDir: rootDir,
        sourcefile: "dom-harness.tsx",
        loader: "tsx",
      },
      outfile: bundlePath,
      bundle: true,
      format: "iife",
      platform: "browser",
      jsx: "automatic",
      logLevel: "silent",
      define: { "process.env.NODE_ENV": '"production"' },
    });

    const css = fs
      .readFileSync(path.join(rootDir, "bigbullui.css"), "utf8")
      .replace(/@import\s+["']tailwindcss["'];?/g, "");

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("pageerror", (err) => runtimeErrors.push(`pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") runtimeErrors.push(`console.error: ${msg.text()}`);
    });

    await page.setContent(
      "<!doctype html><html lang='en'><head><meta charset='utf-8'></head><body><div id='app'></div></body></html>"
    );
    await page.addStyleTag({ content: `${css}\n.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}` });
    await page.addScriptTag({ path: bundlePath });
  });

  after(async () => {
    await browser?.close();
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  async function mountCase(name) {
    runtimeErrors.length = 0;
    await page.evaluate((caseName) => window.__mountCase(caseName), name);
    await page.waitForTimeout(30);
  }

  function assertNoRuntimeErrors() {
    assert.deepEqual(runtimeErrors, [], `Unexpected browser runtime errors: ${runtimeErrors.join(" | ")}`);
  }

  it("overlays: focus trap, body scroll lock, Escape stack, and focus restoration across Dialog, AlertDialog, Sheet, Drawer, ConfirmDialog, BottomSheet, CartDrawer, DrawerNav, LoadingOverlay", async () => {
    await mountCase("overlays");

    // 1. Dialog + Focus Trap + Nested ConfirmDialog Escape stack
    await page.getByRole("button", { name: "Open Dialog" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");

    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Tab");
      const insideDialog = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        return Boolean(dlg && dlg.contains(document.activeElement));
      });
      assert.equal(insideDialog, true, "Tab must stay trapped inside Dialog");
    }

    await page.getByRole("button", { name: "Open Nested" }).click();
    await page.locator('[role="alertdialog"]').waitFor({ state: "visible" });

    // First Escape closes only the top-most ConfirmDialog
    await page.keyboard.press("Escape");
    await page.locator('[role="alertdialog"]').waitFor({ state: "detached" });
    assert.equal(await page.locator('[role="dialog"]').count(), 1, "Dialog must remain open after nested Escape");

    // Second Escape closes Dialog, unlocks body scroll, and restores focus to trigger
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    assert.equal(
      await page.evaluate(() => document.activeElement?.textContent?.trim()),
      "Open Dialog",
      "Escape must restore focus to Dialog trigger"
    );

    // 2. AlertDialog confirm callback
    await page.getByRole("button", { name: "Open Alert" }).click();
    await page.locator('[role="alertdialog"]').waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Confirm Delete" }).click();
    assert.equal(await page.getByTestId("alert-status").textContent(), "confirmed");

    // 3. Sheet Escape + focus restoration
    await page.getByRole("button", { name: "Open Sheet" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Sheet");

    // 4. Drawer open/close via DrawerClose
    await page.getByRole("button", { name: "Open Drawer" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Close Drawer", exact: true }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Drawer");

    // 5. BottomSheet uncontrolled trigger + Escape
    await page.getByRole("button", { name: "Open Bottom Sheet" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Bottom Sheet");

    // 6. CartDrawer currency subtotal, qty +/-, remove, Escape
    await page.getByRole("button", { name: "Open Cart" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    assert.ok((await page.locator('[role="dialog"]').textContent())?.includes("€50.00"));
    await page.getByRole("button", { name: "Increase quantity of VIP Pass" }).click();
    assert.ok((await page.locator('[role="dialog"]').textContent())?.includes("€75.00"));
    await page.getByRole("button", { name: "Remove VIP Pass" }).click();
    assert.ok((await page.locator('[role="dialog"]').textContent())?.includes("Your cart is empty"));
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });

    // 7. DrawerNav Escape + focus restore
    await page.getByRole("button", { name: "Open Nav" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Nav");

    // 8. LoadingOverlay scroll lock
    await page.getByRole("button", { name: "Toggle Loading" }).click();
    assert.equal(await page.locator('[role="status"][aria-busy="true"]').count(), 1);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
    await page.getByRole("button", { name: "Toggle Loading" }).click();
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");

    assertNoRuntimeErrors();
  });

  it("menus & popovers: DropdownMenu, Popover, Tooltip, CommandPalette, CountrySelect, CurrencySelect, ColumnToggle, Fab", async () => {
    await mountCase("menus");

    // 1. DropdownMenu keyboard & click selection
    await page.getByRole("button", { name: "Open Menu" }).focus();
    await page.keyboard.press("ArrowDown");
    await page.locator('[role="menu"]').waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator('[role="menu"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Menu");
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.getByRole("menuitem", { name: "Edit Item" }).click();
    assert.equal(await page.getByTestId("menu-log").textContent(), "edit");

    // 2. Popover Escape & outside click
    await page.getByRole("button", { name: "Open Popover" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator('[role="dialog"]').waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Open Popover");

    // 3. Tooltip focus show + Escape hide
    await page.getByRole("button", { name: "Tip Target" }).focus();
    await page.locator('[role="tooltip"]').waitFor({ state: "visible" });
    assert.equal((await page.locator('[role="tooltip"]').textContent())?.trim(), "Helpful hint");
    await page.keyboard.press("Escape");
    await page.locator('[role="tooltip"]').waitFor({ state: "detached" });

    // 4. CommandPalette filter + Enter selection
    await page.getByRole("button", { name: "Open Palette" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    const paletteInput = page.getByPlaceholder("Type a command or search tickets...");
    await page.waitForFunction(() => document.activeElement?.getAttribute("placeholder") === "Type a command or search tickets...");
    await paletteInput.fill("pass");
    await page.locator('[role="option"]').filter({ hasText: "VIP Pass Check" }).waitFor({ state: "visible" });
    await page.keyboard.press("Enter");
    assert.equal(await page.getByTestId("cmd-result").textContent(), "pass");

    // 5. CountrySelect selection + Escape restore
    await page.getByRole("button", { name: /Country:/ }).click();
    await page.getByRole("option", { name: /Germany/ }).click();
    assert.ok((await page.getByRole("button", { name: /Country: Germany/ }).count()) === 1);
    await page.getByRole("button", { name: /Country: Germany/ }).click();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[role="listbox"]').count(), 0);

    // 6. CurrencySelect EUR + Escape restore
    await page.getByRole("button", { name: /Currency:/ }).click();
    await page.getByRole("option", { name: /Euro/ }).click();
    assert.equal(await page.getByRole("button", { name: /Currency: Euro/ }).count(), 1);

    // 7. ColumnToggle visibility toggle + Escape
    await page.getByRole("button", { name: /Columns \(2\/2\)/ }).click();
    await page.getByLabel("Role").uncheck();
    assert.equal(await page.getByRole("button", { name: /Columns \(1\/2\)/ }).count(), 1);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[role="menu"]').count(), 0);

    // 8. Fab actions + Escape
    await page.getByRole("button", { name: "Quick Fab" }).click();
    await page.getByRole("menuitem", { name: "Create Pass" }).waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[role="menuitem"]').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Quick Fab");

    assertNoRuntimeErrors();
  });

  it("wave-a behavioral fixes: DateRangePicker, Truncate, AudioPlayer, FileInput, TimeRangePicker, RichTextEditor XSS + Link, AddToCartButton, OrgChart, PhoneInput, Meter, SignaturePad", async () => {
    await mountCase("waveA");

    // 1. DateRangePicker 2-step click & reverse-order auto swap (defaults to Jan 2024)
    const drp = page.getByTestId("drp-wrap");
    await drp.getByRole("button", { name: new Date(2024, 0, 15).toDateString() }).click();
    await drp.getByRole("button", { name: new Date(2024, 0, 10).toDateString() }).click();
    assert.ok((await drp.textContent())?.includes("Nights: 5"));
    await drp.getByRole("button", { name: "Clear" }).click();
    assert.ok((await drp.textContent())?.includes("Select start"));

    // 2. Truncate toggle
    const moreBtn = page.getByRole("button", { name: "More" });
    await moreBtn.click();
    await page.getByRole("button", { name: "Less" }).waitFor({ state: "visible" });

    // 3. AudioPlayer controls
    await page.getByRole("button", { name: "Play" }).click();
    await page.getByRole("button", { name: "Pause" }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Mute", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "Mute", exact: true }).getAttribute("aria-pressed"), "true");

    // 4. FileInput upload & remove
    await page.locator('input[type="file"]').setInputFiles({
      name: "ticket.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("admit-one"),
    });
    assert.equal(await page.getByTestId("file-count").textContent(), "1");
    await page.getByRole("button", { name: "Remove ticket.txt" }).click();
    assert.equal(await page.getByTestId("file-count").textContent(), "0");

    // 5. TimeRangePicker overnight duration
    const trp = page.getByTestId("trp-wrap");
    await trp.getByLabel("Start").fill("22:00");
    await trp.getByLabel("End").fill("02:00");
    assert.ok((await trp.textContent())?.includes("4.0 hrs"));

    // 6. RichTextEditor paste sanitization (strips <script>, onerror, javascript:) + inline link bar
    const rte = page.getByTestId("rte-wrap");
    const editor = rte.locator('[role="textbox"]');
    await editor.focus();
    await page.evaluate(() => {
      const box = document.querySelector('[data-testid="rte-wrap"] [role="textbox"]');
      if (!box) throw new Error("RichTextEditor textbox not found");
      const dt = new DataTransfer();
      dt.setData(
        "text/html",
        '<b>Bold</b><script>window.__xss=1</script><img src=x onerror="window.__xss=2"><a href="javascript:evil()">Bad</a><a href="https://example.com">Good</a>'
      );
      const ev = new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true });
      box.dispatchEvent(ev);
    });
    const cleanHtml = await editor.innerHTML();
    assert.ok(cleanHtml.includes("<b>Bold</b>"), `Expected bold preserved, got: ${cleanHtml}`);
    assert.ok(cleanHtml.includes('href="https://example.com"'), `Expected safe href preserved, got: ${cleanHtml}`);
    assert.equal(cleanHtml.includes("<script"), false, "Script tag must be stripped");
    assert.equal(cleanHtml.includes("onerror"), false, "Inline handler must be stripped");
    assert.equal(cleanHtml.includes("javascript:"), false, "javascript: URL must be stripped");
    assert.equal(await page.evaluate(() => window.__xss ?? 0), 0);

    await rte.getByRole("button", { name: "Insert link" }).click();
    await rte.getByLabel("Link URL").fill("javascript:alert(1)");
    await rte.getByRole("button", { name: "Apply" }).click();
    assert.ok((await rte.textContent())?.includes("valid http(s)"));
    await rte.getByLabel("Link URL").fill("https://ui.bigbullapp.com");
    await rte.getByRole("button", { name: "Apply" }).click();
    assert.equal(await rte.getByLabel("Link URL").count(), 0);

    // 7. AddToCartButton
    await page.getByRole("button", { name: "Add VIP Ticket to cart" }).click();
    assert.equal(await page.getByTestId("cart-count").textContent(), "1");
    assert.ok((await page.getByRole("button", { name: "Add VIP Ticket to cart" }).textContent())?.includes("Added"));

    // 8. OrgChart collapse/expand
    await page.getByText("Bob Engineer").waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Collapse Alice CEO" }).click();
    assert.equal(await page.getByText("Bob Engineer").count(), 0);
    await page.getByRole("button", { name: "Expand Alice CEO" }).click();
    assert.equal(await page.getByText("Bob Engineer").count(), 1);

    // 9. PhoneInput country switch & input
    await page.getByLabel("Country").selectOption("TR");
    await page.getByLabel("Phone number").fill("5551234567");
    assert.ok((await page.locator("body").textContent())?.includes("+90"));

    // 10. Meter aria-valuenow clamping
    const meter = page.locator('[role="meter"]');
    assert.equal(await meter.getAttribute("aria-valuenow"), "100");

    // 11. SignaturePad stroke + endorse + clear
    const canvas = page.locator("canvas");
    const box = await canvas.boundingBox();
    assert.ok(box && box.width > 20 && box.height > 20);
    await page.mouse.move(box.x + 20, box.y + 30);
    await page.mouse.down();
    await page.mouse.move(box.x + 80, box.y + 45);
    await page.mouse.up();
    await page.getByRole("button", { name: /ENDORSE/ }).click();
    await page.getByText("SIGNED & ENDORSED").waitFor({ state: "visible" });
    await page.getByRole("button", { name: "CLEAR", exact: true }).click();
    assert.equal(await page.getByText("SIGNED & ENDORSED").count(), 0);

    assertNoRuntimeErrors();
  });

  it("core controls & keyboard a11y: Tabs, Accordion, Switch, Checkbox, Select, Combobox, RadioCards, Pagination, TagInput, TransferList, TreeSelect, Autocomplete, Playlist, Calendar, RangeCalendar, SliderTicks", async () => {
    await mountCase("core");

    // 1. Tabs keyboard ArrowRight/Home
    await page.getByRole("tab", { name: "Overview" }).focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.getByRole("tabpanel").textContent(), "Panel Two");
    await page.keyboard.press("Home");
    assert.equal(await page.getByRole("tabpanel").textContent(), "Panel One");

    // 2. Accordion toggle
    const accBtn = page.getByRole("button", { name: "Section 1" });
    assert.equal(await accBtn.getAttribute("aria-expanded"), "false");
    await accBtn.click();
    assert.equal(await accBtn.getAttribute("aria-expanded"), "true");

    // 3. Switch & Checkbox
    const sw = page.getByRole("switch", { name: "Dark alerts" });
    await sw.click();
    assert.equal(await sw.getAttribute("aria-checked"), "true");
    const cb = page.getByRole("checkbox", { name: "Accept terms" });
    await cb.click();
    assert.equal(await cb.getAttribute("aria-checked"), "true");

    // 4. Select keyboard (ArrowDown moves -1 -> 0 -> 1)
    await page.getByRole("button", { name: "Tier select" }).click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    assert.ok((await page.getByRole("button", { name: "Tier select" }).textContent())?.includes("VIP Lounge"));

    // 5. Combobox filter + Enter
    await page.getByRole("button", { name: /Select an option/ }).click();
    await page.getByRole("combobox").fill("vip");
    await page.keyboard.press("Enter");
    assert.ok((await page.getByRole("button", { name: /VIP Pass/ }).count()) >= 1);

    // 6. RadioCards ArrowRight
    const stdCard = page.locator('[role="radio"][data-value="std"]');
    await stdCard.click();
    await stdCard.focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.locator('[role="radio"][data-value="vip"]').getAttribute("aria-checked"), "true");

    // 7. Pagination
    const nav = page.getByRole("navigation", { name: "Pagination" });
    await nav.getByRole("button", { name: "3", exact: true }).click();
    assert.equal(await nav.getByRole("button", { name: "3", exact: true }).getAttribute("aria-current"), "page");

    // 8. TagInput keyboard click + add/remove
    await page.locator("span[role='button']").filter({ hasText: "jazz" }).focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.getByTestId("tag-clicked").textContent(), "jazz");
    await page.getByPlaceholder("Add another...").fill("rock");
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: "Remove tag rock" }).click();
    assert.equal(await page.getByRole("button", { name: "Remove tag rock" }).count(), 0);

    // 9. TransferList select & move
    await page.getByRole("option", { name: /Seat A-12/ }).click();
    await page.getByTitle("Move selected right").click();
    const rightCol = page.locator('[role="listbox"][aria-label="CLAIMED STUBS"]');
    assert.ok((await rightCol.textContent())?.includes("Seat A-12"));

    // 10. TreeSelect keyboard expand & pick leaf
    await page.getByRole("button", { name: /SELECT TICKET SEAT/ }).click();
    const north = page.locator('[role="treeitem"]', { hasText: "North Wing" }).first();
    await north.focus();
    await page.keyboard.press("Enter");
    const rowA = page.locator('[role="treeitem"]', { hasText: "Row A" });
    await rowA.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator('[role="tree"]').count(), 0);

    // 11. Autocomplete
    const ac = page.getByPlaceholder("Search seat or section...");
    await ac.click();
    await ac.fill("VIP");
    await page.getByRole("option", { name: /VIP Box/ }).click();
    assert.equal(await ac.inputValue(), "VIP Box");

    // 12. Playlist keyboard Enter
    const trackBtn = page.getByRole("button", { name: /Encore/ });
    await trackBtn.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.getByTestId("played-track").textContent(), "t2");

    // 13. RangeCalendar click 2 days
    const rc = page.locator('[role="grid"]');
    const rcBtns = rc.locator("button");
    await rcBtns.nth(4).click();
    await rcBtns.nth(7).click();
    await page.getByText("3 nights").waitFor({ state: "visible" });

    // 14. Calendar next month button works without error
    await page.getByRole("button", { name: "Next month" }).click();

    // 15. SliderTicks click update
    const slider = page.locator('[role="slider"]');
    const sBox = await slider.boundingBox();
    assert.ok(sBox);
    await page.mouse.click(sBox.x + sBox.width * 0.75, sBox.y + sBox.height / 2);
    assert.notEqual(await page.getByTestId("slider-val").textContent(), "20");

    assertNoRuntimeErrors();
  });
});
